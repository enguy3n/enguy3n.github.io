// https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
// https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
// https://stackoverflow.com/questions/19068070/how-to-style-a-div-to-be-a-responsive-square
// https://www.w3docs.com/snippets/javascript/how-to-disable-text-selection-copy-cut-paste-and-right-click-on-a-web-page.html
// https://www.w3schools.com/howto/howto_js_rangeslider.asp
// https://css-tricks.com/converting-color-spaces-in-javascript/
// https://stackoverflow.com/questions/3349332/getelementsbyclassname-not-working

const height = 17;
const width = 17;

let activeColor = 'red';
const activeColorPreview = document.getElementById('activeColorPreview');

const html = document.getElementsByTagName('html')[0];
const container = document.getElementById("canvasContainer");

// current color value storage
let red = 'red';
let orange = 'orange';
let yellow = 'yellow';
let green = 'green';
let blue = 'blue';
let purple = 'purple';
let brown = 'brown';
let black = 'black';
let white = 'white';

// sliders for custom color selectors
let customRed = 0;
let customGreen = 0;
let customBlue = 0;

let redSliderValue = document.getElementById('redValue');
let greenSliderValue = document.getElementById('greenValue');
let blueSliderValue = document.getElementById('blueValue');

let redSlider = document.getElementById('redSlider');
redSlider.oninput = function(){
  updateCustomColor('red', redSlider.valueAsNumber);
  updateSliderText(redSliderValue, redSlider.value);
};
let greenSlider = document.getElementById('greenSlider');
greenSlider.oninput = function(){
  updateCustomColor('green', greenSlider.valueAsNumber);
  updateSliderText(greenSliderValue, greenSlider.value);
};
let blueSlider = document.getElementById('blueSlider');
blueSlider.oninput = function(){
  updateCustomColor('blue', blueSlider.valueAsNumber);
  updateSliderText(blueSliderValue, blueSlider.value);
};

// color thumb selectors
const redSelector = document.getElementById('redContainer');
const orangeSelector = document.getElementById('orangeContainer');
const yellowSelector = document.getElementById('yellowContainer');
const greenSelector = document.getElementById('greenContainer');
const blueSelector = document.getElementById('blueContainer');
const purpleSelector = document.getElementById('purpleContainer');
const brownSelector = document.getElementById('brownContainer');
const blackSelector = document.getElementById('blackContainer');
const whiteSelector = document.getElementById('whiteContainer');
const customSelector = document.getElementById('customContainer');
const customPreview = document.getElementById('customPreview');
const eraserSelector = document.getElementById('eraserContainer');

let customColor = customPreview.style.backgroundColor;

redSelector.addEventListener('click', ()=>colorSelection(redSelector, red));
orangeSelector.addEventListener('click', ()=>colorSelection(orangeSelector, orange));
yellowSelector.addEventListener('click', ()=>colorSelection(yellowSelector, yellow));
greenSelector.addEventListener('click', ()=>colorSelection(greenSelector, green));
blueSelector.addEventListener('click', ()=>colorSelection(blueSelector, blue));
purpleSelector.addEventListener('click', ()=>colorSelection(purpleSelector, purple));
brownSelector.addEventListener('click', ()=>colorSelection(brownSelector, brown));
blackSelector.addEventListener('click', ()=>colorSelection(blackSelector, black));
whiteSelector.addEventListener('click', ()=>colorSelection(whiteSelector, white));
customSelector.addEventListener('click', ()=>colorSelection(customSelector, customPreview.style.backgroundColor));
eraserSelector.addEventListener('click', ()=>colorSelection(eraserSelector, 'transparent'));

let previousColorText = redSelector;

const bgColorButton = document.getElementById('setBGColor');
bgColorButton.addEventListener('click', changeBGColor);

// MANIPULATE CANVAS -------------------------------------

function changePixelColor(cell, activeColor){
  console.log('changing pixel color: ' + activeColor);

	cell.style.backgroundColor = activeColor;
}

function changeBGColor(){
  console.log('adjusting background color:' + activeColor);

  container.style.backgroundColor = activeColor;
}

// COLOR SELECTORS -------------------------------------------------
function colorSelection(colorSelector, color){
  console.log('color:' + color);
  // change text to  show user which color is active
  previousColorText.style.fontWeight = 'normal';
  colorSelector.style.fontWeight = 'bold';

  // update active color
  activeColor = color;
  activeColorPreview.style.backgroundColor = color;

  // update previous color selector
  previousColorText = colorSelector;
}

function updateCustomColor(channel, value){
  if(channel === 'red'){
    console.log('updating red:' + value);
    customRed = value;

  }else if(channel == 'green'){
    console.log('updating green:' + value);
    customGreen = value;
  }else{
    console.log('updating blue:' + value);
    customBlue = value;
  }

  let newColor = RGBToHexA(customRed,customGreen,customBlue);
  console.log(newColor);
  customColor = newColor;
  customPreview.style.backgroundColor = newColor;
}

// UI -------------------------------------------------

function updateSliderText(sliderText, value){
  console.log('updating slider value');
  sliderText.textContent = value.toString().padStart(3, '0');
  customSelector.style.fontWeight = 'normal'; // unselect "custom color" when sliders are wiggled
}

redSelector.style.fontWeight = 'bold'; // initialize red to be active color

function makeRows(rows, cols) {
  console.log('generating canvas');

  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (let i = 0; i < (rows * cols); i++) {
    let cell = document.createElement("div");
    // cell.innerText = (c + 1);
    container.appendChild(cell).className = "gridItem";
    cell.addEventListener('click', ()=>changePixelColor(cell, activeColor));
  }
}

// TOGGLE GRID -------------------------------------

let gridToggled = true; // default show grid

