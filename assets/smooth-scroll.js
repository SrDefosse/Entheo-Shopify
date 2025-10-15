/**
 * Lenis Smooth Scroll Integration with GSAP
 * Provides smooth scrolling experience site-wide
 * @file smooth-scroll.js
 */

// @ts-nocheck
/* global Lenis, gsap, ScrollTrigger */

document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP and Lenis are loaded
  if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') {
    console.warn('Lenis or GSAP not loaded. Smooth scroll disabled.');
    return;
  }

  // Initialize Lenis with optimized configuration
  const lenis = new Lenis({
    lerp: 0.1,              // Smoothness level (0-1, lower = smoother but slower)
    duration: 1.2,          // Animation duration
    wheelMultiplier: 0.7,   // Scroll speed adjustment
    gestureOrientation: 'vertical',
    normalizeWheel: false,
    smoothTouch: false,     // Disable on mobile for native feel
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync Lenis with GSAP ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  // Método 2: GSAP ticker integration (recommended for heavy GSAP usage)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Expose lenis globally for debugging and external use
  window.lenis = lenis;

  // Anchor link smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.5,
        });
      }
    });
  });

  // Disable smooth scroll in Shopify theme editor
  if (window.Shopify && window.Shopify.designMode) {
    lenis.destroy();
  }
});

