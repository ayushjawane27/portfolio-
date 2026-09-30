/**
 * ==========================================================================
 * AYUSH JAWANE — MAIN PORTFOLIO CONTROLLER
 * Features:
 *  - Dynamic Particle Canvas Constellation with Mouse Interaction
 *  - Custom Smooth Neon Cursor
 *  - Scroll Progress Bar & Sticky Header
 *  - Filterable Skills & Projects Grid
 *  - 1-Click Clipboard Email Copy
 *  - Contact Form Handling with Mailto Fallback
 *  - Mobile Menu Drawer
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initCustomCursor();
  initScrollEffects();
  initNavigation();
  initFilterTabs();
  initContactUtilities();
});

// --------------------------------------------------------------------------
// 1. PARTICLE CANVAS CONSTELLATION
// --------------------------------------------------------------------------
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
  const maxDistance = 140;

  const mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 0.6;
      this.color = Math.random() > 0.3 ? '#00FF87' : '#00F0FF';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse gentle interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x -= (dx / dist) * 1.2;
        this.y -= (dy / dist) * 1.2;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.18;
          ctx.strokeStyle = `rgba(0, 255, 135, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

// --------------------------------------------------------------------------
// 2. CUSTOM NEON CURSOR
// --------------------------------------------------------------------------
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function updateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(updateRing);
  }
  updateRing();

  // Hover states on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .ai-chip');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// --------------------------------------------------------------------------
// 3. SCROLL PROGRESS & STICKY NAVBAR
// --------------------------------------------------------------------------
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('bg-[#080C14]/95', 'shadow-xl', 'shadow-black/50');
      } else {
        navbar.classList.remove('shadow-xl', 'shadow-black/50');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// --------------------------------------------------------------------------
// 4. NAVIGATION & ACTIVE HIGHLIGHT
// --------------------------------------------------------------------------
function initNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.toggle('hidden');
    });
  }

  // Close drawer on link click
  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (drawer) drawer.classList.add('hidden');
    });
  });

  // Highlight active link on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 160;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-neon');
          } else {
            link.classList.remove('text-neon');
          }
        });
      }
    });
  });
}

// --------------------------------------------------------------------------
// 5. SKILL & PROJECT FILTER TABS
// --------------------------------------------------------------------------
function initFilterTabs() {
  // Skill Tabs
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      skillCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Tabs
  const projectTabs = document.querySelectorAll('.project-tab');
  const projectCards = document.querySelectorAll('.project-card');

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      projectTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (filter === 'all' || cardCat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 6. CONTACT UTILITIES & FORM VALIDATION
// --------------------------------------------------------------------------
function initContactUtilities() {
  // 1-Click Copy Email
  const copyBtn = document.getElementById('copy-email-btn');
  const copyToast = document.getElementById('copy-toast');
  const emailToCopy = 'ayush.jawane27@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        if (copyToast) {
          copyToast.classList.remove('hidden');
          setTimeout(() => copyToast.classList.add('hidden'), 3500);
        }
      } catch (err) {
        window.location.href = `mailto:${emailToCopy}`;
      }
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      if (feedback) {
        feedback.classList.remove('hidden');
      }

      // Generate mailto link so it directly opens user's email client
      const mailtoUrl = `mailto:${emailToCopy}?subject=${encodeURIComponent(`[Portfolio Contact] ${subject}`)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 1000);
    });
  }
}
