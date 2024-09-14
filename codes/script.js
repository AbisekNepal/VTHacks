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