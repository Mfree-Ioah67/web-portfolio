// Terminal Animation Effects
class TerminalController {
  constructor() {
    this.init();
  }

  init() {
    this.initHeroTerminal();
    this.initContactTerminal();
  }

  // Hero terminal typing animation
  initHeroTerminal() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
      new HackerTyping(typingElement, [
        'initiate secure session...',
        'loading profile: hainguyen@security.labs',
        'status: ready',
        'welcome hai nguyen.',
        'system ready for operations'
      ]);
    }
  }

  // Contact terminal animation
  initContactTerminal() {
    const contactTerminal = document.getElementById('contactTerminal');
    const contactTyping = document.querySelector('.contact-typing-text');
    
    if (contactTerminal && contactTyping) {
      new ContactTerminal(contactTerminal, contactTyping);
    }
  }
}

// Advanced Hacker Typing Effect
class HackerTyping {
  constructor(element, texts, speed = 80) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.hackerChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    this.start();
  }

  start() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      // Add random hacker characters before showing real character
      if (Math.random() > 0.85) {
        const randomChar = this.hackerChars[Math.floor(Math.random() * this.hackerChars.length)];
        this.element.textContent = currentText.substring(0, this.charIndex) + randomChar;
        setTimeout(() => {
          this.element.textContent = currentText.substring(0, this.charIndex + 1);
          this.charIndex++;
        }, 30);
      } else {
        this.element.textContent = currentText.substring(0, this.charIndex + 1);
        this.charIndex++;
      }
    }

    let typeSpeed = this.isDeleting ? 40 : this.speed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Contact Terminal Animation
class ContactTerminal {
  constructor(terminal, typingElement) {
    this.terminal = terminal;
    this.typingElement = typingElement;
    this.commands = [
      {
        command: './secure-contact.sh --init',
        output: [
          '🔐 Initializing secure communication protocols...',
          '✓ Encryption keys generated',
          '✓ Secure channel established',
          '✓ Identity verification complete'
        ],
        delay: 1000
      },
      {
        command: 'whoami',
        output: ['phamhoanghainguyen12a12dt@gmail.com'],
        delay: 1500
      },
      {
        command: 'cat /home/student/skills.txt',
        output: [
          'Blue Team Operations: ████████░░ 80%',
          'Malware Analysis: ███████░░░ 75%',
          'Cloud Security (AWS): ████████░░ 80%',
          'Penetration Testing: ███████░░░ 75%',
          'Incident Response: ███████░░░ 75%',
          'Cryptography: ████████░░ 80%',
          'Network Security: ███████░░░ 75%'
        ],
        delay: 2000
      },
      {
        command: 'cat /home/student/goals.txt',
        output: [
          'Current: Information Assurance Student @ FPT University',
          'Internship: FCJ Cloud Intern @ AWS Vietnam',
          'Goal: Senior Security Analyst in 5 years',
          'Focus: Blue Team & Cloud Security'
        ],
        delay: 2500
      },
      {
        command: 'echo $MOTTO',
        output: ['"Secure code, secure future, happy life."'],
        delay: 1500
      },
      {
        command: 'cat /etc/certifications',
        output: [
          '✓ Google Cybersecurity Professional Certificate',
          '✓ Python for Everybody Specialization',
          '✓ Applied Cryptography Specialization',
          '✓ Cisco CCNA & CyberOps Associate',
          '✓ Linux Foundation LFS101',
          '✓ Honorable Student (3 semesters)'
        ],
        delay: 2000
      },
      {
        command: 'ping collaboration.network',
        output: [
          'PING collaboration.network (192.168.1.100)',
          '64 bytes from collaboration.network: time=1ms',
          '--- Ready for opportunities ---',
          'Contact: phamhoanghainguyen12a12dt@gmail.com',
          'Phone: +84 829 533 727'
        ],
        delay: 1500
      }
    ];
    
    this.currentCommandIndex = 0;
    this.startAnimation();
  }

  async startAnimation() {
    // Wait a bit before starting
    await this.wait(3000);
    
    for (let i = 0; i < this.commands.length; i++) {
      await this.executeCommand(this.commands[i]);
      await this.wait(this.commands[i].delay);
    }
    
    // Restart animation
    setTimeout(() => {
      this.terminal.innerHTML = '';
      this.startAnimation();
    }, 5000);
  }

