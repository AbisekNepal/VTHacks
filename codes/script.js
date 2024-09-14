let currentCard = 1;

function swipeLeft(cardIndex) {
    const card = document.getElementById(`card-${cardIndex}`);
    card.classList.add('swipe-left');
    setTimeout(() => {
        card.style.display = 'none';
        showNextCard();
    }, 300);
}

function swipeRight(cardIndex) {
    const card = document.getElementById(`card-${cardIndex}`);
    card.classList.add('swipe-right');
    setTimeout(() => {
        card.style.display = 'none';
        showNextCard();
    }, 300);
}

function showNextCard() {
    currentCard++;
    if (currentCard > 3) { 
        currentCard = 1;
    }
    const nextCard = document.getElementById(`card-${currentCard}`);
    nextCard.style.display = 'block';
    nextCard.classList.remove('swipe-left', 'swipe-right');
}
// Get the dropdown menu and its items
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = dropdownMenu.querySelectorAll('a');

// Add event listeners to each dropdown item
dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Get the selected hackathon
        const selectedHackathon = e.target.textContent;

        // Update the button text to reflect the selected hackathon
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        dropdownToggle.textContent = selectedHackathon;

        // Optionally, perform other actions based on the selected hackathon
        console.log(`Selected Hackathon: ${selectedHackathon}`);
    });
});