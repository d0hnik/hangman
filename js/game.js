let word;
let tries = 6;
let displayedWord;
let gameMode;
let letters;
let customWord;

let modeClass;
let modeText;

function createDisplayedWord(word) {
    let temp = word.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
            return '_';
        } else {
            return char;
        }
    }).join('');
    document.getElementById("word").textContent = temp; // Show this word of _ on website
    let spanElement = document.createElement("span");
    console.log(modeClass)
    spanElement.className = modeClass;
    spanElement.textContent = modeText;
    document.getElementById('gameMode').appendChild(spanElement);
    return temp;
}


function getLetters() {
    gameMode = sessionStorage.getItem('data');
    console.log(gameMode);
    if (gameMode) {
        if (gameMode === "easy") {
            letters = 6
            modeClass = 'easy'
            modeText = 'EASY'
        }
        else if (gameMode === "medium") {
            letters = 8
            modeClass = 'medium'
            modeText = 'MEDIUM'
        }
        else if (gameMode === "hard") {
            letters = 10
            modeClass = 'hard'
            modeText = 'HARD'
        }
        getRandomWord();
    }
    else {
        customWord = sessionStorage.getItem('customWord');
        if (customWord) {
            gameMode = "custom"
            modeClass = 'custom'
            modeText = 'CUSTOM'
            tries = sessionStorage.getItem('customLength');
            word = customWord.toLowerCase();
            displayedWord = createDisplayedWord(word);
        }
        else {
            gameMode = "easy"
            letters = 6
            getRandomWord();
        }
    }
}

async function getRandomWord() {
    try {
        let url = `https://random-word-api.herokuapp.com/word?length=${letters}`
        const response = await fetch(url);
        const data = await response.json();
        // Get the word from API
        word = data[0];
        console.log(word);
        displayedWord = createDisplayedWord(word);
        return word;
    } catch (error) {
        console.error("Error, while getting word from API:", error);
    }
}

getLetters();

const letterButtons = document.querySelectorAll('.letter')

letterButtons.forEach((button) => {
    document.getElementById("triesCount").textContent = tries;
    button.addEventListener('click', (event) => {
        const clickedLetter = event.target.id;
        let result = word.includes(clickedLetter); // Check if there is this letter in word
        console.log(clickedLetter)
        if (result) { // If letter is correct
            displayedWord = word.split("").map((char, index) => {
                if (char === clickedLetter) {
                    return clickedLetter.toUpperCase()
                }
                else {
                    return displayedWord[index]
                }
            }).join('')

            document.getElementById('word').textContent = displayedWord;
            document.getElementById(clickedLetter).classList.add('right')// Make the letter inactive

            if (displayedWord.toLowerCase() === word) {
                sessionStorage.removeItem('data');
                setTimeout(() => {
                    document.getElementById('overlay').style.display = 'block';
                    document.getElementById('popupWin').style.display = 'block';
                },100);
            }

        }
        else {
            document.getElementById(clickedLetter).classList.add('wrong')// Make the letter inactive
            tries--;
            document.getElementById("triesCount").textContent = tries;

            const wrongLettersContainer = document.querySelector('.wrong-letters-container');
            const wrongLetterElement = document.createElement('span');
            wrongLetterElement.classList.add('wrong-letters');
            const delElement = document.createElement('del');
            delElement.textContent = clickedLetter.toUpperCase();
            wrongLetterElement.appendChild(delElement);
            wrongLettersContainer.appendChild(wrongLetterElement);


            if (tries === 0) {
                sessionStorage.removeItem('data');
                setTimeout(() => {
                    document.getElementById('overlay').style.display = 'block';
                    document.getElementById('popupLose').style.display = 'block';
                    document.getElementById('lose-word').textContent = word
                }, 100);
                document.getElementById('end-word').textContent = word;
            }
        }
    })
})