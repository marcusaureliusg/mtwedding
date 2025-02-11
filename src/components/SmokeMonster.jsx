import { useEffect, useRef, useState } from "react";
import Sketch from "react-p5";
// Adjust to your actual path:
import texturePath from "../assets/particle_texture.png";

/*
  === GLOBAL (MODULE-LEVEL) VARIABLES ===
  Ensures that once we load the image, it stays in memory
  even if react-p5 triggers multiple sketches or re-renders.
*/
let globalTexture = null;
let globalSystem = null;
const IS_MOBILE =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  window.innerWidth < 800;

export default function SmokeMonster({
  onDefeat,
  onEnveloped,
  timeToEnvelop = 53000,
  maxHealth = 108000,
}) {
  // ========== Monster States in React ==========

  // "spawning" -> "fighting" -> "enveloping" -> "done"
  const [monsterState, setMonsterState] = useState("spawning");
  const [monsterHealth, setMonsterHealth] = useState(maxHealth);
  const [finished, setFinished] = useState(false);
  const prevHealth = useRef(monsterHealth);

  useEffect(() => {
    prevHealth.current = monsterHealth;
  }, [monsterHealth]);

  // On mount, go directly to "fighting":
  useEffect(() => {
    //console.log("SmokeMonster mounted -> set to fighting");
    setMonsterState("fighting");
    setMonsterHealth(maxHealth); // Reset health when remounted
    setFinished(false); // Reset the "finished" state
  }, [maxHealth]); // Depend on maxHealth to trigger reset

  // If fighting, after timeToEnvelop ms => enveloping
  useEffect(() => {
    if (monsterState === "fighting") {
      console.log(
        `Monster is fighting. Will envelop after ${timeToEnvelop} ms.`
      );
      const timer = setTimeout(() => {
        setMonsterState("enveloping");
      }, timeToEnvelop);
      return () => clearTimeout(timer);
    }
  }, [monsterState, timeToEnvelop]);

  // If enveloping, after 5s => onEnveloped + done
  useEffect(() => {
    if (monsterState === "enveloping") {
      console.log("Monster is enveloping => 5s to done.");
      const envelopTimer = setTimeout(() => {
        //console.log("Enveloped => calling onEnveloped + done");
        if (onEnveloped) onEnveloped();
        setMonsterState("done");
        setFinished(true);
      }, 5000);
      return () => clearTimeout(envelopTimer);
    }
  }, [monsterState, onEnveloped]);

  // If health drops to 0 => trigger defeat animation instead of instantly unmounting
  useEffect(() => {
    if (monsterHealth <= 0 && monsterState !== "done") {
      console.log("💀 Monster defeated => Starting defeat animation...");

      // Set a new state for the fade-out effect
      setMonsterState("defeated");

      setTimeout(() => {
        console.log("💀 Defeat animation complete => Calling onDefeat()");
        if (onDefeat) onDefeat(); // Now call parent unmount
        setFinished(true);
      }, 5000); //
    }
  }, [monsterHealth, monsterState, onDefeat]);

  // ========== p5 Sketch Logic ==========

  // 1) PRELOAD with callback => store in globalTexture
  const preload = (p5) => {
    //console.log("p5: preload() => loading image with callback");
    // If already loaded once, skip:
    if (globalTexture) {
      //console.log("globalTexture already loaded, skipping load");
      return;
    }
    p5.loadImage(texturePath, (img) => {
      //console.log("p5: loadImage callback =>", img);
      globalTexture = img;
    });
  };

  // 2) SETUP => create the particle system if globalTexture is ready
  const setup = (p5, parentRef) => {
    //console.log("p5: setup() called");
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(parentRef);
    p5.colorMode(p5.RGB);

    // Force a resize for correct dimensions
    setTimeout(() => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }, 500);

    // If the texture is already loaded, create the system now
    if (globalTexture) {
      //console.log("Texture found => creating ParticleSystem");
      let startX = p5.width / 2;
      let startY = p5.height / 2;

      // Adjust for mobile screen size
      if (IS_MOBILE) {
        startX = p5.width * 0.5; // Center horizontally
        startY = p5.height * 0.6; // Lower it slightly for better visibility
      }

      globalSystem = new ParticleSystem(startX, startY, globalTexture, p5);

      // Attach damage handler safely
      p5._reactSmokeMonsterDamage = (damage) => {
        if (!globalSystem || !setMonsterHealth) return;
        console.log(`💥 Smoke Monster Hit! -${damage} HP`);
        setMonsterHealth((prev) => Math.max(prev - damage, 0));
      };
    } else {
      //console.log("Texture not yet loaded => system not created");
      // Rely on the code in draw() to check again if we want a fallback
    }
  };

  const drawHealthBar = (p5) => {
    const textPaddingX = 20; // Extra horizontal padding around text
    const textPaddingY = 10; // Extra vertical padding around text
    const textX = 20; // X position for text
    const textY = 60; // Y position for text

    p5.textSize(18);
    p5.textFont("Arial", 18);
    p5.textStyle(p5.BOLD);
    p5.textAlign(p5.LEFT, p5.CENTER);

    // Get actual text width to dynamically size the background
    const textWidth = p5.textWidth(`Smoke Monster Health: ${monsterHealth}`);

    // Health bar background (dynamically sized based on text width)
    p5.fill(255); // White background for contrast
    p5.rect(
      textX - textPaddingX / 2, // Left padding
      textY - textPaddingY, // Move it up slightly
      textWidth + textPaddingX, // Expand width dynamically
      35 + textPaddingY, // Increase height
      5 // Rounded corners
    );

    // Health bar text
    p5.fill(0); // Black text
    p5.text(`Smoke Monster Health: ${monsterHealth}`, textX, textY);

    // Only update reference if health has changed
    if (prevHealth.current !== monsterHealth) {
      prevHealth.current = monsterHealth;
    }

    // Draw health bar
    p5.noStroke();
    p5.fill(150);
    p5.rect(20, 70, 200, 20);

    p5.fill(255, 0, 0);
    const barW = (monsterHealth / maxHealth) * 200;
    p5.rect(20, 70, barW, 20);
  };

  const MAX_PARTICLES = IS_MOBILE ? 300 : 1000;

  // 3) DRAW => background + spawn + run the system if available
  const draw = (p5) => {
    p5.background(255, 255, 255, 5);

    if (monsterState === "done") {
      return;
    }

    // If no system or texture, show "loading" text
    if (!globalSystem || !globalTexture) {
      p5.fill(0);
      p5.textSize(20);
      p5.text("Smoke Monster Coming...", 50, 50);
      // Optionally, if the texture loaded after setup, create the system now:
      if (globalTexture && !globalSystem) {
        //console.log("Creating system in draw => late loadImage");
        globalSystem = new ParticleSystem(
          p5.width / 2,
          p5.height / 2,
          globalTexture,
          p5
        );
      }
      return;
    }

    // Cap max particles
    if (globalSystem.particles.length > MAX_PARTICLES) {
      globalSystem.particles.splice(
        0,
        globalSystem.particles.length - MAX_PARTICLES
      );
    }

    // Update the origin to follow the mouse or touch
    if (monsterState !== "done") {
      let targetX = p5.mouseIsPressed
        ? p5.mouseX
        : p5.touches.length
        ? p5.touches[0].x
        : globalSystem.origin.x;
      let targetY = p5.mouseIsPressed
        ? p5.mouseY
        : p5.touches.length
        ? p5.touches[0].y
        : globalSystem.origin.y;

      // If the mouse is near the center, add some jitter
      if (
        p5.dist(
          targetX,
          targetY,
          globalSystem.origin.x,
          globalSystem.origin.y
        ) < 20
      ) {
        targetX += p5.random(-50, 50); // Random jitter
        targetY += p5.random(-50, 50);
      }

      // Use lerp to create a smooth transition to the mouse position
      const smoothX = p5.lerp(
        globalSystem.origin.x,
        targetX,
        IS_MOBILE ? 0.03 : 0.06
      );
      const smoothY = p5.lerp(
        globalSystem.origin.y,
        targetY,
        IS_MOBILE ? 0.03 : 0.06
      );
      globalSystem.updateOrigin(smoothX, smoothY);
    }

    // Deflect particles from the mouse position
    globalSystem.applyDeflectForce(p5.mouseX, p5.mouseY);

    // Monster state debug
    p5.fill(0);
    p5.textSize(16);
    p5.text(`Smoke Monster is: ${monsterState}`, 20, 20);

    const spawnRate = IS_MOBILE ? 2 : 5;

    if (monsterState === "fighting") {
      const dx = p5.map(p5.mouseX, 0, p5.width, -0.2, 0.2);
      globalSystem.applyForce(p5.createVector(dx, 0));

      for (let i = 0; i < spawnRate; i++) {
        globalSystem.addParticle();
      }
    }

    // If enveloping => massive particle spawn + full screen expansion
    if (monsterState === "enveloping") {
      // 🔹 Lower particle count for mobile
      const maxParticles = IS_MOBILE ? 20 : 50;
      for (let i = 0; i < maxParticles; i++) {
        // ⬅️ Increased spawn rate
        globalSystem.addParticle();
      }

      // Spread particles everywhere
      globalSystem.applyForce(
        p5.createVector(p5.random(-5, 5), p5.random(-6, -2))
      );

      // Make the whole screen turn dark
      p5.fill(0, 0, 0, 20);
      p5.rect(0, 0, p5.width, p5.height);
    }

    if (monsterState === "defeated") {
      console.log("🔥 Running defeat animation...");

      // Gradually darken the background for a "vanishing into darkness" effect
      p5.background(0, 0, 0, 10); // Slowly fades to black

      // Reduce opacity of all particles to fade them out over time
      for (const pt of globalSystem.particles) {
        pt.lifespan -= 3; // Fade out the particles
        pt.size *= 0.97; // Shrink particles for a "disintegration" effect
      }

      // Create a final "shockwave pulse" effect before full fade-out
      if (p5.frameCount % 30 === 0) {
        p5.fill(255, 150); // Bright white burst
        p5.ellipse(globalSystem.origin.x, globalSystem.origin.y, 500, 500);
      }

      globalSystem.particles.forEach((pt) => {
        pt.lifespan -= 5;
      });

      // Once all particles have disappeared, complete the defeat
      if (globalSystem.particles.length === 0) {
        console.log("🔥 Smoke Monster completely faded away.");
      }
    }

    // Run the system
    globalSystem.run();
    drawHealthBar(p5);
  };

  // Event handlers
  const mousePressed = (p5) => {
    if (monsterState === "fighting") {
      let damage = IS_MOBILE ? 200 : 20; // Mobile taps hit harder
      const newHp = Math.max(monsterHealth - damage, 0);
      setMonsterHealth(newHp);
    }
  };

  const mouseMoved = (p5) => {
    if (monsterState === "fighting") {
      const speed = p5.dist(p5.mouseX, p5.mouseY, p5.pwinMouseX, p5.pwinMouseY);
      if (speed > 30) {
        const newHp = Math.max(monsterHealth - 1, 0);
        // console.log("Fast move => health:", newHp);
        setMonsterHealth(newHp);
      }
    }
  };

  const handlePointerPress = (p5) => {
    if (monsterState === "fighting") {
      const newHp = Math.max(monsterHealth - 5, 0);
      console.log("Pointer Pressed => health:", newHp);
      setMonsterHealth(newHp);
    }
  };

  const handlePointerMove = (p5) => {
    if (monsterState === "fighting") {
      const x = IS_MOBILE && p5.touches.length ? p5.touches[0].x : p5.mouseX;
      const y = IS_MOBILE && p5.touches.length ? p5.touches[0].y : p5.mouseY;
      const speed = p5.dist(x, y, p5.pwinMouseX, p5.pwinMouseY);

      // Adjust damage based on device type
      let damage = IS_MOBILE ? 30 : 3; // Reduced damage per hit on desktop
      let minSpeed = IS_MOBILE ? 10 : 50; // Desktop requires faster movement

      if (speed > minSpeed) {
        const newHp = Math.max(monsterHealth - damage, 0);
        setMonsterHealth(newHp);
      }
    }
  };

  const keyTyped = (p5) => {
    if (monsterState === "fighting") {
      let damage = IS_MOBILE ? 1000 : 150; // Desktop gets reduced key damage
      if (["4", "8", "1", "5", "6", "2", "3"].includes(p5.key)) {
        const newHp = Math.max(monsterHealth - damage, 0);
        console.log(`Key ${p5.key} => health: ${newHp}`);
        setMonsterHealth(newHp);
      }
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  // If monster is finished, remove the component
  if (finished) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "auto",
        zIndex: 9999,
      }}
    >
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        mouseMoved={mouseMoved}
        touchStarted={handlePointerPress}
        touchMoved={handlePointerMove}
        keyTyped={keyTyped}
        windowResized={windowResized}
      />
    </div>
  );
}

