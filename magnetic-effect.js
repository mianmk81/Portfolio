// Magnetic Effect for Interactive Elements
function initMagneticEffect() {
  // Check if device supports hover (not touch device)
  if (window.matchMedia('(hover: none)').matches) return;

  // Proximity distance (in pixels) - magnetic effect activates within this radius
  const PROXIMITY_DISTANCE = 100;

  // Select ALL elements that should have magnetic effect on proximity (100px)
  const magneticElements = document.querySelectorAll(`
    .btn,
    button,
    .btn-color-1,
    .btn-color-2,
    .submit-btn,
    .flip-btn,
    .project-btn,
    .icon,
    .contact-icon,
    .email-icon,
    .phone-icon,
    .skill-icon,
    img,
    .project-img,
    .about-pic,
    #profile-pic img,
    .section__pic-container img,
    #socials-container img,
    .timeline-item,
    .timeline-content,
    .timeline-header,
    .company,
    .role,
    .date-badge,
    .details-container,
    .project-container,
    .flip-card,
    .contact-info-container,
    .contact-info-container p,
    .contact-info-container a,
    #profile-pic,
    .section__pic-container,
    .theme-toggle,
    .expand-projects-btn,
    .expand-skills-btn,
    .expand-experience-btn,
    .expand-arrow,
    #projects-arrow,
    #skills-arrow,
    #experience-arrow,
    .floating-arrow,
    .floating-arrow-up,
    .nav-links a,
    .menu-links a,
    .hamburger-icon,
    .logo,
    article,
    .project-title,
    .tech-stack span,
    .project-pic,
    h1,
    h2,
    h3,
    .section__text__p1,
    .section__text__p2,
    .title,
    a[href^="mailto"],
    a[href^="tel"]
  `);

  console.log('Magnetic elements found:', magneticElements.length);

  // Set up transitions for all elements
  magneticElements.forEach((element, index) => {
    // Different transition speeds based on element type
    const isLargeBox = element.classList.contains('timeline-item') ||
                       element.classList.contains('details-container') ||
                       element.classList.contains('project-container') ||
                       element.classList.contains('contact-info-container');

    const isImage = element.tagName === 'IMG' ||
                    element.classList.contains('section__pic-container') ||
                    element.id === 'profile-pic';

    let transitionDuration, easing;

    if (isLargeBox) {
      // Large boxes: slow, smooth
      transitionDuration = '0.5s';
      easing = 'cubic-bezier(0.23, 1, 0.32, 1)';
    } else if (isImage) {
      // Images: medium smooth
      transitionDuration = '0.4s';
      easing = 'cubic-bezier(0.23, 1, 0.32, 1)';
    } else {
      // Small elements (buttons, text, icons): quick response
      transitionDuration = '0.3s';
      easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    // Force override any existing transitions with !important via inline style
    element.style.setProperty('transition', `transform ${transitionDuration} ${easing}`, 'important');
    element.style.setProperty('will-change', 'transform', 'important');

    // Log first few elements for debugging
    if (index < 10) {
      console.log('Element', index, ':', element.className || element.tagName, 'Type:', isLargeBox ? 'Box' : isImage ? 'Image' : 'Small');
    }
  });

  // Use requestAnimationFrame for better performance
  let rafId = null;
  let mouseX = 0;
  let mouseY = 0;

  // Update mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Cancel previous frame if still pending
    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    // Schedule next update
    rafId = requestAnimationFrame(updateMagneticEffect);
  });

  function updateMagneticEffect() {
    magneticElements.forEach((element) => {
      // Skip floating arrows to preserve their animations
      if (element.classList.contains('floating-arrow-up') || element.classList.contains('floating-arrow')) {
        return;
      }

      // Skip expand arrows to preserve rotation
      if (element.classList.contains('expand-arrow') ||
          element.id === 'experience-arrow' ||
          element.id === 'skills-arrow' ||
          element.id === 'projects-arrow') {
        return;
      }

      // Skip only the flip card container elements themselves to preserve flip animations
      // But allow buttons and other elements inside them to have magnetic effect
      if (element.classList.contains('flip-card-inner') ||
          element.classList.contains('flip-card-front') ||
          element.classList.contains('flip-card-back')) {
        return;
      }

      const rect = element.getBoundingClientRect();

      // Skip elements that are not visible
      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      // Calculate distance from cursor to element center
      const deltaX = mouseX - elementCenterX;
      const deltaY = mouseY - elementCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Check if cursor is within proximity distance
      if (distance < PROXIMITY_DISTANCE) {
        // Calculate magnetic strength based on distance (closer = stronger)
        const proximityFactor = 1 - (distance / PROXIMITY_DISTANCE); // 0 to 1

        // Different strength for different element types
        const isLargeBox = element.classList.contains('timeline-item') ||
                          element.classList.contains('details-container') ||
                          element.classList.contains('project-container') ||
                          element.classList.contains('contact-info-container');

        const isImage = element.tagName === 'IMG' ||
                       element.classList.contains('section__pic-container') ||
                       element.id === 'profile-pic';

        let baseStrength;
        if (isLargeBox) {
          baseStrength = 0.15; // Gentle movement for large boxes
        } else if (isImage) {
          baseStrength = 0.25; // Medium movement for images
        } else {
          baseStrength = 0.35; // Stronger movement for small elements
        }

        const strength = baseStrength * proximityFactor;

        // Apply transform based on cursor position
        const moveX = deltaX * strength;
        const moveY = deltaY * strength;

        const transformValue = `translate(${moveX}px, ${moveY}px)`;
        // Use setProperty with important to override any existing transforms
        element.style.setProperty('transform', transformValue, 'important');
      } else {
        // Reset position when cursor is outside proximity
        element.style.setProperty('transform', 'translate(0px, 0px)', 'important');
      }
    });
  }

  console.log('Magnetic effect initialized with 100px proximity on', magneticElements.length, 'elements');
}

// Initialize magnetic effect after ALL other scripts with a delay
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMagneticEffect, 1000);
  });
} else {
  setTimeout(initMagneticEffect, 1000);
}
