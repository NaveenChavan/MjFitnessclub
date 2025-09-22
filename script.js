document.addEventListener('DOMContentLoaded', () => {
    // For trainer bio modal
    const trainerCards = document.querySelectorAll('.trainer-card');
    const modal = document.getElementById('bioModal');
    const trainerNameElement = document.getElementById('trainerName');
    const trainerBioElement = document.getElementById('trainerBio');
    const closeButton = document.querySelector('.close-button');

    function openModal(name, bio) {
        trainerNameElement.textContent = name;
        trainerBioElement.textContent = bio;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (trainerCards.length > 0) {
        trainerCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target === card || card.contains(e.target)) {
                    const name = card.getAttribute('data-name');
                    const bio = card.getAttribute('data-bio');
                    openModal(name, bio);
                }
            });
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
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

        // Hide menu when a link is clicked
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
});