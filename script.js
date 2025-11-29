// Loading Screen and Initial Animations
let hasAnimated = false;

// Typing Animation Function
function typeWriter(text, element, speed = 100) {
  let i = 0;
  element.textContent = ''; // Clear any existing text
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

window.addEventListener('load', () => {
  if (hasAnimated) return;  // Prevent multiple animations
  
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.opacity = '0';
  
  // Initial animations
  const profilePic = document.getElementById('profile-pic');
  const profileText = document.querySelector('#profile .section__text');
  const desktopNav = document.getElementById('desktop-nav');
  
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    
    if (profilePic) {
      profilePic.style.opacity = '0';
      profilePic.classList.add('animate__animated', 'animate__fadeInLeft');
      profilePic.style.opacity = '1';
    }
    
    if (profileText) {
      profileText.style.opacity = '0';
      profileText.classList.add('animate__animated', 'animate__fadeInRight');
      profileText.style.opacity = '1';
    }
    
    if (desktopNav) {
      desktopNav.style.opacity = '0';
      desktopNav.classList.add('animate__animated', 'animate__fadeInDown');
      desktopNav.style.opacity = '1';
    }
    
    // Start typing animation after a short delay
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
      setTimeout(() => {
        typeWriter('Mubashar Mian', typedTextElement, 100);
      }, 800);
    }
    
    hasAnimated = true;  // Mark as animated
  }, 500);
});

// Remove animation classes after they complete
document.addEventListener('animationend', function(e) {
  if (e.target.id === 'profile-pic' || 
      e.target.classList.contains('section__text') || 
      e.target.id === 'desktop-nav') {
    e.target.classList.remove('animate__animated', 'animate__fadeInLeft', 'animate__fadeInRight', 'animate__fadeInDown');
  }
});

// Optimized Progress Bar with throttling
let ticking = false;
function updateProgressBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
  ticking = false;
}

window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(updateProgressBar);
    ticking = true;
  }
}, { passive: true });

// Expand/collapse Experience section
function toggleExperience() {
  const expandable = document.getElementById('expandable-experience');
  const arrow = document.getElementById('experience-arrow');
  const label = document.getElementById('experience-btn-label');
  const btn = document.querySelector('.expand-experience-btn');
  if (expandable.classList.contains('hidden')) {
    expandable.classList.remove('hidden');
    arrow.style.transform = 'rotate(180deg)';
    label.textContent = 'Collapse Experience';
  } else {
    expandable.classList.add('hidden');
    arrow.style.transform = '';
    label.textContent = 'Expand Experience';
  }
}

// Attach listener after DOM loaded
window.addEventListener('DOMContentLoaded', function() {
  const expBtn = document.querySelector('.expand-experience-btn');
  if (expBtn) {
    expBtn.addEventListener('click', toggleExperience);
  }
});

// Mobile menu toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Optimized Scroll animation observer with performance improvements
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Skip profile section elements
    if (entry.target.closest('#profile')) return;

    const element = entry.target;

    if (entry.isIntersecting) {
      // Element is entering viewport - fade in
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';

      // Trigger fade in animation with requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    } else {
      // Element is leaving viewport - fade out
      element.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
    }
  });
}, observerOptions);

// Observe elements for animation (excluding profile section)
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll(`
    .section__text__p1:not(#profile *),
    .title:not(#profile *),
    .about-containers,
    .details-container,
    .project-container,
    .timeline-item,
    .contact-info-container,
    .contact-form-container
  `);
  
  elementsToAnimate.forEach(element => {
    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    observer.observe(element);
  });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src && !img.dataset.loaded) {
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        img.dataset.loaded = 'true';
        imageObserver.unobserve(img);
      }
    }
  });
}, {
  threshold: 0,
  rootMargin: '50px'
});

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    if (!img.dataset.loaded) {
      imageObserver.observe(img);
    }
  });
  
  // Theme toggle functionality
  initThemeToggle();
});

// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const body = document.body;

  // Check if user has a theme preference stored
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-theme') {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', function() {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', '');
    } else {
      body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark-theme');
    }
  });
}



// Project Card Flip Animation
function initProjectCardFlip() {
  // Get all flip cards
  const flipCards = document.querySelectorAll('.flip-card');
  
  if (flipCards.length === 0) {
    console.error('No flip cards found!');
    return;
  }
  
  console.log('Found ' + flipCards.length + ' flip cards');
  
  // Function to reset all cards except the current one
  function resetOtherCards(currentCard) {
    flipCards.forEach(card => {
      if (card !== currentCard) {
        card.classList.remove('flipped');
      }
    });
  }
  
  // Add click events to each card
  flipCards.forEach(card => {
    // Get elements
    const flipBtn = card.querySelector('.flip-btn');
    const frontCard = card.querySelector('.flip-card-front');
    const backCard = card.querySelector('.flip-card-back');
    
    // Add click event to the Explore button
    if (flipBtn) {
      flipBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        resetOtherCards(card);
        card.classList.add('flipped');
      };
    }
    
    // Add click event to the front of the card
    if (frontCard) {
      frontCard.addEventListener('click', function(e) {
        // Only flip if not clicking a button
        if (!e.target.closest('.btn')) {
          resetOtherCards(card);
          card.classList.add('flipped');
        }
      });
    }
    
    // Add click event to the back of the card
    if (backCard) {
      backCard.addEventListener('click', function(e) {
        // Only flip if not clicking a button
        if (!e.target.closest('.btn')) {
          card.classList.toggle('flipped');
        }
      });
    }
    
    // Add general click event to the whole card for better touch support
    card.addEventListener('click', function(e) {
      // If clicking directly on the card container (not on a child element)
      if (e.target === card) {
        resetOtherCards(card);
        card.classList.toggle('flipped');
      }
    });
  });
}

// Animated Counter Functionality
function animateCounter(element, target, duration = 1600) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.ceil(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(current);
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length === 0) return;
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        entry.target.classList.add('counted');
        animateCounter(entry.target, target, 1600);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Custom Cursor Functionality
let cursorX = 0;
let cursorY = 0;
let trailPositions = [];

function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const trails = document.querySelectorAll('.cursor-trail');
  
  if (!cursor) return;
  
  // Check if device supports hover (not touch device)
  if (window.matchMedia('(hover: none)').matches) return;
  
  // Initialize trail positions
  trails.forEach(() => {
    trailPositions.push({ x: 0, y: 0 });
  });
  
  // Update cursor position with 1:1 sensitivity (same as laptop cursor)
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    // Update main cursor immediately for 1:1 sensitivity
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
  });
  
  // Animate trail with slight delay
  function animateTrail() {
    // Update trail positions with delay
    trailPositions.unshift({ x: cursorX, y: cursorY });
    trailPositions = trailPositions.slice(0, trails.length);
    
    trails.forEach((trail, index) => {
      const delay = (index + 1) * 2; // Small delay multiplier
      
      if (trailPositions[index]) {
        const targetX = trailPositions[index].x;
        const targetY = trailPositions[index].y;
        
        trail.style.left = targetX + 'px';
        trail.style.top = targetY + 'px';
        trail.style.opacity = Math.max(0.1, 0.8 - (index * 0.14)); // Fade out effect with minimum opacity
      }
    });
    
    requestAnimationFrame(animateTrail);
  }
  
  animateTrail();
  
  // Add hover effect for interactive elements using event delegation
  const interactiveSelector = 'a, button, input, textarea, select, .icon, .btn, .project-container, .details-container, .timeline-item, .flip-card, .hamburger-icon, .nav-links li, .theme-toggle, .floating-arrow, .floating-arrow-up, .expand-projects-btn, .expand-skills-btn, .expand-experience-btn, .contact-info-container';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add('hover');
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.remove('hover');
    }
  });
  
  // Show cursor after initialization
  cursor.style.opacity = '1';
  // Trail opacity is controlled dynamically in animateTrail function
}

