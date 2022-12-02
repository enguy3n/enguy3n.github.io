// IMPORTANT VARIABLES --------------------------
const height = 15;
const width = 15;

let activeColor = 'red';
const activeColorPreview = document.getElementById('activeColorPreview');

let eyedropperActive = false;

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
const allColorSelectors = document.getElementsByClassName('colorContainer');

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

const clearCanvasButton = document.getElementById('clearCanvas');
clearCanvasButton.addEventListener('click', clearCanvas);

function processPixelClick(cell, activeColor){
  console.log('processing pixel click; color: ' + activeColor);

  // if eyedropper inactive
  if(!eyedropperActive){
	  cell.style.backgroundColor = activeColor;
  
  }else{
    console.log('eyedropper active; stealing pixel color');

    let foundColor = '';
    // color will 'fall through' and choose background color if no color in pixel
    if(cell.style.backgroundColor !== 'transparent'){
      foundColor = cell.style.backgroundColor;
    
    }else{
      foundColor = container.style.backgroundColor;
    }
    customPreview.style.backgroundColor = foundColor;
  }
}

function changeBGColor(){
  console.log('adjusting background color:' + activeColor);

  container.style.backgroundColor = activeColor;
}

function clearCanvas(){
  console.log('clearing canvas');
  Array.from(pixels).forEach((element => element.style.backgroundColor = 'transparent'));
}

// COLOR SELECTORS -------------------------------------------------
function colorSelection(colorSelector, color){
  console.log('color:' + color);
  // toggle off eyedropper
  eyedropperActive = false;
  eyedropper.style.fontWeight = 'normal';

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

// EYEDROPPER-SPECIFIC CODE -----------------------------------------
const eyedropper = document.getElementById('eyedropperContainer');
eyedropper.addEventListener('click', toggleEyedropper);

function toggleEyedropper(){
  console.log('toggling eyedropper');

  // toggle on
  if(!eyedropperActive){
    console.log('eyedropper on');
    
    eyedropperActive = true;

    Array.from(allColorSelectors).forEach((element) => element.style.fontWeight = 'normal');
    eyedropper.style.fontWeight = 'bold';

  // toggle off
  }else{
    console.log('eyedropper off');

    eyedropperActive = false;
    eyedropper.style.fontWeight = 'normal';
  }
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
    cell.addEventListener('click', ()=>processPixelClick(cell, activeColor));
    cell.style.backgroundColor = 'transparent'; // initialize pixel to be transparent
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

const history = [h1, h2, h3, h4, h5, h6];
const historyMemory = history.length;

for(let i = 0; i < historyMemory; i++){
  history[i].addEventListener('click', ()=>colorSelectionFromHistory(history[i].style.backgroundColor));
}

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

function initializeHistory(){
  for(let i = 0; i < historyMemory; i++){
    history[i].style.backgroundColor = 'transparent';
  }
}


// RUN ON LOAD ------------------------------------------
initializeHistory();   // REMOVE LATER ----- FOR TESTING
makeRows(height, width);
document.getElementById('slidersContainer').style.borderBottom = '1.5px solid #ddd';
document.getElementById('colorHistoryContainer').style.borderBottom = '1.5px solid #ddd';
Array.from(allSliders).forEach((element) => element.style.setProperty('--sliderColor', 'white'));