const pixels = document.getElementsByClassName('gridItem');
const toggleGridButton = document.getElementById('gridToggle');

toggleGridButton.addEventListener('click', toggleGrid);

function toggleGrid(){
  console.log('registered grid toggle');
  if(gridToggled){
    toggleGridButton.value = '0';

    Array.from(pixels).forEach((element) => element.style.border = 'none');
    gridToggled = false;
  
  }else{
    toggleGridButton.value = '1';

    Array.from(pixels).forEach((element) => element.style.border = '0.5px solid #ddd');
    gridToggled = true;
  }
}

// TOGGLE NIGHT MODE ----------------------------------

let nightModeActive = false;

const allSliders = document.getElementsByClassName('slider');
const allButtons = document.getElementsByClassName('button');

const nightModeButton = document.getElementById('UIMode');
nightModeButton.addEventListener('click', toggleNightMode);

const buttonFontSize = nightModeButton.style.fontSize;

function toggleNightMode(){
  console.log('toggling night mode');

  if(!nightModeActive){
    console.log('night mode was inactive');
    nightModeActive = true;
    
    html.style.backgroundColor = 'rgb(62, 56, 56)';
    html.style.color = 'rgb(223, 214, 208)';
    nightModeButton.value = '☾'
    nightModeButton.style.fontSize = '0.6rem';

    Array.from(allSliders).forEach((element) => element.style.border = '0.5px solid black');
    Array.from(allButtons).forEach((element)=>element.style.backgroundColor = 'rgb(52, 43, 57)');
    Array.from(allButtons).forEach((element)=>element.style.color = 'rgb(223, 214, 208)');
    Array.from(allSliders).forEach((element) => element.style.setProperty('--sliderColor', 'rgb(223, 214, 208)'));
  
  }else{
    console.log('night mode was active');
    nightModeActive = false;

    html.style.backgroundColor = 'rgb(247, 247, 247)';
    html.style.color = black;
    nightModeButton.value = '☼';
    nightModeButton.style.fontSize = buttonFontSize;

    Array.from(allSliders).forEach((element) => element.style.border = '0.5px solid #ddd');
    Array.from(allButtons).forEach((element)=>element.style.backgroundColor = 'white');
    Array.from(allButtons).forEach((element)=>element.style.color = 'black');
    Array.from(allSliders).forEach((element) => element.style.setProperty('--sliderColor', 'white'));
  }
}

// HISTORY --------------------------------------------

const historyButton = document.getElementById('saveColorToHistory');
historyButton.addEventListener('click', addToHistory);

const h1 = document.getElementById('h1');
const h2 = document.getElementById('h2');
const h3 = document.getElementById('h3');
const h4 = document.getElementById('h4');
const h5 = document.getElementById('h5');
const h6 = document.getElementById('h6');

h1.addEventListener('click', ()=>colorSelectionFromHistory(h1.style.backgroundColor));
h2.addEventListener('click', ()=>colorSelectionFromHistory(h2.style.backgroundColor));
h3.addEventListener('click', ()=>colorSelectionFromHistory(h3.style.backgroundColor));
h4.addEventListener('click', ()=>colorSelectionFromHistory(h4.style.backgroundColor));
h5.addEventListener('click', ()=>colorSelectionFromHistory(h5.style.backgroundColor));
h6.addEventListener('click', ()=>colorSelectionFromHistory(h6.style.backgroundColor));

const history = [h1, h2, h3, h4, h5, h6];
const historyMemory = history.length;

function colorSelectionFromHistory(color){
  console.log('changing color from history:' + color);
  activeColor = color;
  activeColorPreview.style.backgroundColor = color;
  customPreview.style.backgroundColor = color;
  previousColorText.style.fontWeight = 'normal';
  customSelector.style.fontWeight = 'bold';
  previousColorText = customSelector;
}

function addToHistory(){
  let red = redSlider.valueAsNumber;
  let green = greenSlider.valueAsNumber;
  let blue = blueSlider.valueAsNumber;
  
  let newColor = RGBToHexA(red,green,blue);
  console.log('adding to history:' + newColor);

  for(let i = (historyMemory - 1); i > 0; i--){
    history[i].style.backgroundColor = history[i-1].style.backgroundColor;
  }
  history[0].style.backgroundColor = newColor;

  setCursors();
}

// meant to discourage user from touching a history color if none has been saved
function setCursors(){
  for(let i = 0; i < historyMemory; i++){
    if(history[i].style.backgroundColor === 'transparent'){
      history[i].style.setProperty('--historyCursor', 'default');
    }else{
      history[i].style.setProperty('--historyCursor', 'pointer');
    }
  }
}

// MISC -----------------------------------------------

function testFunction(){
  console.log('registered');
}

function RGBToHexA(red,green,blue) {
  red = red.toString(16);
  green = green.toString(16);
  blue = blue.toString(16);

  if (red.length === 1)
    red = "0" + red;
  if (green.length === 1)
    green = "0" + green;
  if (blue.length === 1)
    blue = "0" + blue;

  return "#" + red + green + blue;
}

function testColorOnStartup(){
  h1.style.backgroundColor = 'transparent';
  h2.style.backgroundColor = 'transparent';
  h3.style.backgroundColor = 'transparent';
  h4.style.backgroundColor = 'transparent';
  h5.style.backgroundColor = 'transparent';
  h6.style.backgroundColor = 'transparent';
}


// RUN ON LOAD ------------------------------------------
testColorOnStartup();   // REMOVE LATER ----- FOR TESTING
makeRows(height, width);
document.getElementById('slidersContainer').style.borderBottom = '1.5px solid #ddd';
document.getElementById('colorHistoryContainer').style.borderBottom = '1.5px solid #ddd';
Array.from(allSliders).forEach((element) => element.style.setProperty('--sliderColor', 'white'));