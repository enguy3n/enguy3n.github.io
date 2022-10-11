
let input = document.getElementsByTagName('input')[0];
let span = document.getElementsByTagName('span')[0];

//button text change
function buttonTextChange(){
    document.getElementById('button').innerHTML = 'button was clicked';
}

//compute multiple of 3
function computeResult(value){
    let result = value * 3;
    span.innerHTML = result;
}

input.oninput = function(){
    let inputValue = parseFloat(input.value);
    computeResult(inputValue);
}