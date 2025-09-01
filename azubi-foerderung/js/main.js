// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for navbar height
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    // Track CTA click for analytics
    trackCTAClick('scroll_to_' + sectionId);
}

// Start Förder-Check function
function startFoerderCheck() {
    // Track main CTA click
    trackCTAClick('foerder_check_start');
    
    // For now, show an alert - in production this would redirect to a form or external service
    alert('🎉 Förder-Check wird gestartet!\n\nIn der finalen Version würde hier ein Formular oder eine externe Seite geöffnet werden.');
    
    // You can implement actual redirect logic here:
    // window.location.href = 'https://your-form-service.com/foerder-check';
    // or open a modal with the form
}

// CTA Click Tracking (Analytics ready)
function trackCTAClick(actionName) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': actionName,
            'value': 1
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: actionName
        });
    }
    
    // Console log for development
    console.log('CTA clicked:', actionName);
}

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll (optional)
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.process-step, .testimonial-card, .example-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Form validation (for future forms)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Future form handler
function handleFormSubmission(formData) {
    // Validate form data
    const errors = [];
    
    if (!formData.email || !validateEmail(formData.email)) {
        errors.push('Bitte gib eine gültige E-Mail-Adresse ein.');
    }
    
    if (!formData.phone || !validatePhone(formData.phone)) {
        errors.push('Bitte gib eine gültige Telefonnummer ein.');
    }
    
    if (!formData.ausbildung || formData.ausbildung.trim().length < 2) {
        errors.push('Bitte gib deine Ausbildung an.');
    }
    
    if (errors.length > 0) {
        alert('Bitte korrigiere folgende Fehler:\n\n' + errors.join('\n'));
        return false;
    }
    
    // Track form submission
    trackCTAClick('form_submission');
    
    return true;
}

// WhatsApp link handler
function openWhatsApp() {
    const message = encodeURIComponent('Hallo Jan! Ich interessiere mich für den kostenlosen Förder-Check für Azubis. 💰');
    const whatsappUrl = `https://wa.me/49123456789?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    trackCTAClick('whatsapp_contact');
}

// Email link handler
function openEmail() {
    const subject = encodeURIComponent('Förder-Check Anfrage');
    const body = encodeURIComponent('Hallo Jan,\n\nich interessiere mich für den kostenlosen Förder-Check für Azubis.\n\nMeine Ausbildung:\nMeine Situation:\n\nViele Grüße');
    const emailUrl = `mailto:info@azubi-foerderung.de?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
    
    trackCTAClick('email_contact');
}

// Add event listeners for contact methods
document.addEventListener('DOMContentLoaded', () => {
    // WhatsApp links
    const whatsappLinks = document.querySelectorAll('.whatsapp-link');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsApp();
        });
    });
    
    // Email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackCTAClick('email_contact');
        });
    });
    
    // Phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackCTAClick('phone_contact');
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navbar.contains(e.target);
    const isMenuOpen = navMenu.classList.contains('active');
    
    if (!isClickInsideNav && isMenuOpen) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Performance optimization: Lazy load images (when added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add CSS class for animated elements
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('🚀 Azubi-Förderung Website geladen!');
console.log('📊 Analytics-Tracking ist aktiviert für CTA-Buttons');
console.log('📱 Mobile-optimierte Navigation verfügbar');
