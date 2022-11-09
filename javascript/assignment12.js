// text content vars
const areaCode = document.querySelector('.areaCode');
const midDigits = document.querySelector('.firstThree');
const lastDigits = document.querySelector('.finalDigits');
const verification = document.querySelector('.verification');

// input selectors
const areaCodeSelector = document.querySelector('.areaCodeButton');
const midDigitsSelector = document.querySelector('.middleDigitsButton');
const submitSelector = document.querySelector('.submitButton');

areaCodeSelector.addEventListener('click', modifyAreaCode);
midDigitsSelector.addEventListener('click', modifyMid);
submitSelector.addEventListener('click', submit);

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
        alert('area code ' + newValue + ' is not a valid area code.');
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
        alert('digits ' + newValue + ' cannot fit here.');
    }
}

function submit(){
    console.log('submit pressed');

    let stringContent = 'your phone number has been recieved. your number was ';
    stringContent += '(' + areaCode.textContent
                   + ')' + midDigits.textContent
                   + '-' + lastDigits.textContent + '.';
    verification.textContent = stringContent;

    reset();
}

// causes submission text to disapepar when any button is pressed
function resetSubmission(){
    verification.textContent = '';
    
}