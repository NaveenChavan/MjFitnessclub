// MJ FITNESS CLUB - Professional JavaScript
document.addEventListener('DOMContentLoaded', function() {
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

    // Form Submission Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            
            if (nameInput && phoneInput) {
                const name = nameInput.value;
                const phone = phoneInput.value;
                
                const message = `Hello MJ Fitness Club!\n\nI'm interested in your services:\nName: ${name}\nPhone: ${phone}\n\nI have coupon code MJFITNESS5 for 5% discount. Please contact me with more details.`;
                
                const whatsappUrl = `https://wa.me/916366729324?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Thank you! We will contact you shortly.');
            }
        });
    });

    // Trainer Modal Functionality
    window.openTrainerModal = function(trainerName, trainerBio) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.trainer-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create new modal
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
        `;

        modal.innerHTML = `
            <div class="modal-content" style="
                background: #1a1a1a;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                border: 2px solid #dc2626;
                position: relative;
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

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    };

    // Notification System
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #16a34a;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-size: 1rem;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

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

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateX(100px);
            }
            to { 
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .trainer-modal {
            animation: fadeIn 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);

    console.log('MJ Fitness Club Website Loaded Successfully!');
});

// WhatsApp direct message function
function sendWhatsApp(message) {
    const url = `https://wa.me/916366729324?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Call button enhancement
function enhanceCallButtons() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            // Track phone call clicks if needed
            console.log('Phone call initiated:', this.href);
        });
    });
}