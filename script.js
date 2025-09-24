// Global Variables
let currentSlide = 0;
let currentTestimonial = 0;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize All Website Functions
function initializeWebsite() {
    initNavigation();
    initScrollEffects();
    initPageSpecificFeatures();
    initAnimations();
    initSmoothScrolling();
}

// Navigation System
function initNavigation() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    if (hamburger && navLinks) {
        // Mobile Menu Toggle
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Update Hamburger Icon
            if (navLinks.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
                body.style.overflow = 'hidden';
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                hamburger.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                hamburger.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                hamburger.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Active Navigation Link Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Page Specific Features
function initPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
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
        case 'training-clips.html':
            initVideoPlayers();
            break;
        default:
            // Home page features
            initHomePageFeatures();
            break;
    }
}

// Home Page Features
function initHomePageFeatures() {
    // Banner Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 20);
        });
    }

    // Instagram Feed Hover Effects
    const instagramPosts = document.querySelectorAll('.instagram-post');
    instagramPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Gallery Slideshow
function initGallery() {
    const slides = document.querySelectorAll('.slideshow-image');
    if (slides.length === 0) return;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Auto slide every 5 seconds
    const slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slideshowContainer.addEventListener('mouseleave', () => {
            setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
    }

    showSlide(0);
}

// Testimonials Slider
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonials.length === 0) return;

    function showTestimonial(n) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        currentTestimonial = (n + testimonials.length) % testimonials.length;
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
            
            // Add loading animation
            this.innerHTML = '<span class="loading-spinner"></span> Selecting...';
            
            setTimeout(() => {
                // Store selected plan
                localStorage.setItem('selectedPlan', plan);
                localStorage.setItem('selectedPlanName', planName);
                
                // Redirect to contact page
                window.location.href = 'contact.html';
            }, 1000);
        });
    });
}

// Contact Page Plan Display
function initContact() {
    const selectedPlan = localStorage.getItem('selectedPlan');
    const selectedPlanName = localStorage.getItem('selectedPlanName');
    const planInfo = document.getElementById('selectedPlanInfo');
    
    if (selectedPlan && planInfo) {
        document.getElementById('planName').textContent = selectedPlanName;
        document.getElementById('planDetails').textContent = selectedPlan;
        planInfo.style.display = 'block';
        
        // Update WhatsApp link
        const whatsappLink = document.getElementById('whatsappLink');
        if (whatsappLink) {
            const message = `Hello MJ Fitness Club, I'm interested in the ${selectedPlanName} (${selectedPlan} plan). Please provide more details.`;
            whatsappLink.href = `https://wa.me/918861433786?text=${encodeURIComponent(message)}`;
        }
        
        // Clear storage after use
        localStorage.removeItem('selectedPlan');
        localStorage.removeItem('selectedPlanName');
    }
}

// Video Players
function initVideoPlayers() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('mouseenter', function() {
            this.play();
        });
        video.addEventListener('mouseleave', function() {
            this.pause();
            this.currentTime = 0;
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
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
}

// Scroll Animations
function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Performance Optimization
window.addEventListener('load', function() {
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });

    // Remove loading animations
    const loaders = document.querySelectorAll('.loading-spinner');
    loaders.forEach(loader => loader.remove());
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Website Error:', e.error);
});

// Export functions for global access
window.MJFitness = {
    initNavigation,
    initGallery,
    initTestimonials,
    initTrainerModals,
    initPricing,
    initContact
};
