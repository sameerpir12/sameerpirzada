// ============================================
// PORTFOLIO JAVASCRIPT - Sameer Pirzada
// ============================================

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.project-card, .expertise-card, .highlight-card, .skill-category, .contact-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SCROLL-TO-TOP BUTTON
// ============================================

// Create scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    align-items: center;
    justify-content: center;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll-to-top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// ACTIVE NAV LINK STYLING
// ============================================

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--secondary-color) !important;
        border-bottom: 2px solid var(--secondary-color);
        padding-bottom: 5px;
    }
    
    .scroll-to-top:hover {
        background-color: #2980b9;
        transform: translateY(-5px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(style);

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// NAVBAR SHADOW ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// FORM VALIDATION (FOR FUTURE CONTACT FORM)
// ============================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = {};
    
    if (!formData.name || formData.name.trim() === '') {
        errors.name = 'Name is required';
    }
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.email = 'Valid email is required';
    }
    
    if (!formData.message || formData.message.trim() === '') {
        errors.message = 'Message is required';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Press '/' to focus on nav links
    if (e.key === '/') {
        e.preventDefault();
        const firstNavLink = document.querySelector('.nav-link');
        if (firstNavLink) {
            firstNavLink.focus();
        }
    }
    
    // Press 'h' to go to home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Press 'c' to go to contact
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// DARK MODE TOGGLE (Optional Enhancement)
// ============================================

function initDarkMode() {
    const darkModeToggle = localStorage.getItem('darkMode') === 'true';
    
    if (darkModeToggle) {
        document.body.classList.add('dark-mode');
    }
}

// Call on page load
initDarkMode();

// ============================================
// ANALYTICS TRACKING
// ============================================

// Track which sections users visit
const visitedSections = new Set();

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            visitedSections.add(entry.target.id);
            console.log(`User visited section: ${entry.target.id}`);
        }
    });
}, { threshold: 0.25 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log('%c Welcome to Sameer Pirzada\'s Portfolio! ', 'background: #2c3e50; color: #3498db; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c Network Engineer | Cybersecurity Specialist | Political Science Enthusiast ', 'color: #7f8c8d; font-size: 14px;');
console.log('%c Keyboard Shortcuts: Press "/" for nav, "h" for home, "c" for contact ', 'color: #27ae60; font-size: 12px; font-style: italic;');

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Get element by ID
function getElement(id) {
    return document.getElementById(id);
}

// Add event listener shorthand
function on(element, event, callback) {
    if (element) {
        element.addEventListener(event, callback);
    }
}

// Log with timestamp
function debugLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    debugLog('Portfolio loaded successfully');
});
