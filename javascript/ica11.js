const quoteButton = document.querySelector('.new-quote');
quoteButton.addEventListener('click', getQuote);

const apiSrc = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

async function getQuote(){
    console.log('quote generator button pressed');
    // let text = fetch(apiSrc)
    //     .then(text => text.text());
    // console.log(text);
    let text = await fetch(apiSrc);
    let response = await text.text();
    console.log(response);

    let jsonResponse = JSON.parse(response);
    console.log(jsonResponse.message);
    let textContent = jsonResponse.message;

    displayQuote(textContent);
}

function displayQuote(text){
    console.log('displayQuote entered');

    const quoteBox = document.querySelector('#js-quote-text');
    quoteBox.textContent =  text;
}

getQuote();