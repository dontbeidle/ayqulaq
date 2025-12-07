/**
 * Ayqulaq - Animation Scripts
 * Handles scroll-based animations and interactive elements
 */

(function() {
  'use strict';

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Stagger children if present
        const children = entry.target.querySelectorAll('.tale-card');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`;
          child.classList.add('is-visible');
        });
      }
    });
  }, observerOptions);

  // Initialize animations
  function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
      animationObserver.observe(el);
    });
  }

  // Tale card hover effects
  function initCardEffects() {
    const cards = document.querySelectorAll('.tale-card');

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.tale-icon');
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
      });

      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.tale-icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
  }

  // Filter functionality for tales page
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const taleCards = document.querySelectorAll('.tale-card[data-category]');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        taleCards.forEach(card => {
          const category = card.dataset.category;

          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Reading progress indicator
  function initReadingProgress() {
    const tale = document.querySelector('.tale-content');
    if (!tale) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);

    const style = document.createElement('style');
    style.textContent = `
      .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(0,0,0,0.05);
        z-index: 1000;
      }
      .reading-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #c4956a, #d4af37);
        width: 0%;
        transition: width 0.1s ease;
      }
    `;
    document.head.appendChild(style);

    const bar = progressBar.querySelector('.reading-progress-bar');

    window.addEventListener('scroll', () => {
      const taleRect = tale.getBoundingClientRect();
      const taleTop = window.scrollY + taleRect.top;
      const taleHeight = taleRect.height;
      const scrolled = window.scrollY - taleTop + window.innerHeight / 2;
      const progress = Math.min(Math.max(scrolled / taleHeight * 100, 0), 100);
      bar.style.width = `${progress}%`;
    });
  }

  // Parallax effect for floating stars
  function initParallax() {
    const stars = document.querySelectorAll('.floating-star');
    if (stars.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          stars.forEach((star, index) => {
            const speed = 0.02 + (index * 0.01);
            const y = scrollY * speed;
            star.style.transform = `translateY(${y}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Mobile navigation toggle
  function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navClose = document.querySelector('.nav-close');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
      navLinks.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });

    if (navClose) {
      navClose.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Touch feedback for interactive elements
  function initTouchFeedback() {
    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const interactiveElements = document.querySelectorAll('.tale-card, .hero-cta, .view-all-link, .filter-btn, .nav-link');

    interactiveElements.forEach(el => {
      el.addEventListener('touchstart', () => {
        el.style.opacity = '0.8';
      }, { passive: true });

      el.addEventListener('touchend', () => {
        el.style.opacity = '';
      }, { passive: true });

      el.addEventListener('touchcancel', () => {
        el.style.opacity = '';
      }, { passive: true });
    });
  }

  // Disable animations for users who prefer reduced motion
  function initReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--transition-fast', '0s');
      document.documentElement.style.setProperty('--transition-base', '0s');
      document.documentElement.style.setProperty('--transition-slow', '0s');

      // Remove animations from animated elements
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('is-visible');
        el.style.animation = 'none';
      });
    }
  }

  // Initialize all on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initCardEffects();
    initFilters();
    initSmoothScroll();
    initReadingProgress();
    initParallax();
    initMobileNav();
    initTouchFeedback();
    initReducedMotion();
  });

})();
