window.onload = function () {
    sessionStorage.removeItem('data');
}


// FOR THE FIRST POP UP WINDOW

document.getElementById('showBlock').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
});

// SECOND POP UP WINDOW (IF YOU WANT TO PLAY CUSTOM GAME)

document.getElementById('showCustom').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup2').style.display = 'block';
});

document.getElementById('closePopup2').addEventListener('click', function() {
    document.getElementById('popup2').style.display = 'none';
    document.getElementById('popup').style.display = 'block';
});

// GETTING GAMEMODE TYPE (EASY, MEDIUM OR HARD)

function submitForm(formId) {
    const form = document.getElementById(formId);
    const data = form.querySelector('input').value
    sessionStorage.setItem('data', data);
}

function submitCustomForm() {
    const word = document.getElementById('customWord').value;
    const length = document.getElementById('customLength').value;
    sessionStorage.setItem('customWord', word);
    sessionStorage.setItem('customLength', length);
}