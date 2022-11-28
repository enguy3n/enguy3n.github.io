// https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
// https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
// https://stackoverflow.com/questions/47743629/input-checkbox-checked-by-default
// https://stackoverflow.com/questions/19068070/how-to-style-a-div-to-be-a-responsive-square

const height = 10;
const width = 10;

let activeColor = 'red';

const container = document.getElementById("canvasContainer");

// color thumb selectors
const redSelector = document.getElementById('redContainer');
const redText = document.getElementById('redText');
const orangeSelector = document.getElementById('orangeContainer');
const orangeText = document.getElementById('orangeText');

redSelector.addEventListener('click', ()=>colorSelection(redText, 'red'));
orangeSelector.addEventListener('click', ()=>colorSelection(orangeText, 'orange'));

let previousColorText = redText;

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
function colorSelection(colorTextName, color){
  console.log('color:' + color);
  // change text to  show user which color is active
  previousColorText.style.fontWeight = 'normal';
  colorTextName.style.fontWeight = 'bold';

  // update active color
  activeColor = color;

  // update previous color selector
  previousColorText = colorTextName;
}


// MISC -----------------------------------------------
function testFunction(){
  console.log('registered');
}

redText.style.fontWeight = 'bold'; // initialize red to be active color

makeRows(height, width);