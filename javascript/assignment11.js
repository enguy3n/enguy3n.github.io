// selectors
const generatorButton = document.querySelector('.button');
const contentBox = document.querySelector('.generatedContent');
let inputValue = document.getElementById('numberPicker');

// event listeners
generatorButton.addEventListener('click', generateContent);

// APIs
const apiSrc = 'https://meowfacts.herokuapp.com/';

async function generateContent(){
    console.log('registed click to generator button');

    // retrieve desired number of cat facts
    let numberOfFacts = inputValue.value;
    console.log("desired fact count: ",numberOfFacts);

    let retrievedData = "";
    let i = 0;
    //loop lol
    do{
        // fetch JSON
        let text = await fetch(apiSrc);
        let response = await text.text();
        console.log(response);

        // parse JSON
        let jsonResponse = JSON.parse(response);
        retrievedData = retrievedData + "\r\n" + jsonResponse.data[0];
        console.log(retrievedData);
        
        i++;
    }while(i < numberOfFacts);
    // call to update text content
    
    updateText(retrievedData);
}

function updateText(text){
    console.log('entered text updating function');

    contentBox.textContent = text;
}