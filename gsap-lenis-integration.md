# GSAP Integration & New Sections Plan

## 1. Smooth Scroll Integration (Updated with Best Practices)

Add Lenis CSS styles in `<head>` of `layout/theme.liquid` for proper behavior:

- `html.lenis { height: auto; }`
- `.lenis.lenis-smooth { scroll-behavior: auto; }`
- `.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }`
- `.lenis.lenis-stopped { overflow: hidden; }`

Add Lenis CDN before `</body>`: `https://unpkg.com/lenis@1.3.11/dist/lenis.min.js` (latest version)

Create `assets/smooth-scroll.js` to initialize Lenis with optimized configuration:

- `lerp: 0.1` (smoothness level)
- `wheelMultiplier: 0.7` (scroll speed adjustment)
- `gestureOrientation: "vertical"` (vertical scrolling)
- `normalizeWheel: false` (native wheel behavior)
- `smoothTouch: false` (disable on mobile for native feel)

Sync with GSAP ScrollTrigger properly (Two valid methods - usar Método 2):

- Use `lenis.on('scroll', ScrollTrigger.update)` for event sync
- Método 1 (vanilla): `function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }`
- Método 2 (GSAP integrated - RECOMENDADO): `gsap.ticker.add((time) => lenis.raf(time * 1000))` + `gsap.ticker.lagSmoothing(0)`
- Método 2 es preferible cuando se usan muchas animaciones GSAP

## 2. GSAP Animations System

- Create `assets/gsap-animations.js` with popular scroll animations:
- Fade in on scroll
- Slide in from sides (left/right)
- Stagger animations for multiple elements
- Parallax effects for images
- Scale and rotate animations
- Text reveal animations
- Pin sections on scroll
- Auto-initialize animations on elements with data attributes (e.g., `data-gsap-animation="fade-in"`)

## 3. Backdrop Blur Styling

- Add backdrop blur utility classes to `assets/base.css`:
- `.backdrop-blur` component classes
- Glass morphism effect variations
- Minimalist card styles with semi-transparent backgrounds

## 4. Lookbook Section

- Create `sections/lookbook.liquid`:
- Grid/masonry layout for images
- Configurable number of columns
- Image picker blocks
- Overlay text support
- GSAP scroll animations on images
- Schema for Shopify editor configuration

## 5. Promotional Video Section

- Create `sections/promo-video.liquid`:
- Video background support (Shopify video or YouTube/Vimeo embed)
- Overlay content with heading, text, CTA button
- Backdrop blur overlay option
- Autoplay and loop controls
- GSAP entrance animations
- Fully configurable in editor

## 6. About Us Content Sections

- Create `sections/about-philosophy.liquid`:
- Image + text layout (media with content pattern)
- GSAP scroll animations
- Backdrop blur text containers

- Create `sections/about-founder.liquid`:
- Founder image + bio layout
- Quote/testimonial styling
- Animated text reveals

- Create `sections/about-story.liquid`:
- Timeline or narrative layout
- Multiple text + image blocks
- Scroll-triggered animations

## 7. Future Collections Preview Section

- Create `sections/future-collections.liquid`:
- Collection preview cards
- "Coming Soon" badges
- Date/season labels
- Hover effects with backdrop blur
- GSAP stagger animations
- Image picker for collection previews

## 8. Page Templates

- Create `templates/page.about.json`:
- Include about-philosophy, about-founder, about-story sections

- Create `templates/page.lookbook.json`:
- Include lookbook section with hero

- Create `templates/page.future-collections.json`:
- Include future-collections section

## Key Features

- All sections fully configurable via Shopify editor
- GSAP animations applied automatically via data attributes
- Smooth scroll working site-wide
- Backdrop blur components for modern, minimalist UI
- Mobile-responsive designs
- Performance optimized (lazy loading, efficient animations)

## Files to Create/Modify

- `layout/theme.liquid` (add Lenis CDN)
- `assets/smooth-scroll.js` (new)
- `assets/gsap-animations.js` (new)
- `assets/base.css` (add backdrop blur utilities)
- `sections/lookbook.liquid` (new)
- `sections/promo-video.liquid` (new)
- `sections/about-philosophy.liquid` (new)
- `sections/about-founder.liquid` (new)
- `sections/about-story.liquid` (new)
- `sections/future-collections.liquid` (new)
- `templates/page.about.json` (new)
- `templates/page.lookbook.json` (new)
- `templates/page.future-collections.json` (new)