// selectors
const generatorButton = document.querySelector('.button');
const contentBox = document.querySelector('.generatedContent');
let inputValue = document.getElementById('numberPicker');

// event listeners
generatorButton.addEventListener('click', generateContent);

// APIs
let baseAPISrc = 'https://meowfacts.herokuapp.com/';

async function generateContent(){
    console.log('registed click to generator button');

    // retrieve desired number of cat facts
    let numberOfFacts = inputValue.value;
    if(numberOfFacts < 1){
        numberOfFacts = 1;
    }
    console.log("desired fact count: ",numberOfFacts);

    //update number of values being grabbed
    let apiSrc = baseAPISrc + '?count=' + numberOfFacts;
    console.log(apiSrc);
    let retrievedData = "";
    
    let i = 0;
 
    // fetch data
    let text = await fetch(apiSrc);
    let response = await text.text();
    console.log(response);
    let jsonResponse =JSON.parse(response);
    
    // update content text
    do{
        retrievedData = retrievedData + '\r\n\n' + jsonResponse.data[i];
        i++;
    }while(i < numberOfFacts);
    
    updateText(retrievedData);
}

function updateText(text){
    console.log('entered text updating function');

    contentBox.textContent = text;
}