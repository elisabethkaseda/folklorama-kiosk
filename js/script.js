// Game functionality
// Basis borrowed from https://www.youtube.com/watch?v=xWdkt6KSirw with lots of extras

const cardData = [
    {
        "image": "./images/brazil.svg",
        "name": "Brazil"
    },
    {
        "image": "./images/chile.svg",
        "name": "Chile"
    },
    {
        "image": "./images/china.svg",
        "name": "China"
    },
    {
        "image": "./images/ethiopia.svg",
        "name": "Ethiopia"
    },
    {
        "image": "./images/india.svg",
        "name": "India"
    },
    {
        "image": "./images/japan.svg",
        "name": "Japan"
    },
    {
        "image": "./images/metis-nation.svg",
        "name": "Metis Nation"
    },
    {
        "image": "./images/philippines.svg",
        "name": "Philippines"
    },
    {
        "image": "./images/ukraine.svg",
        "name": "Ukraine"
    }
]

const characterSpace = document.querySelector('.character-space');
const win = document.querySelector('#win');
const cardArea = document.querySelector('.card-area');
const cards = [...cardData, ...cardData];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

shuffleCards();
generateCards();

function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.innerHTML = `
            <div class="front">
                <img class="flag-image" src=${card.image} />
            </div>
            <div class="back"></div>
        `;
        cardArea.appendChild(cardElement);
        cardElement.addEventListener('click', flipCard);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score++;

    switch(firstCard.dataset.name) {
        case "Brazil":
            characterSpace.innerHTML = `
                <img src="images/win.svg" alt="Globe character" />
                <p class="speaking">You found Brazil! Did you know Brazil has the biggest rainforest in the world? The Amazon is so big it makes 20% of the world’s oxygen!</p>
            `;
            break;
        case "Chile":
            characterSpace.innerHTML = `
                <img src="images/win.svg" alt="Globe character" />
                <p class="speaking">You found Chile! Did you know Chile has more than 2,000 volcanoes? Some of them are still active and even smoke sometimes!</p>
            `;
            break;
        case "China":
            characterSpace.innerHTML = `
                <img src="images/win.svg" alt="Globe character" />
                <p class="speaking">You found China! Did you know ice cream was invented in China? People there were eating frozen milk treats over 2,000 years ago!</p>
            `;
            break;
        case "Ethiopia": 
            characterSpace.innerHTML = `
                <img src="images/win.svg" alt="Globe character" />
                <p class="speaking">You found Ethiopia! Did you know Ethiopia runs on a different clock? Their day starts at sunrise, not midnight—so 7 AM for you is actually 1 o’clock in Ethiopia!</p>
            `;
            break;
        case "India":
            characterSpace.innerHTML = `
                <img src="images/win.svg" alt="Globe character" />
                <p class="speaking">You found India! Did you know India has a floating post office? It's in the middle of a lake in Kashmir, and you can actually send letters from it!</p>
            `;
            break;
        case "Japan":
            characterSpace.innerHTML = `
                <img src="images/win.svg" alt="Globe character" />
                <p class="speaking">You found Japan! Did you know there’s a rabbit island in Japan? Okunoshima is full of friendly bunnies that love visitors!</p>
            `;
            break;
        case "Metis Nation":
            characterSpace.innerHTML = `
                <img src="images/win.svg" alt="Globe character" />
                <p class="speaking">You found the Metis Nation! Did you know Métis people have their own special flag? It has an infinity symbol, which means their culture will last forever!</p>
            `;
            break;
        case "Philippines":
            characterSpace.innerHTML = `
                <img src="images/win.svg" alt="Globe character" />
                <p class="speaking">You found the Philippines! Did you know the Philippines has over 7,000 islands? You could visit a new island every day for almost 20 years!</p>
            `;
            break;
        case "Ukraine":
            characterSpace.innerHTML = `
                <img src="images/win.svg" alt="Globe character" />
                <p class="speaking">You found Ukraine! Did you know Ukraine has the world's longest musical instrument? The "trembita" is a wooden horn that can be over 3 meters long—almost as big as a car!</p>
            `;
            break;
    }

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        characterSpace.innerHTML = `
            <img src="images/wrong.svg" alt="Globe character" />
            <p class="speaking">Oh no, these flags don’t match. Please try again!</p>
        `;
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    if (score === 9) {
        win.showModal();
    }
}

function finalReset() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    finalReset();
    shuffleCards();
    score = 0;
    cardArea.innerHTML = "";
    characterSpace.innerHTML = `
        <img src="images/talking.svg" alt="Globe character" />
        <p class="speaking">Hello there, I’m a Folk Globe. I’ll help you to complete the game. Tap on a card to flip it!</p>
    `;
    generateCards();
}


// Dialog stuff

const standbyScreen = document.querySelector('#standby-screen');
const decorCards = document.querySelector('.decor');
const homeBtn = document.querySelector('#home');
const playBtn = document.querySelector('#to-game');

homeBtn.addEventListener('click', () => {
    standbyScreen.classList.remove('hidden');
    decorCards.classList.remove('hidden');
    restart();
});

playBtn.addEventListener('click', () => {
    standbyScreen.classList.add('hidden');
    decorCards.classList.add('hidden');
});

const about = document.querySelector('#about');
const openAboutBtn = document.querySelector('#open-about');
const closeAboutBtn = document.querySelector('#close-about');

openAboutBtn.addEventListener('click', () => {
    about.showModal();
});

closeAboutBtn.addEventListener('click', () => {
    about.close();
});

const closeWinBtn = document.querySelector('#close-win');

closeWinBtn.addEventListener('click', () => {
    win.close();
})

const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', () => {
    restart();
});