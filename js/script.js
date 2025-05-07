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
    score++;
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

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    cardArea.innerHTML = "";
    generateCards();
}


// Dialog stuff

const standbyScreen = document.querySelector('#standby-screen');
const homeBtn = document.querySelector('#home');
const playBtn = document.querySelector('#to-game');

homeBtn.addEventListener('click', () => {
    standbyScreen.classList.remove('hidden');
    restart();
});

playBtn.addEventListener('click', () => {
    standbyScreen.classList.add('hidden');
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

const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', () => {
    restart();
});

