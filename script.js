document.addEventListener('DOMContentLoaded', () => {
    const trainerCards = document.querySelectorAll('.trainer-card');
    const modal = document.getElementById('bioModal');
    const modalName = document.getElementById('trainerName');
    const modalBio = document.getElementById('trainerBio');
    const closeButton = document.querySelector('.close-button');

    trainerCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const bio = card.getAttribute('data-bio');

            modalName.textContent = name;
            modalBio.textContent = bio;
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
});