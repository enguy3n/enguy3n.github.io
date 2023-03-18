// GLOBAL -------------------------------------------------------------
let timeout = 1; // 40
let score = 0;
let highScore = 0;
let freyjaHP = 25;
let hyndlaHP = 20000;
let hammerObtained = false;

// GAME BOX VARIABLES -------------------------------------------------------------
const userResponse = document.querySelector('#userResponse');
const gameResponse = document.querySelector('#gameResponse');
const optionsContainer = document.querySelector('#optionsContainer');
const scoreBox = document.querySelector('#score');

// RESET GAME -------------------------------------------------------------
let reset = document.querySelector('#resetGame');

reset.addEventListener('click', function(){
    if(confirm('Reloading the game will lose your progress in the game.  Are you sure you want to continue?')){
        window.location.replace('');
    }else{
        console.log('reset cancelled');
    }
});

// TEXT CRAWL FUNCITONALITY -------------------------------------------------------------
function invokeCrawl(string) {
    console.log(string);
    length = string.length;
    for (let i = 0; i < length; i++) {
        crawlText(string[i], i,);
    }
}

function crawlText(char, i,) {
    setTimeout(function() {
        if(i === 0){
            gameResponse.textContent = '';
        }
        gameResponse.append(char);
    }, timeout * i)
}

// FEEDBACK -------------------------------------------------------------
function addToScore(value){
    let newValue = value * 10; // multiplying by 10 because people love big numbers
    scoreBox.textContent = newValue + score;
    score = newValue + score;
    console.log('new score: ' + score);
    console.log('high score: ' + highScore);
    if(score > highScore){
        highScore = score;
    }
    console.log('high score after condition:' + highScore);
}
function updateResponse(string){
    userResponse.textContent = '— ' + string;
}

// FIGHT CODE -------------------------------------------------------------
function rng(max){
    return Math.floor(Math.random() * max);
}

function doFight(){
    console.log('fight started');
    optionsContainer.textContent = '';
    // default, hammer-less damage values
    let freyjaPower = 5;
    let hyndlaPower = 40;

    gameResponse.textContent = 'YOU HAVE INVOKED THE WRATH OF THE GIANTS!.';

    // box to tell user about hammer boon
    let notification = document.createElement('div');
    notification.style.color = 'red';
    notification.style.fontSize = '0.8rem';
    if(hammerObtained){
        notification.textContent = 'YOU CAN FEEL VANR-STRENGTH IN YOU.  MJOLNIR IS GREATLY BUFFING YOUR DAMAGE.';
        freyjaPower = 40000;
        hyndlaPower = 5;
    }else{
        notification.textContent = 'You regret not having Thor\'s Hammer to assit you.';
    }
    gameResponse.appendChild(notification);

    let statusContainer = document.createElement('div');
    statusContainer.style.display = 'grid';
    statusContainer.style.gridTemplateColumns = '1fr 1fr';
    statusContainer.style.padding = '30px';

    let freyjaStatus = document.createElement('div');
    freyjaStatus.style.color = 'red';
    freyjaStatus.textContent = 'FREYJA HP: ' + freyjaHP;

    let hyndlaStatus = document.createElement('div');
    hyndlaStatus.style.color = 'red';
    hyndlaStatus.textContent = 'HYNDLA HP: ' + hyndlaHP;

    statusContainer.appendChild(freyjaStatus);
    statusContainer.appendChild(hyndlaStatus);
    gameResponse.appendChild(statusContainer);

    // contain fight information
    let fightFeedback = document.createElement('div');
    gameResponse.appendChild(fightFeedback);

    // fight button
    let fightButton = document.createElement('div');
    fightButton.classList.add('button');
    fightButton.textContent = '> FIGHT';
    fightButton.addEventListener('click', function(){
        fightFeedback.textContent = '';

        let freyjaHit = rng(freyjaPower);
        let hyndlaHit = rng(hyndlaPower);

        let fHPNew = freyjaHP - hyndlaHit;
        let hHPNew = hyndlaHP - freyjaHit;

        console.log('freyja hp:' + freyjaHP + '; freyha hits for:' + freyjaHit);
        console.log('hyndla hp:' + hyndlaHP + '; hyndla hits for: ' + hyndlaHit);
        console.log('fhp recalc:' + fHPNew + 'hhp recalc: ' + hHPNew);

        // fight continues
        if(fHPNew > 0 && hHPNew > 0){
            freyjaHP = fHPNew;
            hyndlaHP = hHPNew;
            freyjaStatus.textContent = 'FREYJA HP: ' + freyjaHP;
            hyndlaStatus.textContent = 'HYNDLA HP: ' + hyndlaHP;

            fightFeedback.textContent = 'Hyndla hits you for ' + hyndlaHit + ' HP.  You hit Hyndla for ' + freyjaHit + 'HP.';
        // freyja dies
        }else if(fHPNew < 0){
            gameResponse.removeChild(statusContainer);
            gameResponse.removeChild(fightFeedback);
            let prompt = 'Hyndla hit you fatally for ' + hyndlaHit + ' damage!  You have died!  The Aesir won\'t be happy about this.';
            endGame(prompt);
        // hyndla dies
        }else{
            addToScore(2);
            gameResponse.removeChild(statusContainer);
            gameResponse.removeChild(fightFeedback);
            let prompt = 'You hit Hyndla fatally for ' + freyjaHit + ' damage!  Unfortunately, you didn\'t gain any information, so things could have gone better.'; 
            endGame(prompt);
        }
    })
    optionsContainer.appendChild(fightButton);
}

