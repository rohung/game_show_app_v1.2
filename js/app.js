const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
let missed = 0;
let ul = document.querySelector('ul');
const startButton = document.querySelector('a');
const overlay = document.getElementById('overlay');


const phrasesArray = [
    "To Be Or Not To Be",
    "May We Get What We Want And Never What We Deserve",
    "This Is Sparta",
    "I Got A Bad Feeling About This",
    "Say Hello To My Little Friend"
];



//Return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const randomNum = Math.floor( Math.random() * arr.length );
    const randomIndex = arr[randomNum];
    const phraseLowerCase = randomIndex.toLowerCase();
    const randomPhrase = phraseLowerCase.split('');
    return randomPhrase;
}

//Start of the game
const phraseArr = getRandomPhraseAsArray(phrasesArray);

//Adds the letters of a string to the display   
const addPhraseToDisplay = arr => {

    for(let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);  
        if (arr[i] === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }
}

addPhraseToDisplay(phraseArr);

//Check if the letter is in the phrase
const checkLetter = button => {
    const listItems = document.querySelectorAll('#phrase li');
    let match = null;
    for (let i = 0; i < listItems.length; i++) {
        if (button.textContent === listItems[i].textContent) {
            listItems[i].classList.add('show');
             match = button.textContent;
        } 
    }
    return match;
}

//Check if the game has been won or lost
const checkWin = () => {
    const letter =  document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const h2 = document.querySelector('h2');
    if(letter.length === show.length){
        overlay.className = 'win';
        h2.textContent = "You Win!";
        overlay.style.display = 'flex';
        resetGame();
    } else if (missed > 4) {
        overlay.className = 'lose'
        h2.textContent = "You Lose!"
        overlay.style.display = 'flex';
        resetGame();
    }
}

//Listen for the start game button to be pressed
startButton.addEventListener('click' , () => {
    overlay.className = 'hide';
});



//Listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') {
        const letterBtn = e.target;
        letterBtn.className = 'chosen';
        letterBtn.disabled = true;
        const letter = checkLetter(letterBtn);
        if(letter === null) {
           const tries = document.getElementsByTagName('img');
           tries[missed].setAttribute('src', 'images/lostHeart.png');
           missed++;    
         }
         checkWin();
    } 
});


 function resetGame() {
     missed = 0;
     ul.innerHTML = '';

     const shownLetters = document.querySelectorAll('.show');
     for (let i = 0; i < shownLetters.length; i++) {
         shownLetters[i].classList.remove('show');
         shownLetters[i].textContent = '';
     }
     const chosenBtn = document.querySelectorAll('.chosen');
     for (let i = 0; i < chosenBtn.length; i++) {
         chosenBtn[i].classList.remove('chosen');
         chosenBtn[i].disabled = false;
     }
     
     const tries = document.getElementsByTagName('img');
     for (let i = 0; i < tries.length; i++) {
         tries[i].setAttribute('src', 'images/liveHeart.png');
     }

     const phraseArr = getRandomPhraseAsArray(phrasesArray);
     addPhraseToDisplay(phraseArr);

 }
