document.addEventListener('DOMContentLoaded', () => {
    // For trainer bio modal
    const trainerCards = document.querySelectorAll('.trainer-card');
    const modal = document.getElementById('bioModal');
    const trainerNameElement = document.getElementById('trainerName');
    const trainerBioElement = document.getElementById('trainerBio');
    const closeButton = document.querySelector('.close-button');

    if (trainerCards.length > 0) {
        trainerCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const name = card.getAttribute('data-name');
                const bio = card.getAttribute('data-bio');
                
                trainerNameElement.textContent = name;
                trainerBioElement.textContent = bio;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Navigation background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // For hamburger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });

        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });
    }

    // For gallery slideshow
    const slideshowImages = document.querySelectorAll('.slideshow-image');
    if (slideshowImages.length > 0) {
        let currentImageIndex = 0;
        
        function showNextImage() {
            slideshowImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
            slideshowImages[currentImageIndex].classList.add('active');
        }
        
        slideshowImages[currentImageIndex].classList.add('active');
        setInterval(showNextImage, 3000);
    }

    // Testimonial Slideshow Functionality
    function initTestimonialSlider() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        let currentSlide = 0;

        if (slides.length === 0) return;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            
            if (index >= slides.length) currentSlide = 0;
            if (index < 0) currentSlide = slides.length - 1;
            
            slides[currentSlide].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide++;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide--;
                showSlide(currentSlide);
            });
        }

        setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 5000);
    }

    initTestimonialSlider();

    // PLAN SELECTION FUNCTIONALITY
    const selectPlanButtons = document.querySelectorAll('.select-plan-btn');
    
    if (selectPlanButtons.length > 0) {
        selectPlanButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedPlan = this.getAttribute('data-plan');
                
                // Store the selected plan in localStorage
                localStorage.setItem('selectedPlan', selectedPlan);
                
                // Redirect to contact page
                window.location.href = 'contact.html';
            });
        });
    }

    // CONTACT PAGE FUNCTIONALITY - Update WhatsApp links based on selected plan
    const whatsappLink = document.getElementById('whatsappLink');
    const floatingWhatsapp = document.getElementById('floatingWhatsapp');
    const selectedPlanInfo = document.getElementById('selectedPlanInfo');
    const planNameElement = document.getElementById('planName');
    const planDetailsElement = document.getElementById('planDetails');
    
    if (whatsappLink && floatingWhatsapp) {
        const selectedPlan = localStorage.getItem('selectedPlan');
        
        if (selectedPlan) {
            // Show selected plan information
            selectedPlanInfo.style.display = 'block';
            
            let planName = '';
            let planDetails = '';
            let whatsappMessage = '';
            
            switch(selectedPlan) {
                case 'individual':
                    planName = 'Individual Plan';
                    planDetails = 'Individual Plan (Monthly: Rs. 3,500, 3 Months: Rs. 9,000, 6 Months: Rs. 15,000, 1 Year: Rs. 23,000)';
                    whatsappMessage = 'Hello MJ Fitness Club, I am interested in joining your Individual Plan. Please provide me with more details.';
                    break;
                case 'couple':
                    planName = 'Couple Plan';
                    planDetails = 'Couple Plan (6 Months: Rs. 24,000, 1 Year: Rs. 36,000)';
                    whatsappMessage = 'Hello MJ Fitness Club, I am interested in joining your Couple Plan. Please provide me with more details.';
                    break;
                case 'buddy':
                    planName = 'Buddy Plan';
                    planDetails = 'Buddy Plan (3 Months: Rs. 15,000, 6 Months: Rs. 27,000)';
                    whatsappMessage = 'Hello MJ Fitness Club, I am interested in joining your Buddy Plan. Please provide me with more details.';
                    break;
            }
            
            // Update plan information display
            planNameElement.textContent = planName;
            planDetailsElement.textContent = planDetails;
            
            // Encode the message for WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/918861433786?text=${encodedMessage}`;
            
            // Update both WhatsApp links
            whatsappLink.href = whatsappURL;
            floatingWhatsapp.href = whatsappURL;
            
            // Clear the stored plan after use (optional)
            // localStorage.removeItem('selectedPlan');
        }
    }
});