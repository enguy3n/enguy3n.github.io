// GLOBAL -------------------------------------------------------------
let timeout = 40;
let score = 0;
let highScore = 0;
let freyjaHP = 25;
let hyndlaHP = 20000;
let hammerObtained = false;
let responsesExhausted = false;
let musicActive = true;

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

// TOGGLE AUDIO -------------------------------------------------------------
let audioToggle = document.querySelector('#audioToggle');
let music = document.querySelector('#music');
audioToggle.addEventListener('click', function(){
    if(musicActive){
        musicActive = false;
        music.muted = true;
    
    }else{
        musicActive = true;
        music.muted = false;
    }
})

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

    gameResponse.textContent = 'YOU HAVE INVOKED THE WRATH OF THE GIANTS!';

    // box to tell user about hammer boon
    let notification = document.createElement('div');
    notification.style.color = 'red';
    notification.style.fontSize = '0.8rem';
    if(hammerObtained){
        notification.textContent = 'YOU CAN FEEL VANR-STRENGTH IN YOU.  MJOLNIR IS GREATLY BUFFING YOUR DAMAGE.';
        freyjaPower = 40000;
        hyndlaPower = 5;
    }else{
        notification.textContent = 'You regret not having Thor\'s Hammer to assist you.';
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

        console.log('freyja hp:' + freyjaHP + '; freyha hits for: ' + freyjaHit);
        console.log('hyndla hp:' + hyndlaHP + '; hyndla hits for: ' + hyndlaHit);
        console.log('fhp recalc:' + fHPNew + 'hhp recalc: ' + hHPNew);

        // fight continues
        if(fHPNew > 0 && hHPNew > 0){
            freyjaHP = fHPNew;
            hyndlaHP = hHPNew;
            freyjaStatus.textContent = 'FREYJA HP: ' + freyjaHP;
            hyndlaStatus.textContent = 'HYNDLA HP: ' + hyndlaHP;

            fightFeedback.textContent = 'Hyndla hits you for ' + hyndlaHit + ' HP.  You hit Hyndla for ' + freyjaHit + ' HP.';
        // freyja dies
        }else if(fHPNew < 0){
            gameResponse.removeChild(statusContainer);
            gameResponse.removeChild(fightFeedback);
            updateResponse('YOU DIED!');
            let prompt = 'Hyndla hit you fatally for ' + hyndlaHit + ' damage!  You have died!  The Æsir won\'t be happy about this.';
            endGame(prompt);
        // hyndla dies
        }else{
            addToScore(2);
            gameResponse.removeChild(statusContainer);
            gameResponse.removeChild(fightFeedback);
            updateResponse('HYNDLA DIED!');
            let prompt = 'You hit Hyndla fatally for ' + freyjaHit + ' damage!  ';
            if(!responsesExhausted){
                prompt += 'Unfortunately, you didn\'t gain any information, so things could have gone better.'
            }else{
                prompt += 'That could have gone better, but you got everything Ottar needed, so it\'s time to go home.';
            }
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
        hyndlaHP = 20000;
        updateResponse('');
        console.log('resetting score');
        addToScore(-1 * (score/10));
        step1();
    });
    optionsContainer.appendChild(restart);
}

