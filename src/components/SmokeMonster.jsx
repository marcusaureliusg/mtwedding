import { useEffect, useState } from "react";
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

export default function SmokeMonster({
  onDefeat,
  onEnveloped,
  timeToEnvelop = 60000,
  maxHealth = 5000,
}) {
  // ========== Monster States in React ==========

  // "spawning" -> "fighting" -> "enveloping" -> "done"
  const [monsterState, setMonsterState] = useState("spawning");
  const [monsterHealth, setMonsterHealth] = useState(maxHealth);
  const [finished, setFinished] = useState(false);

  // On mount, go directly to "fighting":
  useEffect(() => {
    console.log("SmokeMonster mounted -> set to fighting");
    setMonsterState("fighting");
  }, []);

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
        console.log("Enveloped => calling onEnveloped + done");
        if (onEnveloped) onEnveloped();
        setMonsterState("done");
        setFinished(true);
      }, 5000);
      return () => clearTimeout(envelopTimer);
    }
  }, [monsterState, onEnveloped]);

  // If health drops to 0 => onDefeat + done
  useEffect(() => {
    if (monsterHealth <= 0 && monsterState !== "done") {
      console.log("Monster defeated => calling onDefeat + done");
      if (onDefeat) onDefeat();
      setMonsterState("done");
      setFinished(true);
    }
  }, [monsterHealth, monsterState, onDefeat]);

  // ========== p5 Sketch Logic ==========

  // 1) PRELOAD with callback => store in globalTexture
  const preload = (p5) => {
    console.log("p5: preload() => loading image with callback");
    // If already loaded once, skip:
    if (globalTexture) {
      console.log("globalTexture already loaded, skipping load");
      return;
    }
    p5.loadImage(texturePath, (img) => {
      console.log("p5: loadImage callback =>", img);
      globalTexture = img;
    });
  };

  // 2) SETUP => create the particle system if globalTexture is ready
  const setup = (p5, parentRef) => {
    console.log("p5: setup() called");
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(parentRef);
    p5.colorMode(p5.RGB);

    // If the texture is already loaded, create the system now
    if (globalTexture) {
      console.log("Texture found => creating ParticleSystem");
      globalSystem = new ParticleSystem(
        p5.width / 2,
        p5.height / 2,
        globalTexture,
        p5
      );
    } else {
      console.log("Texture not yet loaded => system not created");
      // Rely on the code in draw() to check again if we want a fallback
    }
  };

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
      p5.text("Loading smoke system...", 50, 50);
      // Optionally, if the texture loaded after setup, create the system now:
      if (globalTexture && !globalSystem) {
        console.log("Creating system in draw => late loadImage");
        globalSystem = new ParticleSystem(
          p5.width / 2,
          p5.height / 2,
          globalTexture,
          p5
        );
      }
      return;
    }

    // Update the origin to follow the mouse slightly
    if (monsterState !== "done") {
      let targetX = p5.mouseX;
      let targetY = p5.mouseY;

      // If the mouse is near the center, add some jitter
      if (
        p5.dist(
          targetX,
          targetY,
          globalSystem.origin.x,
          globalSystem.origin.y
        ) < 20
      ) {
        targetX += p5.random(-100, 100); // Random jitter
        targetY += p5.random(-100, 100);
      }

      // Use lerp to create a smooth transition to the mouse position
      const smoothX = p5.lerp(globalSystem.origin.x, targetX, 0.08); // controls the smoothness
      const smoothY = p5.lerp(globalSystem.origin.y, targetY, 0.08);

      globalSystem.updateOrigin(smoothX, smoothY); // Update the base position
    }

    // Deflect particles from the mouse position
    globalSystem.applyDeflectForce(p5.mouseX, p5.mouseY);

    // Monster state debug
    p5.fill(0);
    p5.textSize(16);
    p5.text(`Monster State: ${monsterState}`, 20, 20);

    // If fighting => moderate spawn
    if (monsterState === "fighting") {
      const dx = p5.map(p5.mouseX, 0, p5.width, -0.2, 0.2);
      globalSystem.applyForce(p5.createVector(dx, 0));
      // spawn ~10 each frame
      for (let i = 0; i < 2; i++) {
        globalSystem.addParticle();
      }
    }

    // If enveloping => heavier spawn + swirl
    if (monsterState === "enveloping") {
      for (let i = 0; i < 20; i++) {
        globalSystem.addParticle();
      }

      globalSystem.applyForce(
        p5.createVector(p5.random(-2, 2), p5.random(-3, -1))
      );
    }

    // Run the system
    globalSystem.run();

    // Health bar
    p5.fill(0);
    p5.text(`Monster Health: ${monsterHealth}`, 20, 60);
    p5.noStroke();
    p5.fill(150);
    p5.rect(20, 70, 200, 20);

    p5.fill(255, 0, 0);
    const barW = (monsterHealth / maxHealth) * 200;
    p5.rect(20, 70, barW, 20);
  };

  // Event handlers
  const mousePressed = (p5) => {
    if (monsterState === "fighting") {
      const newHp = Math.max(monsterHealth - 5, 0);
      console.log("Clicked => health:", newHp);
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

  const keyTyped = (p5) => {
    if (monsterState === "fighting") {
      if (["4", "8", "1", "5", "6", "2", "3"].includes(p5.key)) {
        const newHp = Math.max(monsterHealth - 50, 0);
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
        keyTyped={keyTyped}
        windowResized={windowResized}
      />
    </div>
  );
}

// =================== Particle System Classes ===================

class ParticleSystem {
  constructor(x, y, img, p5) {
    console.log("ParticleSystem constructor called with img:", img);
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
    for (const pt of this.particles) {
      // Calculate the vector from the mouse to the particle
      const mouse = this.p5.createVector(mouseX, mouseY);
      const dir = p5.Vector.sub(pt.loc, mouse);

      const distance = dir.mag(); // Distance between the mouse and the particle
      const maxDistance = 100; // Maximum range for the deflect effect

      if (distance < maxDistance) {
        dir.normalize(); // Get the direction of the force
        const strength = this.p5.map(distance, 0, maxDistance, 5, 0); // Stronger force when closer
        const deflectForce = dir.mult(strength);

        // Apply the force to the particle
        pt.applyForce(deflectForce);
      }
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
