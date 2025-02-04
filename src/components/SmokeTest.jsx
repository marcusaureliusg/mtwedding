import Sketch from "react-p5";
import texturePath from "../assets/particle_texture.png";

export default function SmokeTest() {
  // We'll store references in function scope
  let particleSystem;
  let particleTexture;

  // 1) Preload the image with a callback
  const preload = (p5) => {
    console.log("Preload called");
    p5.loadImage(texturePath, (img) => {
      particleTexture = img;
      console.log("Image loaded:", img);
    });
  };

  // 2) Setup: Create canvas + ParticleSystem
  const setup = (p5, parent) => {
    console.log("Setup called");
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(parent);
    p5.colorMode(p5.RGB);

    // We'll create the system in setup,
    // but if the image isn't loaded yet, we'll do a 100ms delay check.
    setTimeout(() => {
      if (particleTexture) {
        console.log("Creating particle system with texture");
        particleSystem = new ParticleSystem(
          p5.width / 2,
          p5.height / 2, // center of screen
          particleTexture,
          p5
        );
      } else {
        console.log("Texture not loaded yet, skipping creation");
      }
    }, 100);
  };

  // 3) Draw loop
  const draw = (p5) => {
    // White background so black smoke is visible
    p5.background(255);

    // If the system isn't ready, do nothing
    if (!particleSystem) {
      p5.fill(0);
      p5.textSize(20);
      p5.text("Waiting for texture/system...", 50, 50);
      return;
    }

    // Basic spawn: add many particles each frame
    for (let i = 0; i < 10; i++) {
      particleSystem.addParticle();
    }

    // Run the system
    particleSystem.run();

    // Debug text
    p5.fill(0);
    p5.text("SmokeTest Demo Running...", 50, 50);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
}

// ========== Particle System ==========

class ParticleSystem {
  constructor(x, y, img, p5) {
    console.log("ParticleSystem constructor");
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

  addParticle() {
    this.particles.push(
      new Particle(this.origin.x, this.origin.y, this.img, this.p5)
    );
    // console.log("Added particle, total count:", this.particles.length);
  }
}

// ========== Particle ==========

class Particle {
  constructor(x, y, img, p5) {
    // console.log("Particle constructor, has image?", !!img);
    this.loc = p5.createVector(x, y);
    this.texture = img;
    this.p5 = p5;

    // random upward velocity
    this.vel = p5.createVector(
      p5.randomGaussian() * 0.3,
      p5.randomGaussian() * 0.3 - 1
    );
    this.acc = p5.createVector(0, 0);

    this.lifespan = 150; // fade a bit slower
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
    this.lifespan -= 1;
  }

  render() {
    if (!this.texture) return;
    this.p5.push();
    this.p5.imageMode(this.p5.CENTER);
    // No tint, so the image is displayed as-is
    this.p5.image(this.texture, this.loc.x, this.loc.y);
    this.p5.pop();
  }

  isDead() {
    return this.lifespan <= 0;
  }
}