  async executeCommand(commandObj) {
    // Type the command
    await this.typeCommand(commandObj.command);
    
    // Add command to terminal
    const commandLine = document.createElement('div');
    commandLine.innerHTML = `<span style="color: var(--primary-color); font-weight: bold;">hainguyen@security:~$</span> ${commandObj.command}`;
    commandLine.style.marginBottom = '0.5rem';
    commandLine.style.fontFamily = 'Courier New, monospace';
    this.terminal.appendChild(commandLine);
    
    // Clear typing text
    this.typingElement.textContent = '';
    
    // Add output with typing effect
    for (let output of commandObj.output) {
      await this.wait(200);
      const outputLine = document.createElement('div');
      
      // Color coding for different types of output
      let color = 'var(--text-secondary)';
      if (output.startsWith('✓') || output.startsWith('🔐')) {
        color = 'var(--primary-color)';
      } else if (output.includes('ERROR') || output.includes('FAILED')) {
        color = 'var(--accent-color)';
      } else if (output.includes('%') || output.includes('█')) {
        color = 'var(--secondary-color)';
      } else if (output.includes('Goal:') || output.includes('Focus:')) {
        color = 'var(--primary-color)';
      } else if (output.startsWith('"') && output.endsWith('"')) {
        color = 'var(--accent-color)';
      }
      
      outputLine.style.color = color;
      outputLine.style.marginBottom = '0.3rem';
      outputLine.style.paddingLeft = '1rem';
      outputLine.style.fontFamily = 'Courier New, monospace';
      outputLine.style.fontSize = '0.9rem';
      
      // Type out the output character by character for important messages
      if (output.includes('Secure code') || output.includes('Senior')) {
        await this.typeOutput(outputLine, output);
      } else {
        outputLine.textContent = output;
      }
      
      this.terminal.appendChild(outputLine);
      
      // Scroll to bottom
      this.terminal.scrollTop = this.terminal.scrollHeight;
    }
    
    await this.wait(300);
  }

  async typeCommand(command) {
    for (let i = 0; i <= command.length; i++) {
      this.typingElement.textContent = command.substring(0, i);
      await this.wait(50 + Math.random() * 30);
    }
    await this.wait(300);
  }

  async typeOutput(element, text) {
    this.terminal.appendChild(element);
    for (let i = 0; i <= text.length; i++) {
      element.textContent = text.substring(0, i);
      await this.wait(30);
    }
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Network Scanner Simulation
class NetworkScanner {
  constructor() {
    this.createScanner();
    this.startScan();
  }

  createScanner() {
    const scanner = document.createElement('div');
    scanner.className = 'network-scanner';
    scanner.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: rgba(0, 0, 0, 0.95);
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      padding: 0.8rem;
      font-family: 'Courier New', monospace;
      color: var(--primary-color);
      z-index: 1000;
      box-shadow: 0 0 15px var(--glow-color);
      min-width: 280px;
      max-height: 180px;
      overflow-y: auto;
      font-size: 0.75rem;
    `;
    
    scanner.innerHTML = `
      <div style="color: var(--primary-color); font-weight: bold; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem;">
        <i class="fas fa-wifi" style="font-size: 0.7rem;"></i>
        NET SCAN
        <div style="margin-left: auto;">
          <span class="scanner-status" style="color: var(--primary-color); animation: status-blink 1s infinite; font-size: 0.6rem;">●</span>
        </div>
      </div>
      <div class="scan-output"></div>
    `;
    
    document.body.appendChild(scanner);
    this.scanner = scanner;
  }

  startScan() {
    const output = this.scanner.querySelector('.scan-output');
    const networks = [
      '192.168.1.0/24',
      '10.0.0.0/24', 
      '172.16.0.0/24',
      '192.168.0.0/24'
    ];
    const ports = ['22', '80', '443', '21', '25', '53', '110', '995', '993', '143'];
    const services = ['SSH', 'HTTP', 'HTTPS', 'FTP', 'SMTP', 'DNS', 'POP3', 'POP3S', 'IMAPS', 'IMAP'];
    
    let scanCount = 0;
    
    const scanInterval = setInterval(() => {
      const network = networks[Math.floor(Math.random() * networks.length)];
      const baseIP = network.split('/')[0].split('.').slice(0, 3).join('.');
      const hostIP = `${baseIP}.${Math.floor(Math.random() * 254) + 1}`;
      const port = ports[Math.floor(Math.random() * ports.length)];
      const service = services[ports.indexOf(port)];
      const status = Math.random() > 0.7 ? 'OPEN' : 'CLOSED';
      const statusColor = status === 'OPEN' ? 'var(--primary-color)' : 'var(--text-muted)';
      
      const line = document.createElement('div');
      line.style.fontSize = '0.65rem';
      line.style.marginBottom = '0.15rem';
      line.innerHTML = `${hostIP}:${port} <span style="color: ${statusColor}; font-weight: bold;">${status}</span>`;
      
      output.appendChild(line);
      scanCount++;
      
      // Keep only last 12 lines
      while (output.children.length > 12) {
        output.removeChild(output.firstChild);
      }
      
      output.scrollTop = output.scrollHeight;
      
      // Stop after 100 scans and restart
      if (scanCount >= 100) {
        clearInterval(scanInterval);
        setTimeout(() => {
          output.innerHTML = '';
          scanCount = 0;
          this.startScan();
        }, 3000);
      }
    }, 800);
  }
}

// Initialize terminal effects
document.addEventListener('DOMContentLoaded', () => {
  new TerminalController();
  
  // Add network scanner after a delay
  setTimeout(() => {
    new NetworkScanner();
  }, 5000);
  
  // Add status blink animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes status-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `;
  document.head.appendChild(style);
});