// Parallax Effect for Profile Section
function initParallax() {
  const profileSection = document.getElementById('profile');
  if (!profileSection) return;

  let lastScrollY = window.scrollY;
  let tickingParallax = false;

  function updateParallax() {
    const scrolled = window.scrollY;
    const profilePic = document.getElementById('profile-pic');
    const profileText = document.querySelector('#profile .section__text');

    if (profilePic && scrolled < window.innerHeight) {
      // Move profile pic slower than scroll (parallax effect)
      profilePic.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    if (profileText && scrolled < window.innerHeight) {
      // Move text slightly faster for depth effect
      profileText.style.transform = `translateY(${scrolled * 0.15}px)`;
    }

    tickingParallax = false;
  }

  window.addEventListener('scroll', function() {
    if (!tickingParallax) {
      window.requestAnimationFrame(updateParallax);
      tickingParallax = true;
    }
  }, { passive: true });
}

// Smooth scroll to anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Add visual feedback on scroll
function initScrollEffects() {
  let lastScroll = 0;
  const nav = document.getElementById('desktop-nav');
  const hamburgerNav = document.getElementById('hamburger-nav');
  const scrollUpBtn = document.getElementById('floatingArrowUp');

  window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;

    // Add shadow to nav on scroll
    if (currentScroll > 50) {
      if (nav) nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      if (hamburgerNav) hamburgerNav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      if (nav) nav.style.boxShadow = 'none';
      if (hamburgerNav) hamburgerNav.style.boxShadow = 'none';
    }

    // Show/hide scroll to top button based on scroll position
    if (scrollUpBtn) {
      if (currentScroll > 300) {
        scrollUpBtn.style.opacity = '1';
        scrollUpBtn.style.pointerEvents = 'auto';
      } else {
        scrollUpBtn.style.opacity = '0';
        scrollUpBtn.style.pointerEvents = 'none';
      }
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// Scroll to top functionality
function initScrollToTop() {
  const scrollUpBtn = document.getElementById('floatingArrowUp');
  if (scrollUpBtn) {
    // Initially hide the button
    scrollUpBtn.style.opacity = '0';
    scrollUpBtn.style.pointerEvents = 'none';
    scrollUpBtn.style.transition = 'opacity 0.3s ease';

    scrollUpBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Keyboard navigation enhancements
function initKeyboardNav() {
  // Allow Escape key to close mobile menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const menu = document.querySelector('.menu-links');
      const icon = document.querySelector('.hamburger-icon');
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        icon.classList.remove('open');
      }

      // Un-flip any flipped cards
      document.querySelectorAll('.flip-card.flipped').forEach(card => {
        card.classList.remove('flipped');
      });
    }

    // Allow Enter/Space to flip cards when focused
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.target.classList.contains('flip-card') || e.target.closest('.flip-card')) {
        e.preventDefault();
        const card = e.target.classList.contains('flip-card') ? e.target : e.target.closest('.flip-card');
        card.classList.toggle('flipped');
      }
    }
  });

  // Make flip cards keyboard accessible
  document.querySelectorAll('.flip-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Click or press Enter to flip card');
  });
}

