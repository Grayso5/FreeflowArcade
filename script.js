// Particle animation
class Particle {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'particle';
        this.reset();
    }

    reset() {
        // Start particles at random positions above the viewport
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * -window.innerHeight; // Distribute vertically above screen
        this.size = Math.random() * 5 + 3;
        this.speedY = Math.random() * 2 + 4;
        this.speedX = (Math.random() - 0.5);
        
        this.element.style.width = this.size + 'px';
        this.element.style.height = this.size + 'px';
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Reset when particle goes off screen
        if (this.y > window.innerHeight) {
            this.y = Math.random() * -100 - 10; // Reset to random position above screen
            this.x = Math.random() * window.innerWidth;
        }

        // Wrap horizontally
        if (this.x < -10) this.x = window.innerWidth + 10;
        if (this.x > window.innerWidth + 10) this.x = -10;

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

// Create particles container
const particlesContainer = document.createElement('div');
particlesContainer.className = 'particles-container';
document.body.appendChild(particlesContainer);

// Create particles with staggered positions
const particles = [];
const numParticles = 100; // More particles for better effect

for (let i = 0; i < numParticles; i++) {
    const particle = new Particle();
    // Distribute particles evenly throughout the vertical space
    particle.y = (Math.random() * (window.innerHeight + 500)) - 500;
    particles.push(particle);
    particlesContainer.appendChild(particle.element);
}

// Animation loop
function animate() {
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    particles.forEach(particle => {
        if (particle.x > window.innerWidth) {
            particle.x = Math.random() * window.innerWidth;
        }
    });
});

// Fullscreen functionality
function toggleFullscreen() {
    const gameContainer = document.querySelector('.game-container');
    if (!document.fullscreenElement) {
        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) {
            gameContainer.mozRequestFullScreen();
        } else if (gameContainer.webkitRequestFullscreen) {
            gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.msRequestFullscreen) {
            gameContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
