// https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
// https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
// https://stackoverflow.com/questions/47743629/input-checkbox-checked-by-default
// https://stackoverflow.com/questions/19068070/how-to-style-a-div-to-be-a-responsive-square
// https://www.w3docs.com/snippets/javascript/how-to-disable-text-selection-copy-cut-paste-and-right-click-on-a-web-page.html
// https://www.w3schools.com/howto/howto_js_rangeslider.asp
// https://css-tricks.com/converting-color-spaces-in-javascript/
// https://clarle.github.io/yui3/yui/docs/color/rgb-slider.html

const height = 15;
const width = 15;

let activeColor = 'red';

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

let redSlider = document.getElementById('redSlider');
redSlider.oninput = function(){
  updateCustomColor('red', redSlider.valueAsNumber);
};
let greenSlider = document.getElementById('greenSlider');
greenSlider.oninput = function(){
  updateCustomColor('green', greenSlider.valueAsNumber);
};
let blueSlider = document.getElementById('blueSlider');
blueSlider.oninput = function(){
  updateCustomColor('blue', blueSlider.valueAsNumber);
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

let previousColorText = redSelector;

// MANIPULATE CANVAS -------------------------------------

function changePixelColor(cell, activeColor){
  console.log('changing pixel color: ' + activeColor);

	cell.style.backgroundColor = activeColor;
}

function makeRows(rows, cols) {
  console.log('generating canvas');

  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    // cell.innerText = (c + 1);
    container.appendChild(cell).className = "gridItem";
    cell.addEventListener('click', ()=>changePixelColor(cell, activeColor));
  }
}

// COLOR SELECTORS -------------------------------------------------
function colorSelection(colorSelector, color){
  console.log('color:' + color);
  // change text to  show user which color is active
  previousColorText.style.fontWeight = 'normal';
  colorSelector.style.fontWeight = 'bold';

  // update active color
  activeColor = color;

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

// MISC -----------------------------------------------
function testFunction(){
  console.log('registered');
}

function RGBToHexA(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}


redSelector.style.fontWeight = 'bold'; // initialize red to be active color

makeRows(height, width);