// Performance monitoring (optional - can be removed in production)
function logPerformanceMetrics() {
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.log('Performance Metrics:');
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
        console.log('Connection Time: ' + connectTime + 'ms');
        console.log('Render Time: ' + renderTime + 'ms');
      }, 0);
    });
  }
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
  // Initialize custom cursor
  initCustomCursor();

  // Initialize animated counters
  initCounters();

  // Initialize project card flip animation
  setTimeout(function() {
    initProjectCardFlip();
  }, 500);

  // Initialize parallax effect
  initParallax();

  // Initialize smooth scroll
  initSmoothScroll();

  // Initialize scroll effects
  initScrollEffects();

  // Initialize scroll to top
  initScrollToTop();

  // Initialize keyboard navigation
  initKeyboardNav();

  // Log performance metrics (optional)
  logPerformanceMetrics();

  // ====== EMAILJS SETUP INSTRUCTIONS ======
  // 1. Sign up at emailjs.com and get your keys from the dashboard
  // 2. Find your Public Key in: Account > API Keys
  // 3. Find your Service ID in: Email Services > [your service] > Service ID
  // 4. Find your Template ID in: Email Templates > [your template] > Template ID
  // 5. Replace the placeholders below with your actual values
  // =========================================
  
  // Replace with your actual Public Key from EmailJS dashboard
  emailjs.init('rxMWDQRSognGePEIv');
  
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  // Real-time form validation
  if (contactForm) {
    const nameInput = contactForm.elements.name;
    const emailInput = contactForm.elements.email;
    const phoneInput = contactForm.elements.phone;
    const messageInput = contactForm.elements.message;
    
    // Validation functions
    function validateName(value) {
      return value.trim().length >= 2;
    }
    
    function validateEmail(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    
    function validatePhone(value) {
      // Phone is optional, but if filled it should match common formats
      if (value.trim() === '') return true; // Allow empty
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
    }
    
    function validateMessage(value) {
      return true; // Message field is always valid (always green)
    }
    
    function updateFieldValidation(field, isValid) {
      if (field.value.trim() === '') {
        // Remove both classes if field is empty and not yet interacted
        field.classList.remove('valid', 'invalid');
      } else if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
      } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
      }
    }
    
    // Add input event listeners for real-time validation
    nameInput.addEventListener('input', function() {
      updateFieldValidation(this, validateName(this.value));
    });
    
    nameInput.addEventListener('blur', function() {
      if (this.value.trim() !== '') {
        updateFieldValidation(this, validateName(this.value));
      }
    });
    
    emailInput.addEventListener('input', function() {
      updateFieldValidation(this, validateEmail(this.value));
    });
    
    emailInput.addEventListener('blur', function() {
      if (this.value.trim() !== '') {
        updateFieldValidation(this, validateEmail(this.value));
      }
    });
    
    phoneInput.addEventListener('input', function() {
      updateFieldValidation(this, validatePhone(this.value));
    });
    
    phoneInput.addEventListener('blur', function() {
      if (this.value.trim() !== '') {
        updateFieldValidation(this, validatePhone(this.value));
      }
    });
    
    messageInput.addEventListener('input', function() {
      updateFieldValidation(this, validateMessage(this.value));
    });
    
    messageInput.addEventListener('blur', function() {
      if (this.value.trim() !== '') {
        updateFieldValidation(this, validateMessage(this.value));
      }
    });
  }
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;
      
      // Get form data including phone number and timestamp
      const now = new Date();
      const formData = {
        name: contactForm.elements.name.value,
        email: contactForm.elements.email.value,
        phone: contactForm.elements.phone.value,
        message: contactForm.elements.message.value,
        timestamp: now.toLocaleString(),
        system_date: now.toString() // This will be accessible as {{system_date}} in your template
      };
      
      // Send email using EmailJS
      // Replace with your actual Service ID and Template ID from EmailJS dashboard
      emailjs.send('service_m6qcqzy', 'template_ixukzfc', formData)
        .then(function() {
          // Success
          formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          formStatus.classList.remove('hidden', 'error');
          formStatus.classList.add('success');
          contactForm.reset();
          // Clear validation classes after reset
          nameInput.classList.remove('valid', 'invalid');
          emailInput.classList.remove('valid', 'invalid');
          phoneInput.classList.remove('valid', 'invalid');
          messageInput.classList.remove('valid', 'invalid');
        })
        .catch(function(error) {
          // Error - silently log but don't show error to user
          console.error('Email sending failed:', error);
          // Don't show error message to user
        })
        .finally(function() {
          // Reset button state
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          
          // Hide status message after 5 seconds (if shown)
          setTimeout(function() {
            formStatus.classList.add('hidden');
          }, 5000);
        });
    });
  }
});
