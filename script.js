// script.js - Complete JavaScript for all pages


// Mobile menu improvement
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Better icon toggle
            if (navLinks.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
                body.style.overflow = 'hidden';
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = 'auto';
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            body.style.overflow = 'auto';
        }
    });
});
    // Initialize based on current page
    const currentPage = window.location.pathname.split('/').pop();
    initializePageFunctions(currentPage);
});

function initializePageFunctions(page) {
    switch(page) {
        case 'gallery.html':
            initGallery();
            break;
        case 'testimonials.html':
            initTestimonials();
            break;
        case 'about.html':
            initTrainerModals();
            break;
        case 'pricing.html':
            initPricing();
            break;
        case 'contact.html':
            initContact();
            break;
        default:
            // Home page or other pages
            break;
    }
}

// Gallery Slideshow
function initGallery() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideshow-image');
    const totalSlides = slides.length;
    
    if (slides.length === 0) return;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Show first slide immediately
    showSlide(0);
}

// Testimonials Slider
function initTestimonials() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const totalTestimonials = testimonials.length;
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(n) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        currentTestimonial = (n + totalTestimonials) % totalTestimonials;
        testimonials[currentTestimonial].classList.add('active');
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showTestimonial(currentTestimonial + 1));
    }
    
    // Auto slide every 8 seconds
    setInterval(() => showTestimonial(currentTestimonial + 1), 8000);
    
    // Show first testimonial immediately
    showTestimonial(0);
}

// Trainer Bio Modals
function initTrainerModals() {
    const trainerCards = document.querySelectorAll('.trainer-card');
    const modal = document.getElementById('bioModal');
    const modalName = document.getElementById('trainerName');
    const modalBio = document.getElementById('trainerBio');
    const closeBtn = document.querySelector('.close-button');
    
    if (!modal) return;
    
    trainerCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const bio = this.getAttribute('data-bio');
            
            modalName.textContent = name;
            modalBio.textContent = bio;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Pricing Plan Selection
function initPricing() {
    const planButtons = document.querySelectorAll('.select-plan-btn');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.getAttribute('data-plan');
            const planName = this.parentElement.querySelector('h3').textContent;
            
            // Store selected plan in localStorage
            localStorage.setItem('selectedPlan', plan);
            localStorage.setItem('selectedPlanName', planName);
            
            // Redirect to contact page
            window.location.href = 'contact.html';
        });
    });
}

// Contact Page Plan Display
function initContact() {
    const selectedPlan = localStorage.getItem('selectedPlan');
    const selectedPlanName = localStorage.getItem('selectedPlanName');
    const planInfo = document.getElementById('selectedPlanInfo');
    const planNameSpan = document.getElementById('planName');
    const planDetailsSpan = document.getElementById('planDetails');
    const whatsappLink = document.getElementById('whatsappLink');
    
    if (selectedPlan && planInfo && planNameSpan && planDetailsSpan) {
        planNameSpan.textContent = selectedPlanName;
        planDetailsSpan.textContent = selectedPlan;
        planInfo.style.display = 'block';
        
        // Update WhatsApp link with plan info
        if (whatsappLink) {
            const message = `Hello MJ Fitness Club, I'm interested in the ${selectedPlanName} (${selectedPlan} plan). Please provide more details.`;
            whatsappLink.href = `https://wa.me/918861433786?text=${encodeURIComponent(message)}`;
        }
        
        // Clear localStorage after displaying
        localStorage.removeItem('selectedPlan');
        localStorage.removeItem('selectedPlanName');
    }
}

// Smooth scrolling for anchor links
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

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});
