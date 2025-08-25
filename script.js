
// Hero Slider functionality
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Slide data with different content for each slide
const slideData = [
    {
        title: "AGRONEGÓCIO",
        description: "Utilizamos tecnologia de ponta para garantir que sua carga chegue no destino com máxima segurança e agilidade."
    },
    {
        title: "PLACAS SOLARES",    
        description: "Proteção total, veículos adequados e cuidado em cada quilômetro para entregar sua carga impecável."
    },
    {
        title: "MÁQUINAS E EQUIPAMENTOS",
        description: "Estrutura reforçada para cargas industriais com total proteção e estabilidade."
    },
    {
        title: "PRODUTOS QUÍMICOS",
        description: "Transporte especializado com protocolos rigorosos para garantir integridade e segurança total."
    }
];

// Auto-play interval
let slideInterval;

// Initialize slider
function initSlider() {
    if (slides.length > 0) {
        // Set initial content without animation
        const titleElement = document.getElementById('heroTitle');
        const subtitleElement = document.getElementById('heroSubtitle');
        const descriptionElement = document.getElementById('heroDescription');
        
        if (titleElement && subtitleElement && descriptionElement && slideData[0]) {
            titleElement.textContent = slideData[0].title;
            subtitleElement.textContent = slideData[0].subtitle;
            descriptionElement.textContent = slideData[0].description;
            
            // Add initial fade-in animation
            setTimeout(() => {
                titleElement.classList.add('fade-in');
                subtitleElement.classList.add('fade-in');
                descriptionElement.classList.add('fade-in');
            }, 1000);
        }
        
        showSlide(0);
        startAutoPlay();
    }
}

// Update slide content with fade animation
function updateSlideContent(index) {
    const titleElement = document.getElementById('heroTitle');
    const subtitleElement = document.getElementById('heroSubtitle');
    const descriptionElement = document.getElementById('heroDescription');
    
    if (titleElement && subtitleElement && descriptionElement && slideData[index]) {
        // Remove fade-in classes first
        titleElement.classList.remove('fade-in');
        subtitleElement.classList.remove('fade-in');
        descriptionElement.classList.remove('fade-in');
        
        // Update content after a brief delay
        setTimeout(() => {
            titleElement.textContent = slideData[index].title;
            subtitleElement.textContent = slideData[index].subtitle;
            descriptionElement.textContent = slideData[index].description;
            
            // Add fade-in classes with staggered timing
            setTimeout(() => titleElement.classList.add('fade-in'), 100);
            setTimeout(() => subtitleElement.classList.add('fade-in'), 100);
            setTimeout(() => descriptionElement.classList.add('fade-in'), 100);
        }, 150);
    }
}

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    // Update content
    updateSlideContent(index);
    
    currentIndex = index;
}

// Next slide
function nextSlide() {
    const next = (currentIndex + 1) % totalSlides;
    showSlide(next);
}

// Previous slide
function prevSlide() {
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(prev);
}

// Change slide (called by navigation buttons)
function changeSlide(direction) {
    stopAutoPlay();
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
    startAutoPlay();
}

// Go to specific slide (called by dots)
function currentSlide(index) {
    stopAutoPlay();
    showSlide(index - 1);
    startAutoPlay();
}

// Start auto-play
function startAutoPlay() {
    if (totalSlides > 1) {
        slideInterval = setInterval(nextSlide, 5000);
    }
}

// Stop auto-play
function stopAutoPlay() {
    clearInterval(slideInterval);
}

// Smooth scrolling functionality
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// Toast notification
function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Handle form validation
function validateForm() {
    const requiredFields = ['name', 'phone', 'email', 'message'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else if (field) {
            field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
    
    return isValid;
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    initSlider();
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Pause auto-play on hover
    const heroSlider = document.querySelector('.hero');
    if (heroSlider) {
        // heroSlider.addEventListener('mouseenter', stopAutoPlay);
        // heroSlider.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Here you would normally send the data to your server
                console.log('Form submitted:', data);
                
                // Show success message
                showToast();
                
                // Reset form
                this.reset();
            }
        });
    }
    
    // Phone number formatting
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                e.target.value = value;
            }
        });
    }
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function(e) {
            const email = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                e.target.style.borderColor = '#ef4444';
            } else {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    }
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