// =================== Particle System Classes ===================

class ParticleSystem {
  constructor(x, y, img, p5) {
    //console.log("ParticleSystem constructor called with img:", img);
    this.origin = p5.createVector(x, y);
    this.img = img;
    this.p5 = p5;
    this.particles = [];
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.run();
      if (pt.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  applyForce(force) {
    for (const pt of this.particles) {
      pt.applyForce(force);
    }
  }

  addParticle() {
    this.particles.push(
      new Particle(this.origin.x, this.origin.y, this.img, this.p5)
    );
  }

  updateOrigin(x, y) {
    this.origin.set(x, y);
  }

  applyDeflectForce(mouseX, mouseY) {
    let totalDamage = 0; // Track total damage in one frame
    const MAX_DEFLECTION_DAMAGE = IS_MOBILE ? 300 : 100; // Cap damage per frame

    for (const pt of this.particles) {
      const mouse = this.p5.createVector(mouseX, mouseY);
      const dir = p5.Vector.sub(pt.loc, mouse);
      const distance = dir.mag();
      const maxDistance = IS_MOBILE ? 40 : 100;

      if (distance < maxDistance) {
        dir.normalize();
        const strength = IS_MOBILE
          ? 1.2 // Slightly reduced force on mobile
          : this.p5.map(distance, 0, maxDistance, 5, 0); // Reduced max force

        const deflectForce = dir.mult(strength);
        pt.applyForce(deflectForce);

        if (!IS_MOBILE) {
          const movingTowardMonster =
            p5.Vector.dot(pt.vel, p5.Vector.sub(globalSystem.origin, pt.loc)) >
            0;

          if (movingTowardMonster) {
            const attraction = p5.Vector.sub(globalSystem.origin, pt.loc).mult(
              0.03
            ); // Lowered pull force
            pt.applyForce(attraction);
            const speed = pt.vel.mag();

            let damage = Math.floor(speed * 1.5); // Reduced damage multiplier
            totalDamage += damage;
          }
        }
      }
    }

    // Apply capped damage
    if (totalDamage > 0 && this.p5._reactSmokeMonsterDamage && !IS_MOBILE) {
      totalDamage = Math.min(totalDamage, MAX_DEFLECTION_DAMAGE); // Apply cap
      setTimeout(() => {
        console.log(`🔥 Deflection Damage: ${totalDamage}`);
        this.p5._reactSmokeMonsterDamage(totalDamage);
      }, 0);
    }
  }
}

class Particle {
  constructor(x, y, img, p5) {
    this.loc = p5.createVector(x, y);
    this.texture = img;
    this.p5 = p5;

    this.vel = p5.createVector(
      p5.randomGaussian() * 0.3,
      p5.randomGaussian() * 0.3 - 1
    );
    this.acc = p5.createVector(0, 0);
    this.lifespan = 100;
  }

  run() {
    this.update();
    this.render();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 2.5;
  }

  render() {
    if (!this.texture) return;
    this.p5.push();
    this.p5.imageMode(this.p5.CENTER);
    // Randomize size and tint
    const size = this.p5.random(0, 300); // Random size for each particle
    const alpha = this.p5.map(this.lifespan, 0, 100, 0, 255); // Fade out with lifespan
    this.p5.tint(255, alpha); // White tint with fading alpha
    // Draw the PNG as-is. If partially transparent, you'll see puffs.
    this.p5.image(this.texture, this.loc.x, this.loc.y, size, size);
    this.p5.pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}
