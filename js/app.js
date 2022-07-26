const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const missed = 0;
let ul = document.querySelector('ul');

const startButton = document.querySelector('a');
const overlay = document.getElementById('overlay');
const heart = document.querySelector('#scoreboard li'); 

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
    let match = null;
    const listItems = document.querySelectorAll('#phrase li');
    for (let i = 0; i < listItems.length; i++) {
        if (button.textContent === listItems[i].textContent) {
            listItems[i].className = 'show';
             match = button.textContent;
        } 
    }
    return match;
}

//Check if the game has been won or lost
const checkWin = () => {

}

//Listen for the start game button to be pressed
startButton.addEventListener('click' , () => {
    overlay.style.display = 'none';
});

//Listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') {
        e.target.className === 'chosen';
        e.target.disabled === true;
        const letter = checkLetter(e.target);
        if(letter === null) {
            const tries = document.querySelectorAll("img");
		    tries[missed].setAttribute("src", "images/lostHeart.png");
		    missed++;
         }
    } 
});


 
