// Setting up container variables for other screens

let standbyScreen = document.querySelector('#standby-screen');
let rulesPopup = document.querySelector('#game-rules');
let funFactPopup = document.querySelector('#fun-fact');
let winPopup = document.querySelector('#win-screen');
let aboutScreen = document.querySelector('#about');



// Hiding screens

function hideScreen(thisElement) {
    // console.log(thisElement.parentElement.parentElement);
    let thisScreen = thisElement.parentElement.parentElement;
    thisScreen.classList.add('hidden');
}

function hideOverlay(thisElement) {
    let thisOverlay = thisElement.parentElement.parentElement;
    thisOverlay.classList.add('hidden');
}

// Showing screens 

function showScreen(screen) {
    // console.log(document.querySelector(screen));
    let theScreen = document.querySelector(screen);
    theScreen.classList.remove('hidden');
}

function showOverlay(screen) {
    // console.log(document.querySelector(screen));
    let theOverlay = document.querySelector(screen);
    theOverlay.classList.remove('hidden');
}