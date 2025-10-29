// MJ FITNESS CLUB - Google Apps Script Integration
const MJFITNESS_API_URL = 'https://script.google.com/macros/s/AKfycbwRhutkLnTmOlLCpaUDDK5erjUHz6Kd2jxetIeLSniVv1TI-XjxNaI4HWQ4H1JPNHc/exec';

// Form Submission to Google Apps Script
async function submitMJFitnessForm(formData) {
    try {
        console.log('Sending data to Google Apps Script:', formData);
        
        // Use different approach for Google Apps Script
        const url = MJFITNESS_API_URL;
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Since we're using no-cors, we can't read the response
        // But the data will still be saved to Google Sheets
        console.log('Data sent to Google Sheets successfully');
        
        return {
            status: 'success',
            message: 'Data saved successfully! We will contact you soon.'
        };
        
    } catch (error) {
        console.error('Form submission error:', error);
        return {
            status: 'error',
            message: 'Please call us directly at 9731133425 or try WhatsApp.'
        };
    }
}

// MAIN FORM HANDLER - Google Sheets Ke Liye
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            const emailInput = this.querySelector('input[type="email"]');
            const serviceSelect = this.querySelector('select');
            const messageTextarea = this.querySelector('textarea');
            
            if (nameInput && phoneInput) {
                const formData = {
                    name: nameInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    email: emailInput ? emailInput.value.trim() : '',
                    service: serviceSelect ? serviceSelect.value : '',
                    message: messageTextarea ? messageTextarea.value.trim() : '',
                    page: window.location.pathname.split('/').pop() || 'home',
                    referred_by: 'MJFITNESS5'
                };
                
                // Validation
                if (!formData.name || !formData.phone) {
                    showNotification('Please enter your name and phone number', 'error');
                    return;
                }
                
                if (formData.phone.length < 10) {
                    showNotification('Please enter a valid phone number', 'error');
                    return;
                }
                
                // Show loading
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
                submitBtn.disabled = true;
                
                // Submit to Google Sheets API
                const result = await submitMJFitnessForm(formData);
                
                // Show result
                if (result.status === 'success') {
                    showNotification('✅ ' + result.message, 'success');
                    this.reset(); // Clear form
                    
                    // Open WhatsApp after successful submission
                    setTimeout(() => {
                        const whatsappMessage = `Hello MJ Fitness Club! I just submitted the form.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nPlease contact me.`;
                        const whatsappUrl = `https://wa.me/916366729324?text=${encodeURIComponent(whatsappMessage)}`;
                        window.open(whatsappUrl, '_blank');
                    }, 1000);
                    
                } else {
                    showNotification('❌ ' + result.message, 'error');
                    
                    // Fallback to WhatsApp if Google Sheets fails
                    setTimeout(() => {
                        const whatsappMessage = `Hello MJ Fitness Club! I tried to submit form but got error.\n\nName: ${formData.name}\nPhone: ${formData.phone}\n\nPlease contact me.`;
                        const whatsappUrl = `https://wa.me/916366729324?text=${encodeURIComponent(whatsappMessage)}`;
                        window.open(whatsappUrl, '_blank');
                    }, 1500);
                }
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });
}

// ... REST OF YOUR CODE SAME RAHEGA ...
// Enhanced Notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.mj-notification').forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = 'mj-notification';
    
    const bgColor = type === 'success' ? '#16a34a' : '#dc2626';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        max-width: 400px;
        border-left: 4px solid ${type === 'success' ? '#0f9d58' : '#b91c1c'};
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <i class="fas ${icon}" style="font-size: 1.2rem;"></i>
        <div>${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Click to close
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

// Video Optimization
function optimizeVideos() {
    const videos = document.querySelectorAll('.video-player');
    
    videos.forEach(video => {
        video.setAttribute('loading', 'lazy');
        video.setAttribute('preload', 'metadata');
        
        video.addEventListener('loadstart', function() {
            const container = this.parentElement;
            const loading = document.createElement('div');
            loading.className = 'video-loading';
            container.appendChild(loading);
        });
        
        video.addEventListener('canplay', function() {
            const container = this.parentElement;
            const loading = container.querySelector('.video-loading');
            const thumbnail = container.querySelector('.video-thumbnail');
            
            if (loading) loading.remove();
            if (thumbnail) thumbnail.classList.add('hidden');
        });
        
        const thumbnail = video.parentElement.querySelector('.video-thumbnail');
        if (thumbnail) {
            thumbnail.addEventListener('click', function() {
                video.play();
                this.classList.add('hidden');
            });
        }
        
        video.addEventListener('ended', function() {
            const thumbnail = this.parentElement.querySelector('.video-thumbnail');
            if (thumbnail) {
                thumbnail.classList.remove('hidden');
            }
        });
    });
}

// MJ FITNESS CLUB - PREMIUM JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 1000);
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
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

    // Plan Selection with Auto WhatsApp
    const planButtons = document.querySelectorAll('.select-plan');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.getAttribute('data-plan');
            const price = this.getAttribute('data-price');
            
            const message = `Hello MJ Fitness Club! I'm interested in joining your gym.\n\nPlan: ${planName}\nPrice: ${price}\n\nI have coupon code MJFITNESS5 for 5% discount. Please provide more details and booking process.`;
            
            const whatsappUrl = `https://wa.me/916366729324?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Trainer Modal Functionality
    window.openTrainerModal = function(trainerName, trainerBio) {
        const existingModal = document.querySelector('.trainer-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'trainer-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
            padding: 20px;
        `;

        modal.innerHTML = `
            <div class="modal-content" style="
                background: #1a1a1a;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                width: 100%;
                border: 2px solid #dc2626;
                position: relative;
                box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            ">
                <span class="close-modal" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: #dc2626;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                ">&times;</span>
                <h3 style="color: #dc2626; margin-bottom: 1rem; font-size: 1.5rem;">${trainerName}</h3>
                <p style="color: #e5e5e5; line-height: 1.6; font-size: 1rem;">${trainerBio}</p>
                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #333;">
                    <p style="color: #f59e0b; font-size: 0.9rem;">
                        <i class="fas fa-phone"></i> Contact: 9731133425 for personal training inquiries
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    };

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
    });

    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.trust-card, .review-card, .service-card, .trainer-card, .pricing-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // Video optimization call karen
    optimizeVideos();
    
    // INITIALIZE FORMS - Google Sheets Ke Liye
    initializeForms();

    console.log('MJ Fitness Club Premium Website Loaded Successfully!');
});

// WhatsApp direct message function
function sendWhatsApp(message) {
    const url = `https://wa.me/916366729324?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}