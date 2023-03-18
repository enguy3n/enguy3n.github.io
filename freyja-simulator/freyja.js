// GLOBAL
let timeout = 1; // 40
let score = 0;
let highScore = 0;
let freyjaHP = 25;
let hyndlaHP = 100;

// GAME BOX VARIABLES
const userResponse = document.querySelector('#userResponse');
const gameResponse = document.querySelector('#gameResponse');
const optionsContainer = document.querySelector('#optionsContainer');
const scoreBox = document.querySelector('#score');

// RESET GAME
let reset = document.querySelector('#resetGame');

reset.addEventListener('click', function(){
    if(confirm('Reloading the game will lose your progress in the game.  Are you sure you want to continue?')){
        window.location.replace('');
    }else{
        console.log('reset cancelled');
    }
});

// TEXT CRAWL FUNCITONALITY
function invokeCrawl(string) {
    console.log(string);
    length = string.length;
    for (let i = 0; i < length; i++) {
        crawlText(string[i], i,);
        console.log(string[i]);
    }
}

function crawlText(char, i,) {
    setTimeout(function() {
        if(i === 0){
            gameResponse.innerHTML = '';
        }
        gameResponse.append(char);
    }, timeout * i)
}

// SCORE CHANGING
function addToScore(value){
    scoreBox.textContent = value + score;
    score = value + score;
    if(score > highScore){
        highScore = score;
    }
}

// END FUNCTIONALITY
function endGame(endingText){
    optionsContainer.textContent = ''
    gameResponse.innerHTML = endingText;

    // create score reporting box
    let scoreReportContainer = document.createElement('div');
    scoreReportContainer.style.display = 'grid';
    scoreReportContainer.style.gridTemplateColumns = '1fr 1fr';
    scoreReportContainer.style.padding = '30px';

    let scoreBox = document.createElement('div');
    scoreBox.style.color = 'red';
    scoreBox.innerHTML = 'SCORE: ' + score;

    let highScoreBox = document.createElement('div');
    highScoreBox.style.color = 'red';
    highScoreBox.innerHTML = 'HIGH SCORE: ' + highScore;

    scoreReportContainer.appendChild(scoreBox);
    scoreReportContainer.appendChild(highScoreBox);
    gameResponse.appendChild(scoreReportContainer);

    // option to return to start
    let restart = document.createElement('div');
    restart.classList.add('button');
    restart.innerHTML = '> RESTART';
    restart.addEventListener('click', function(){
        addToScore(-score);
        step1();
    });
    optionsContainer.appendChild(restart);
}

// RUN ON INIT
invokeCrawl('FREYJA SIMULATOR');
let beginGame = document.createElement('div')
beginGame.classList.add('button');
beginGame.innerHTML = '> BEGIN GAME';
optionsContainer.appendChild(beginGame);
beginGame.addEventListener('click', function(){
    optionsContainer.textContent = '';
    step1();
});

function step1(){
    optionsContainer.textContent = '';
    let prompt = 'You are the vanir goddess Freyja. Your protégé, Ottar the Simpleton, is anxious to claim his inheritance against an Angantyr. However, Ottar must know his ancestry before he can do this, and the only person who can assist is the giantess Hyndla.\nYou must travel to Hyndla.';
    invokeCrawl(prompt);
    
    // create options
    let featherCoat = document.createElement('div');
        featherCoat.classList.add('button');
        featherCoat.textContent = '> FLY TO HYNDLA WITH THE FEATHER-SHIRT';

    let rideOttar = document.createElement('div');
        rideOttar.classList.add('button');
        rideOttar.textContent = '> DISGUISE OTTAR AS THE BATTLE-HOG AND RIDE THERE';

    let giveUp = document.createElement('div');
        giveUp.classList.add('button');
        giveUp.innerHTML = '> GIVE UP';

    optionsContainer.append(featherCoat);
    optionsContainer.append(rideOttar);
    optionsContainer.append(giveUp);

    // feather shirt code
    featherCoat.addEventListener('click', function(){
        addToScore(1);
        endGame('You fly to Hyndla.  However, you realize you forgot to bring Ottar, and now he can\'t hear his ancestry, so you go home.');
    });
}

