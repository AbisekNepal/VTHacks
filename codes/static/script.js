const feed = document.getElementById("swiper")
let mock_data = [{ fullname: "Jade Tsai", interests: "Alcohol", major: "Psychology", experience: "none", university: "UNC" }, { fullname: "Bayne Albin", interests: "Weights", major: "ME", experience: "1-3", university: "UNCC" }, { fullname: "Ryan Suh", interests: "Video games", major: "CS", experience: "3-5", university: "NC State" }]

showFirstCard()

function swipeLeft() {
    const card = document.getElementById(`curr`);
    card.classList.add('swipe-left');
    setTimeout(() => {
        card.style.display = 'none';
        showNextCard();
    }, 300);
}

function swipeRight() {
    const card = document.getElementById(`curr`);
    card.classList.add('swipe-right');
    setTimeout(() => {
        card.style.display = 'none';
        showNextCard();
    }, 300);
}

function showFirstCard() {
    const next = mock_data.pop()
    const new_element = document.createElement("div")
    new_element.className = "card"
    new_element.id = "curr"
    new_element.innerHTML = `<div class="card-header"><h2>${next.fullname}</h2><img class="profile-picture" src="${imageUrl}" alt="Profile Picture"></div><div class="card-body"><p>Interests: ${next.interests}</p><p>Major: ${next.major}</p><p>Hackathon Experience: ${next.experience}</p><p>University: ${next.university}</p></div><div class="card-footer"><button class="swipe-button left" onclick="swipeLeft()">❌</button><button class="swipe-button right" onclick="swipeRight()">✔️</button></div>`
    feed.appendChild(new_element)
    currentCard++;
}

function showNextCard() {
    const old = document.getElementById("curr")
    old.remove()
    const next = mock_data.pop()
    const new_element = document.createElement("div")
    new_element.className = "card"
    new_element.id = "curr"
    new_element.innerHTML = `<div class="card-header"><h2>${next.fullname}</h2><img class="profile-picture" src="${imageUrl}" alt="Profile Picture"></div><div class="card-body"><p>Interests: ${next.interests}</p><p>Major: ${next.major}</p><p>Hackathon Experience: ${next.experience}</p><p>University: ${next.university}</p></div><div class="card-footer"><button class="swipe-button left" onclick="swipeLeft()">❌</button><button class="swipe-button right" onclick="swipeRight()">✔️</button></div>`
    feed.appendChild(new_element)
    currentCard++;
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