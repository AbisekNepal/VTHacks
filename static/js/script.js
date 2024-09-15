let currentCard = 0;

const cards = document.querySelectorAll('.card')

// function swipeLeft(cardIndex) {
//     const card = document.getElementById(`card-${cardIndex}`);
//     card.classList.add('swipe-left');
//     setTimeout(() => {
//         card.style.display = 'none';
//         showNextCard();
//     }, 300);
// }

function showCard(index) {
    cards.forEach((card, i) => {
        card.style.display = (i === index) ? 'block' : 'none';
    });
}

function swipeLeft() {
    // Hide the current card
    cards[currentIndex].style.display = 'none';
    
    // Increment index
    currentIndex++;
    
    // Show the next card if available
    if (currentIndex < cards.length) {
        showCard(currentIndex);
    }
}

// function swipeRight(cardIndex) {
//     const card = document.getElementById(`card-${cardIndex}`);
//     card.classList.add('swipe-right');
//     setTimeout(() => {
//         card.style.display = 'none';
//         showNextCard();
//     }, 300);
// }

function swipeRight() {
    // Send the current card index to the server
    fetch('/add_to_team', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index: currentIndex })
    })
    .then(response => response.json())
    .then(data => {
        // Handle response (e.g., show confirmation message)
        console.log(data.message);
    })
    .catch(error => console.error('Error:', error));

    // Hide the current card
    cards[currentIndex].style.display = 'none';
    
    // Increment index
    currentIndex++;
    
    // Show the next card if available
    if (currentIndex < cards.length) {
        showCard(currentIndex);
    }
}

// Initial setup
showCard(currentIndex);

// function showNextCard() {
//     currentCard++;
//     if (currentCard > 3) { 
//         currentCard = 1;
//     }
//     const nextCard = document.getElementById(`card-${currentCard}`);
//     nextCard.style.display = 'block';
//     nextCard.classList.remove('swipe-left', 'swipe-right');
// }

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