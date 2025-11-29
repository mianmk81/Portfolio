// Magnetic Effect for Interactive Elements
function initMagneticEffect() {
  // Check if device supports hover (not touch device)
  if (window.matchMedia('(hover: none)').matches) return;
  
  // Select ALL elements that should have magnetic effect
  const magneticElements = document.querySelectorAll(`
    .btn,
    button,
    .btn-color-1,
    .btn-color-2,
    .btn-container button,
    #profile .btn,
    .project-btn,
    .submit-btn,
    .flip-btn,
    .icon,
    .contact-icon,
    .email-icon,
    .phone-icon,
    .timeline-item,
    .floating-arrow,
    .floating-arrow-up,
    .theme-toggle,
    .expand-projects-btn,
    .expand-skills-btn,
    .expand-experience-btn,
    .nav-links a,
    .hamburger-icon,
    .project-container,
    .flip-card,
    .details-container,
    article,
    .section__pic-container,
    .section__pic-container img,
    .about-pic,
    .project-img,
    .contact-info-container,
    .contact-info-container a,
    .contact-info-container p,
    #socials-container img,
    .skill-icon,
    a[href^="mailto"],
    a[href^="tel"]
  `);
  
  console.log('Magnetic elements found:', magneticElements.length);
  
  magneticElements.forEach((element, index) => {
    // Check if element is a profile picture for smoother transition
    const isProfilePic = element.classList.contains('section__pic-container') || 
                         element.classList.contains('about-pic') ||
                         element.classList.contains('project-img') ||
                         (element.tagName === 'IMG' && element.closest('.section__pic-container'));
    
    // Smoother transition for profile pictures, regular for others
    const transitionDuration = isProfilePic ? '0.6s' : '0.3s';
    const easing = isProfilePic ? 'cubic-bezier(0.23, 1, 0.32, 1)' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Force override any existing transitions with !important via inline style
    element.style.setProperty('transition', `transform ${transitionDuration} ${easing}`, 'important');
    element.style.setProperty('will-change', 'transform', 'important');
    
    // Log first few elements for debugging
    if (index < 5) {
      console.log('Element', index, ':', element.className, element.tagName, 'isProfile:', isProfilePic);
    }
    
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      // Calculate distance from cursor to element center
      const deltaX = e.clientX - elementCenterX;
      const deltaY = e.clientY - elementCenterY;
      
      // Magnetic strength - same for all elements
      const strength = 0.15;
      
      // Apply transform based on cursor position
      const moveX = deltaX * strength;
      const moveY = deltaY * strength;
      
      // Preserve rotation for floating arrows - use transform that doesn't override animation
      if (element.classList.contains('floating-arrow-up') || element.classList.contains('floating-arrow')) {
        // Skip magnetic effect for floating arrows to preserve their animations
        return;
      } else {
        const transformValue = `translate(${moveX}px, ${moveY}px)`;
        element.style.setProperty('transform', transformValue, 'important');
      }
    });
    
    element.addEventListener('mouseleave', () => {
      // Skip reset for floating arrows to preserve their animations
      if (element.classList.contains('floating-arrow-up') || element.classList.contains('floating-arrow')) {
        return;
      }

      // Reset position when mouse leaves
      const resetTransform = 'translate(0px, 0px)';
      element.style.setProperty('transform', resetTransform, 'important');
    });
  });
}

// Initialize magnetic effect after ALL other scripts with a delay
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMagneticEffect, 1000);
  });
} else {
  setTimeout(initMagneticEffect, 1000);
}