// RUN ON INIT -------------------------------------------------------------
timeout = 100;
invokeCrawl('FREYJA SIMULATOR');
timeout = 5;
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
    let prompt = 'You are the vanir goddess Freyja. Your protégé, Ottar the Simpleton, is anxious to claim his inheritance against an Angantyr. However, Ottar must know his ancestry before he can do this, and the only person who can assist is the giantess Hyndla, though she wants nothing to do with Ottar.  You must travel to Hyndla.';
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
    let prompt = hammerFeedback + 'You ride the \"Battle-Hog\" to see Hyndla.  She looks at you with interest.';
    invokeCrawl(prompt);

    // create button options
    let insult = document.createElement('div');
    insult.classList.add('button');
    insult.textContent = '> INSULT HER';
    insult.addEventListener('click', function(){
        updateResponse('YOU SAY SOMETHING VULGAR.');
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
    expected.addEventListener('click', function(){
        updateResponse('WAKE UP, GIRL OF GIRLS; WAKE UP, MY FRIEND, HYNDLA, SISTER, WHO LIVES IN THE ROCK CAVE!  WE TWO SHALL RIDE TO VALHALL, TO THE SACRED SANCTUARY.');
        addToScore(1);
        greetHyndla();
    });

    // add buttons
    optionsContainer.appendChild(insult);
    optionsContainer.appendChild(fight);
    optionsContainer.appendChild(expected);
}

function greetHyndla(){
    console.log('greeting hyndla');
    optionsContainer.textContent = '';
    let prompt = 'She looks at you suspiciously.  \"You\'re deceitful, Freyja, when you test me so, when you look at us that way, when you\'re taking your man on the road to Valhall, young Ottar, son of Innstein.\"';
    invokeCrawl(prompt);

    // create button options
    let affirm = document.createElement('div');
    affirm.classList.add('button');
    affirm.textContent = '> YOU\'VE CAUGHT ME.';
    affirm.addEventListener('click', function(){
        updateResponse('YOU ADMIT GUILT.');
        let prompt = 'The giantess swears as she chases you both away from her cave.';
        endGame(prompt)
    });

    let deny = document.createElement('div');
    deny.classList.add('button');
    deny.textContent = '> YOU\'RE MISTAKEN.';
    deny.addEventListener('click', function(){
        addToScore(1);
        let feedback = 'YOU\'RE CONFUSED, HYNDLA; I THINK YOU\'RE DREAMING WHEN YOU SAY MY MAN IS ON THE ROAD TO VALHALL, THERE WHERE MY BOAR IS GLOWING WITH HIS GOLDEN BRISTLES: BATTLE-HOG.';
        updateResponse(feedback);
        openTalk();
    });

    // append buttons
    optionsContainer.appendChild(affirm);
    optionsContainer.appendChild(deny);

}

function openTalk(){
    console.log('Hyndla obliges');
    optionsContainer.textContent = '';
    invokeCrawl('If you say so.');

    let continueConvo = document.createElement('div');
    continueConvo.classList.add('button');
    continueConvo.textContent = '> LET\'S TALK.';
    continueConvo.addEventListener('click', function(){
        addToScore(2);
        let feedback = 'LET\'S CONTEND FROM OUR SADDLES!  WE SHOULD SIT DOWN, AND TALK OF PRINCES\' LINEAGES, ABOUT THOSE MEN WHO ARE DESCENDED FROM THE GODS.  THEY HAVE WAGERED FOREIGN GOLD, YOUNG OTTAR AND ANGANTYR; IT\'S VITAL TO HELP.  OTTAR HAS ALWAYS TRUSTED IN THE GODDESSES.';
        updateResponse(feedback);
        familyTalk();
    });
    optionsContainer.appendChild(continueConvo);
}

function familyTalk(){
    console.log('Hyndla talks about family');
    optionsContainer.textContent = '';
    
    // build response string
    let response = 'Now let ancient kinsmen be counted up and men\'s lineages by declared: who is of the Skioldungs, who is of the Skilfings, who is of the Odlings, who is of the Ynglings.';
    response += '  You, Ottar, were sone of Innstein, and Innstein of Alf the Old, Alf of Ulf, Ulf of Sæfari, and Sæfari from Svan the red.';
    response += '  From them come the Skioldungs, from then the Skilfings, from them the Odlings, from them the Ynglings: all these are your kin, Ottar the simpleton.';
    response += '  Do you want to know more?'
    invokeCrawl(response);

    // responses
    let stop = document.createElement('div');
    stop.classList.add('button');
    stop.textContent = '> NEVERMIND';
    stop.addEventListener('click', function(){
        let feedback = 'THAT\'S ENOUGH.'
        updateResponse(feedback);
        let prompt = 'You could have listened for longer, but you think you\'ve heard enough.  Ottar stands a better chance against Angantyr now.';
        endGame(prompt);
    });

    let continueConvo = document.createElement('div');
    continueConvo.classList.add('button');
    continueConvo.textContent = '> GO ON.';
    continueConvo.addEventListener('click', function(){
        addToScore(1);
        updateResponse('GO ON.');
        littleVoluspa();
    });

    optionsContainer.appendChild(stop);
    optionsContainer.appendChild(continueConvo);
}

function littleVoluspa(){
    console.log('little voluspa')
    optionsContainer.textContent = '';
    responsesExhausted = true;

    // building response string
    let response = 'Eleven of the Æsir when all counted up, Baldr who slumped against a death-hammock; Vali was worthy to avenge this; all these are your kin, Ottar the simpleton.';
    response += '  All the seeresses descended from Vidolf, all the wizards from Vilmeid, all the seid-practicers from Svarthofdi, all giants from Ymir.';
    response += '  One was born greater than all, he was empowered with the strenth of earth; this prince is said to be the wewalthiest, closely related to all the great houses.';
    response += '  Then will come another, even mightier, though I dare not say his name; few can now see further than when Odin has to meet the wolf.';
    invokeCrawl(response);

    // create buttons
    let leave = document.createElement('div');
    leave.classList.add('button');
    leave.textContent = '> THAT\'S ALL.';
    leave.addEventListener('click', function(){
        updateResponse('THAT\'S ALL.');
        endGame('You depart on a good note, though you\'re unsure whether or not Ottar remembered all that.');
    })

    let expected = document.createElement('div');
    expected.classList.add('button');
    expected.textContent = '> ASK FOR MEMORY-ALE.';
    expected.addEventListener('click', function(){
        addToScore(1);
        updateResponse('GIVE SOME MEMORY-ALE TO MY BOAR, SO THAT HE CAN RECOUNT ALL THESE WORDS, THIS CONVERSATION, ON THE THIRD MORNING, WHEN HE AND ANGANTYR RECKON UP THEIR LINEAGES.');
        insult();
    });

    optionsContainer.appendChild(leave);
    optionsContainer.appendChild(expected);
}

function insult(){
    console.log('Hyndla protests');
    optionsContainer.textContent = '';

    let response = 'Hyndla angers.  \"Get away from here!  I wish to sleep, little you get from me, few pleasant things; you run about, noble lady, out in the night, as Heidrun runs in heat among the he-goats.\"';
    invokeCrawl(response);

    // options boxes
    let fight = document.createElement('div');
    fight.classList.add('button');
    fight.textContent = '> FIGHT!';
    fight.addEventListener('click', function(){
        updateResponse('FIGHT!');
        addToScore(1);
        doFight();
    });

    let insult = document.createElement('div');
    insult.classList.add('button');
    insult.textContent = '> INSULT';
    insult.addEventListener('click', function(){
        addToScore(3);
        updateResponse('I\'LL SURROUND THIS PLACE WITH FIRE FROM THE TROLL-WOMAN, SO THAT YOU CAN NEVER GET AWAY FROM HERE.');
        endGame('You depart with Ottar abruptly, and on bad terms with the giantess.  You didn\'t manage to get the memory ale, but it was the best you could do, anyway.');
    })

    // append
    optionsContainer.appendChild(fight);
    optionsContainer.appendChild(insult);
}