// END FUNCTIONALITY -------------------------------------------------------------
function endGame(endingText){
    optionsContainer.textContent = ''
    gameResponse.textContent = endingText;

    // create score reporting box
    let scoreReportContainer = document.createElement('div');
    scoreReportContainer.style.display = 'grid';
    scoreReportContainer.style.gridTemplateColumns = '1fr 1fr';
    scoreReportContainer.style.padding = '30px';

    let scoreBox = document.createElement('div');
    scoreBox.style.color = 'red';
    scoreBox.textContent = 'SCORE: ' + score;

    let highScoreBox = document.createElement('div');
    highScoreBox.style.color = 'red';
    highScoreBox.textContent = 'HIGH SCORE: ' + highScore;

    scoreReportContainer.appendChild(scoreBox);
    scoreReportContainer.appendChild(highScoreBox);
    gameResponse.appendChild(scoreReportContainer);

    // option to return to start
    let restart = document.createElement('div');
    restart.classList.add('button');
    restart.textContent = '> RESTART';
    restart.addEventListener('click', function(){
        gameResponse.removeChild(scoreReportContainer);
        hammerObtained = false;
        freyjaHP = 25;
        hyndlaHP = 100;
        updateResponse('');
        console.log('resetting score');
        addToScore(-1 * (score/10));
        step1();
    });
    optionsContainer.appendChild(restart);
}

// RUN ON INIT -------------------------------------------------------------
invokeCrawl('FREYJA SIMULATOR');
let beginGame = document.createElement('div')
beginGame.classList.add('button');
beginGame.textContent = '> BEGIN GAME';
optionsContainer.appendChild(beginGame);
beginGame.addEventListener('click', function(){
    optionsContainer.textContent = '';
    step1();
});

function step1(){
    console.log('game starting');
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
        giveUp.textContent = '> GIVE UP';

    optionsContainer.append(featherCoat);
    optionsContainer.append(rideOttar);
    optionsContainer.append(giveUp);

    // feather shirt code
    featherCoat.addEventListener('click', function(){
        updateResponse('FLY TO HYNDLA');
        addToScore(1);
        endGame('You fly to Hyndla.  However, you realize you forgot to bring Ottar, and now he can\'t hear his ancestry, so you go home.');
    });

    // give up code
    giveUp.addEventListener('click', function(){
        updateResponse('GIVE UP');
        endGame('Who\'s Ottar?')
    });

    // ride ottar code
    rideOttar.addEventListener('click', function(){
        updateResponse('RIDE OTTAR');
        addToScore(1);
        hammerPrompt();
    });
}

function hammerPrompt(){
    console.log('user prompted for Mjolnir');
    optionsContainer.textContent = '';
    let prompt = 'Would you like to bring Thor\'s hammer, Mjolnir?';
    invokeCrawl(prompt);

    let yes = document.createElement('div');
    let no = document.createElement('div');
    yes.classList.add('button');
    no.classList.add('button');
    yes.textContent = '> YES';
    no.textContent = '> NO';

    yes.addEventListener('click', function(){
        let hammerFeedback = 'Thor flatly responds \"No.\"  Loki owes you a favor.  You get the hammer anyway.  ';
        hammerObtained = true;
        updateResponse('MJOLNIR OBTAINED!');
        seeHyndla(hammerFeedback);
    });
    no.addEventListener('click', function(){
        let hammerFeedback = 'Moving on.  ';
        updateResponse('MOVING ON.');
        seeHyndla(hammerFeedback);
    });

    optionsContainer.appendChild(yes);
    optionsContainer.appendChild(no);
}

function seeHyndla(hammerFeedback){
    console.log('Hyndla is seen');
    optionsContainer.textContent = '';
    let prompt = hammerFeedback + 'You ride the \"Battle-Hog\" to see Hyndla.  She looks at you with interest.'
    invokeCrawl(prompt);

    // create button options
    let insult = document.createElement('div');
    insult.classList.add('button');
    insult.textContent = '> INSULT HER';
    insult.addEventListener('click', function(){
        updateResponse('YOU SAY SOMETHING VULGAR.');
        addToScore(1);
        endGame('She immediately turns you away.  You don\'t know why you did that.');
    })

    let fight = document.createElement('div');
    fight.classList.add('button');
    fight.textContent = '> FIGHT';
    fight.addEventListener('click', function(){
        updateResponse('FIGHT!');
        addToScore(1);
        doFight();
    });

    let expected = document.createElement('div');
    expected.classList.add('button');
    expected.textContent = '> SAY SOMETHING NICE';

    // add buttons
    optionsContainer.appendChild(insult);
    optionsContainer.appendChild(fight);
}
