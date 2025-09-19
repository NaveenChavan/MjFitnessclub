document.addEventListener('DOMContentLoaded', () => {
    // For trainer bio modal
    const trainerCards = document.querySelectorAll('.trainer-card');
    const modal = document.getElementById('bioModal');
    const modalContent = document.querySelector('.modal-content');
    const trainerNameElement = document.getElementById('trainerName');
    const trainerBioElement = document.getElementById('trainerBio');
    const closeButton = document.querySelector('.close-button');

    trainerCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const bio = card.getAttribute('data-bio');
            
            trainerNameElement.textContent = name;
            trainerBioElement.textContent = bio;
            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // For hamburger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            navLinks.classList.remove('active');
        }
    });
});