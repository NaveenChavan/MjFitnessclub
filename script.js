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
    initSmoothScrolling();
    initImageLoading();
}

// Navigation System - FIXED
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
            link.addEventListener('click', (e) => {
                // Only close if it's mobile view
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    hamburger.classList.remove('active');
                    body.style.overflow = 'auto';
                }
            });
        });

        // Close menu when clicking outside (mobile only)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !e.target.closest('.navbar') && 
                navLinks.classList.contains('active')) {
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

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
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
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    // Active Navigation Link Highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || (current === '' && href === '#home')) {
                link.classList.add('active');
            }
        });
    });
}

// Page Specific Features
function initPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
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
            initHomePageFeatures();
            break;
    }
}

// Home Page Features
function initHomePageFeatures() {
    // Banner Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.textContent);
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            entry.target.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(current) + '+';
                        }
                    }, 30);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }
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
    let slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slideshowContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
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
    
    if (!modal) return;

    trainerCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const bio = this.getAttribute('data-bio');
            
            document.getElementById('trainerName').textContent = name;
            document.getElementById('trainerBio').textContent = bio;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    const closeBtn = document.querySelector('.close-button');
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
            
            // Store selected plan
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
    }
}

// Video Players
function initVideoPlayers() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.controls = true;
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

// Image Loading Optimization
function initImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        // Add error handling
        img.onerror = function() {
            this.style.display = 'none';
            console.log('Image failed to load:', this.src);
        };
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Website Error:', e.error);
});

// Initialize when window loads
window.addEventListener('load', function() {
    console.log('MJ Fitness Club Website Loaded Successfully!');
});
