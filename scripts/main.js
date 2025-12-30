// Main JavaScript File
class Portfolio {
  constructor() {
    this.init();
  }

  init() {
    this.handleLoading();
    this.initNavigation();
    this.initScrollEffects();
    this.initMatrixRain();
    this.logSecurityMessages();
  }

  // Handle loading screen
  handleLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 1000);
      }, 3000);
    }
  }

  // Initialize navigation
  initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Active navigation highlighting
    this.updateActiveNav();
    window.addEventListener('scroll', () => this.updateActiveNav());
  }

  updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Initialize scroll effects
  initScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Trigger specific animations
          if (entry.target.classList.contains('skill-category')) {
            this.animateSkillTags(entry.target);
          }
          
          if (entry.target.classList.contains('cert-card')) {
            this.animateCertProgress(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.section, .project-card, .skill-category, .cert-card, .timeline-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Animate skill tags
  animateSkillTags(skillCategory) {
    const tags = skillCategory.querySelectorAll('.skill-tag');
    tags.forEach((tag, index) => {
      setTimeout(() => {
        tag.style.animation = 'skill-glow 0.5s ease-out';
      }, index * 100);
    });
  }

  // Animate certificate progress
  animateCertProgress(certCard) {
    const progressFill = certCard.querySelector('.progress-fill');
    if (progressFill) {
      const width = progressFill.style.width;
      progressFill.style.setProperty('--progress-width', width);
      progressFill.style.animation = 'progress-fill 2s ease-out forwards';
    }
  }

  // Initialize matrix rain effect
  initMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixBg = document.querySelector('.matrix-bg');
    
    if (matrixBg) {
      matrixBg.appendChild(canvas);
      
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '-1';
      canvas.style.opacity = '0.15';
      
      this.setupMatrixCanvas(canvas, ctx);
      this.animateMatrix(canvas, ctx);
      
      window.addEventListener('resize', () => this.setupMatrixCanvas(canvas, ctx));
    }
  }

  setupMatrixCanvas(canvas, ctx) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.matrixColumns = Math.floor(canvas.width / 20);
    this.matrixDrops = [];
    
    for (let i = 0; i < this.matrixColumns; i++) {
      this.matrixDrops[i] = 1;
    }
  }

  animateMatrix(canvas, ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = '15px monospace';
    
    // Mix of characters including Japanese katakana
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < this.matrixDrops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * 20, this.matrixDrops[i] * 20);
      
      if (this.matrixDrops[i] * 20 > canvas.height && Math.random() > 0.975) {
        this.matrixDrops[i] = 0;
      }
      this.matrixDrops[i]++;
    }
    
    requestAnimationFrame(() => this.animateMatrix(canvas, ctx));
  }

  // Log security-themed console messages
  logSecurityMessages() {
    console.log('%c🛡️ INFORMATION ASSURANCE PORTFOLIO INITIALIZED', 'color: #00ff41; font-size: 16px; font-weight: bold;');
    console.log('%c[INFO] Security monitoring systems online', 'color: #00ff41; font-family: monospace;');
    console.log('%c[INFO] Threat detection protocols active', 'color: #00ff41; font-family: monospace;');
    console.log('%c[INFO] Blue team defensive measures deployed', 'color: #00ff41; font-family: monospace;');
    
    // Easter egg
    window.blueteam = {
      status: 'ACTIVE',
      threat_level: 'LOW',
      last_scan: new Date().toISOString(),
      message: 'Welcome to the Blue Team Defense Network! 🛡️',
      skills: ['Incident Response', 'Threat Hunting', 'Security Monitoring', 'Forensics'],
      motto: 'Defend. Detect. Respond.'
    };
    
    console.log('%cTry typing "blueteam" in the console for more info! 😉', 'color: #0066cc; font-style: italic;');
  }
}

// Glitch Text Effect
class GlitchEffect {
  constructor() {
    this.glitchElements = document.querySelectorAll('.glitch');
    this.init();
  }

  init() {
    this.glitchElements.forEach(element => {
      // Random glitch trigger
      setInterval(() => {
        this.triggerGlitch(element);
      }, Math.random() * 5000 + 3000);
    });
  }

  triggerGlitch(element) {
    element.style.animation = 'none';
    setTimeout(() => {
      element.style.animation = 'glitch-main 0.5s ease-out';
      setTimeout(() => {
        element.style.animation = '';
      }, 500);
    }, 10);
  }
}

// System Status Monitor
class SystemMonitor {
  constructor() {
    this.createMonitor();
    this.updateStatus();
    setInterval(() => this.updateStatus(), 10000);
  }

  createMonitor() {
    const monitor = document.createElement('div');
    monitor.className = 'system-monitor';
    monitor.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.95);
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      padding: 0.8rem;
      font-family: 'Courier New', monospace;
      color: var(--text-secondary);
      z-index: 1000;
      box-shadow: 0 0 10px var(--glow-color);
      min-width: 180px;
      font-size: 0.7rem;
    `;
    
    monitor.innerHTML = `
      <div style="color: var(--primary-color); font-weight: bold; margin-bottom: 0.4rem; text-align: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.3rem; font-size: 0.75rem;">
        SYS STATUS
      </div>
      <div class="status-items"></div>
    `;
    
    document.body.appendChild(monitor);
    this.monitor = monitor;
  }

  updateStatus() {
    const statusItems = this.monitor.querySelector('.status-items');
    const statuses = [
      { label: 'FIREWALL', status: 'ACTIVE', type: 'success' },
      { label: 'IDS/IPS', status: 'MONITORING', type: 'success' },
      { label: 'THREAT LEVEL', status: 'LOW', type: 'success' },
      { label: 'LAST SCAN', status: new Date().toLocaleTimeString(), type: 'info' },
      { label: 'UPTIME', status: this.getUptime(), type: 'info' }
    ];
    
    statusItems.innerHTML = statuses.map(item => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.2rem; font-size: 0.65rem;">
        <span style="color: var(--text-muted);">${item.label}:</span>
        <span style="color: ${item.type === 'success' ? 'var(--primary-color)' : 'var(--text-secondary)'};">${item.status}</span>
      </div>
    `).join('');
  }

  getUptime() {
    const start = new Date().getTime();
    const now = new Date().getTime();
    const diff = Math.floor((now - start) / 1000);
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
  new GlitchEffect();
  new SystemMonitor();
});