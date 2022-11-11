// text content vars
const areaCode = document.querySelector('.areaCode');
const midDigits = document.querySelector('.firstThree');
const lastDigits = document.querySelector('.finalDigits');
const verification = document.querySelector('.verification');

// input selectors
const areaCodeSelector = document.querySelector('.areaCodeButton');
const midDigitsSelector = document.querySelector('.middleDigitsButton');
const lastDigitsSelector = document.querySelector('.lastDigitsButton');
const submitSelector = document.querySelector('.submitButton');

// pass box
const passBox = document.querySelector('.passWrapper');
const key = document.querySelector('.passPhrase');
const generateLastDigits = document.querySelector('.generateLastDigits');
const feedback = document.querySelector('.feedback');
const userInput = document.getElementById('passInput');
const submitPass = document.querySelector('.submitPass');

areaCodeSelector.addEventListener('click', modifyAreaCode);
midDigitsSelector.addEventListener('click', modifyMid);
lastDigitsSelector.addEventListener('click', callFinal);
submitSelector.addEventListener('click', submit);
submitPass.addEventListener('click', checkPhrase);
generateLastDigits.addEventListener('click', generateFinal);


// resets number back to (000)000-0000
function reset(){
    const defaultVal = 0;
    areaCode.textContent = defaultVal.toString().padStart(3, '0');
    midDigits.textContent = defaultVal.toString().padStart(3, '0');
    lastDigits.textContent = defaultVal.toString().padStart(4, '0');

    //dummy values to text reset selectors
    // areaCode.textContent = 123;
    // midDigits.textContent = 123;
    // lastDigits.textContent = 1234;
}

// resets passbox
function resetPassBox(){
    passBox.style.display = 'none';
    generateLastDigits.style.display = 'none';
    feedback.textContent = '';
}

function modifyAreaCode(){
    console.log('modifying area code');

    resetSubmission();

    let min = 0;
    let max = 1500;
    let newValue = Math.floor(Math.random() * (max - min) + min);
    console.log('area code: got value: ', newValue);

    if(newValue >= 201 && newValue <= 999){
        areaCode.textContent = newValue;
    }else{
        reset();
        alert('area code ' + newValue + ' is not a valid area code.  your number has been reset.');
        resetPassBox();
    }
}

function modifyMid(){
    console.log('modifying mid three');

    resetSubmission();

    let min = 0;
    let max = 1500;

    let newValue = Math.floor(Math.random() * (max - min) + min);
    console.log('mid: got value: ', newValue);

    if(newValue >= 0 && newValue < 1000){
        midDigits.textContent = newValue.toString().padStart(3, '0');
    }else{
        reset();
        alert('digits ' + newValue + ' cannot fit here.  your number has been reset.');
        resetPassBox();
    }
}

function generateFinal(){
    console.log('generating final');

    resetSubmission();

    let min = 0;
    let max = 10800;

    let newValue = Math.floor(Math.random() * (max - min) + min);
    console.log('final: got value: ', newValue);

    if(newValue >= 0 && newValue < 10000){
        lastDigits.textContent = newValue.toString().padStart(4, '0');
    }else{
        reset();
        alert('digits ' + newValue + ' cannot fit here.  your number has been reset.');
        resetPassBox();
    }
}

// pass box stuff
function callFinal(){
    console.log('modifying last digits');

    resetSubmission();
    openPassBox();
}

function openPassBox(){
    console.log('pass box triggered');
    passBox.style.display = 'block';

    generatePassPhrase();
}

function generatePassPhrase(){
    console.log('generating passphrase');
    let passPhrase = '';
    for(let i = 0; i < 25; i++){
        // choose whether this value is a number or letter
        let charType = Math.floor(Math.random() * (10-0) + 0);

        if(charType % 2 === 0){
            // number
            let newValue = Math.floor(Math.random() * (58 - 48) + 48);
            newValue = String.fromCharCode(newValue);
            passPhrase += newValue;
        }else{
            // letter
            let newValue = Math.floor(Math.random() * (123 - 97) + 97);
            console.log(newValue);
            newValue = String.fromCharCode(newValue);
            passPhrase += newValue;
        }
        console.log(passPhrase);
    }

    key.textContent = passPhrase;
}

function checkPhrase(){
    inputPhrase = userInput.value;
    console.log(inputPhrase);

    if(inputPhrase === key.textContent){
        feedback.textContent = '';
        generateLastDigits.style.display = 'block';
    }else{
        feedback.textContent = 'incorrect phrase.  please try again.'
        generatePassPhrase();
        generateLastDigits.style.display = 'none';
    }
}

// final submission
function submit(){
    console.log('submit pressed');

    let stringContent = 'your phone number has been recieved. your number was ';
    stringContent += '(' + areaCode.textContent
                   + ')' + midDigits.textContent
                   + '-' + lastDigits.textContent + '.';
    verification.textContent = stringContent;

    reset();
    resetPassBox();
}

// causes submission text to disapepar when any button is pressed
function resetSubmission(){
    verification.textContent = '';
}
