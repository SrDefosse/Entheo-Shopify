/**
 * GSAP Animations System
 * Auto-initializes scroll animations based on data attributes
 * @file gsap-animations.js
 */

// @ts-nocheck
/* global gsap, ScrollTrigger */

document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Animations disabled.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Default animation settings
  const defaults = {
    duration: 1,
    ease: 'power2.out',
  };

  /**
   * Fade In Animation
   */
  const fadeInElements = document.querySelectorAll('[data-gsap-animation="fade-in"]');
  fadeInElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: defaults.duration,
      ease: defaults.ease,
    });
  });

  /**
   * Slide In from Left
   */
  const slideLeftElements = document.querySelectorAll('[data-gsap-animation="slide-left"]');
  slideLeftElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: -100,
      duration: defaults.duration,
      ease: defaults.ease,
    });
  });

  /**
   * Slide In from Right
   */
  const slideRightElements = document.querySelectorAll('[data-gsap-animation="slide-right"]');
  slideRightElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      x: 100,
      duration: defaults.duration,
      ease: defaults.ease,
    });
  });

  /**
   * Scale Up Animation
   */
  const scaleElements = document.querySelectorAll('[data-gsap-animation="scale-up"]');
  scaleElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      scale: 0.8,
      duration: defaults.duration,
      ease: defaults.ease,
    });
  });

  /**
   * Parallax Effect for Images
   */
  const parallaxElements = document.querySelectorAll('[data-gsap-animation="parallax"]');
  parallaxElements.forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -100,
      ease: 'none',
    });
  });

  /**
   * Stagger Animation for Children
   */
  const staggerContainers = document.querySelectorAll('[data-gsap-animation="stagger"]');
  staggerContainers.forEach(container => {
    const children = container.children;
    gsap.from(children, {
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: defaults.ease,
    });
  });

  /**
   * Text Reveal Animation
   */
  const textRevealElements = document.querySelectorAll('[data-gsap-animation="text-reveal"]');
  textRevealElements.forEach(el => {
    // Split text into lines and wrap each in a span
    const text = el.textContent;
    const words = text.split(' ');
    el.innerHTML = words.map(word => `<span class="word-wrapper"><span class="word">${word}</span></span>`).join(' ');
    
    const wordElements = el.querySelectorAll('.word');
    gsap.from(wordElements, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: 0.05,
      duration: 0.6,
      ease: 'back.out(1.7)',
    });
  });

  /**
   * Pin Section on Scroll
   */
  const pinElements = document.querySelectorAll('[data-gsap-animation="pin"]');
  pinElements.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true,
    });
  });

  /**
   * Rotate on Scroll
   */
  const rotateElements = document.querySelectorAll('[data-gsap-animation="rotate"]');
  rotateElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      rotation: -15,
      duration: defaults.duration,
      ease: defaults.ease,
    });
  });

  /**
   * Blur to Clear Animation
   */
  const blurElements = document.querySelectorAll('[data-gsap-animation="blur"]');
  blurElements.forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      filter: 'blur(10px)',
      duration: defaults.duration * 1.2,
      ease: defaults.ease,
    });
  });

  /**
   * Custom animation via data attributes
   * Usage: data-gsap-from='{"opacity": 0, "y": 100}'
   */
  const customElements = document.querySelectorAll('[data-gsap-from]');
  customElements.forEach(el => {
    try {
      const fromProps = JSON.parse(el.getAttribute('data-gsap-from'));
      const toProps = el.getAttribute('data-gsap-to') ? JSON.parse(el.getAttribute('data-gsap-to')) : null;
      
      const animation = {
        scrollTrigger: {
          trigger: el,
          start: el.getAttribute('data-gsap-start') || 'top 85%',
          end: el.getAttribute('data-gsap-end') || 'top 20%',
          toggleActions: el.getAttribute('data-gsap-toggle') || 'play none none reverse',
          scrub: el.hasAttribute('data-gsap-scrub') ? parseFloat(el.getAttribute('data-gsap-scrub')) || true : false,
        },
        ...fromProps,
        duration: parseFloat(el.getAttribute('data-gsap-duration')) || defaults.duration,
        ease: el.getAttribute('data-gsap-ease') || defaults.ease,
      };

      if (toProps) {
        gsap.fromTo(el, fromProps, { ...toProps, ...animation });
      } else {
        gsap.from(el, animation);
      }
    } catch (e) {
      console.warn('Invalid GSAP custom animation data:', e);
    }
  });

  // Refresh ScrollTrigger after all animations are set up
  ScrollTrigger.refresh();

  // Debug mode
  if (window.location.search.includes('gsap-debug')) {
    ScrollTrigger.getAll().forEach(st => st.markers = true);
  }
});

