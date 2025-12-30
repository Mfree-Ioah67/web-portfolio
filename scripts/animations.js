// Advanced Animation Effects
class AnimationController {
  constructor() {
    this.init();
  }

  init() {
    this.initParticleSystem();
    this.initFloatingElements();
    this.initHoverEffects();
    this.initScrollAnimations();
  }

  // Particle system for background
  initParticleSystem() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    this.setupParticles(canvas, ctx);
    this.animateParticles(canvas, ctx);
    
    window.addEventListener('resize', () => this.setupParticles(canvas, ctx));
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  setupParticles(canvas, ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    this.particles = [];
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  onMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    if (this.particles) {
      this.particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }
      });
    }
  }

  animateParticles(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (this.particles) {
      this.particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 65, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Draw connections
      this.particles.forEach((particle, i) => {
        this.particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 255, 65, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    }
    
    requestAnimationFrame(() => this.animateParticles(canvas, ctx));
  }

  // Floating security icons
  initFloatingElements() {
    const icons = [
      'fas fa-shield-alt',
      'fas fa-lock',
      'fas fa-key',
      'fas fa-bug',
      'fas fa-search',
      'fas fa-network-wired',
      'fas fa-eye',
      'fas fa-server'
    ];

    icons.forEach((iconClass, index) => {
      const icon = document.createElement('i');
      icon.className = `${iconClass} floating-security-icon`;
      icon.style.cssText = `
        position: fixed;
        color: var(--primary-color);
        opacity: 0.1;
        font-size: ${Math.random() * 20 + 15}px;
        left: ${Math.random() * 100}%;
        animation: float-security ${20 + Math.random() * 10}s linear infinite;
        animation-delay: ${index * 2}s;
        pointer-events: none;
        z-index: 1;
      `;
      
      document.body.appendChild(icon);
    });

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-security {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.1;
        }
        90% {
          opacity: 0.1;
        }
        100% {
          transform: translateY(-100px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Enhanced hover effects
  initHoverEffects() {
    // Project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.createRippleEffect(card);
      });
    });

    // Skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        this.createGlowEffect(tag);
      });
    });

    // Contact items
    document.querySelectorAll('.contact-item').forEach(item => {
      item.addEventListener('click', (e) => {
        this.createClickEffect(e);
      });
    });
  }

  createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(0, 255, 65, 0.3) 0%, transparent 70%);
      border-radius: inherit;
      animation: ripple-expand 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);

    // Add ripple animation
    if (!document.querySelector('#ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple-expand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  createGlowEffect(element) {
    element.style.boxShadow = '0 0 20px var(--glow-color), 0 0 40px var(--glow-color)';
    setTimeout(() => {
      element.style.boxShadow = '';
    }, 300);
  }

  createClickEffect(e) {
    const clickRipple = document.createElement('div');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    clickRipple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      background: var(--primary-color);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: click-expand 0.6s ease-out;
      pointer-events: none;
      z-index: 10;
    `;
    
    e.currentTarget.style.position = 'relative';
    e.currentTarget.appendChild(clickRipple);
    
    setTimeout(() => {
      if (clickRipple.parentNode) {
        clickRipple.parentNode.removeChild(clickRipple);
      }
    }, 600);

    // Add click animation
    if (!document.querySelector('#click-style')) {
      const style = document.createElement('style');
      style.id = 'click-style';
      style.textContent = `
        @keyframes click-expand {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Scroll-triggered animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerSectionAnimation(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  }

  triggerSectionAnimation(section) {
    const sectionId = section.id;
    
    switch (sectionId) {
      case 'skills':
        this.animateSkillsSection(section);
        break;
      case 'projects':
        this.animateProjectsSection(section);
        break;
      case 'certs':
        this.animateCertsSection(section);
        break;
      case 'contact':
        this.animateContactSection(section);
        break;
    }
  }

  animateSkillsSection(section) {
    const skillCategories = section.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
      setTimeout(() => {
        category.style.animation = 'card-hover 0.6s ease-out';
        
        const tags = category.querySelectorAll('.skill-tag');
        tags.forEach((tag, tagIndex) => {
          setTimeout(() => {
            tag.style.animation = 'skill-glow 0.5s ease-out';
          }, tagIndex * 100);
        });
      }, index * 200);
    });
  }

  animateProjectsSection(section) {
    const projectCards = section.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        this.createRippleEffect(card);
      }, index * 300);
    });
  }

  animateCertsSection(section) {
    const certCards = section.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
      setTimeout(() => {
        const progressFill = card.querySelector('.progress-fill');
        if (progressFill) {
          progressFill.style.animation = 'progress-fill 2s ease-out forwards';
        }
      }, index * 200);
    });
  }

  animateContactSection(section) {
    const contactItems = section.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.animation = 'contact-hover 0.3s ease-out';
      }, index * 100);
    });
  }
}

// Binary Rain Effect
class BinaryRain {
  constructor() {
    this.container = document.createElement('div');
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    document.body.appendChild(this.container);
    
    this.init();
  }

  init() {
    this.createBinaryDrops();
    setInterval(() => this.createBinaryDrops(), 300);
  }

  createBinaryDrops() {
    for (let i = 0; i < 3; i++) {
      const drop = document.createElement('div');
      drop.textContent = Math.random() > 0.5 ? '1' : '0';
      drop.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: -20px;
        color: var(--primary-color);
        font-family: 'Courier New', monospace;
        font-size: 14px;
        opacity: 0.7;
        animation: binary-fall ${Math.random() * 3 + 5}s linear infinite;
      `;
      
      this.container.appendChild(drop);
      
      setTimeout(() => {
        if (drop.parentNode) {
          drop.parentNode.removeChild(drop);
        }
      }, 8000);
    }
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
  new BinaryRain();
  
  // Add binary fall animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes binary-fall {
      0% {
        transform: translateY(-100px);
        opacity: 0;
      }
      10% {
        opacity: 0.7;
      }
      90% {
        opacity: 0.7;
      }
      100% {
        transform: translateY(100vh);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});