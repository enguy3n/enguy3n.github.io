// const button = document.querySelector('.button');
// const output = document.querySelector('.output');
// let phone_content = document.querySelector('.phone');

// button.addEventListener('click', updateOutput);

// function updateOutput() {
//     output.textContent = phone_content.value;
//     alert(phone_content.value);
// }

const minusButton = document.querySelector('.minus-button').addEventListener('click', minus);
const plusButton = document.querySelector('.plus-button').addEventListener('click', plus);
const resetButton = document.querySelector('.reset-button').addEventListener('click', reset);
const randomButton = document.querySelector('.random-button').addEventListener('click', random);
const submitButton = document.querySelector('.submit-button').addEventListener('click', submit);
const number = document.querySelector('.output');

function minus(){
    console.log('minus entered');
    
    let value = Number(number.textContent);
    console.log(value);

    if(value > 0){
        value--;
        let newValue =  value.toString().padStart(10, '0');
        console.log(newValue);
        number.textContent = newValue;
    }
}

function plus(){
    console.log('plus entered');

    let value = Number(number.textContent);
    console.log(value);

    if(value < 9999999999){
        value++;
        let newValue = value.toString().padStart(10, '0');
        console.log(newValue);
        number.textContent = newValue;
    }
}

function reset(){
    let resetValue = 0;
    number.textContent = resetValue.toString().padStart(10, '0');
}

function random(){
    let min = 0;
    let max = 10000000000; //noninclusive
    let value = Math.floor(Math.random() * (max - min) + min);
    
    console.log(value);
    number.textContent = value.toString().padStart(10, '0');
}

function submit(){
    alert(number.textContent);
}