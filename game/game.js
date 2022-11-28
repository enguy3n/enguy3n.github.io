// https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
// https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
// https://stackoverflow.com/questions/47743629/input-checkbox-checked-by-default
// https://stackoverflow.com/questions/19068070/how-to-style-a-div-to-be-a-responsive-square

const height = 15;
const width = 15;

let activeColor = 'red';

const container = document.getElementById("canvasContainer");

// color thumb selectors
const redSelector = document.getElementById('redContainer');
const orangeSelector = document.getElementById('orangeContainer');
const yellowSelector = document.getElementById('yellowContainer');
const greenSelector = document.getElementById('greenContainer');
const blueSelector = document.getElementById('blueContainer');
const purpleSelector = document.getElementById('purpleContainer');
const brownSelector = document.getElementById('brownContainer');
const blackSelector = document.getElementById('blackContainer');

redSelector.addEventListener('click', ()=>colorSelection(redSelector, 'red'));
orangeSelector.addEventListener('click', ()=>colorSelection(orangeSelector, 'orange'));
yellowSelector.addEventListener('click', ()=>colorSelection(yellowSelector, 'yellow'));
greenSelector.addEventListener('click', ()=>colorSelection(greenSelector, 'green'));
blueSelector.addEventListener('click', ()=>colorSelection(blueSelector, 'blue'));
purpleSelector.addEventListener('click', ()=>colorSelection(purpleSelector, 'purple'));
brownSelector.addEventListener('click', ()=>colorSelection(brownSelector, 'brown'));
blackSelector.addEventListener('click', ()=>colorSelection(blackSelector, 'black'));

let previousColorText = redSelector;

// MANIPULATE CANVAS -------------------------------------

function changePixelColor(cell, activeColor){
  console.log('changing pixel color');

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

// MISC -----------------------------------------------
function testFunction(){
  console.log('registered');
}

redSelector.style.fontWeight = 'bold'; // initialize red to be active color

makeRows(height, width);