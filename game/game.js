// https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
// https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript

const height = 4;
const width = 4;
console.log('this is running');
const container = document.getElementById("canvas-container");

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    // cell.innerText = (c + 1);
    container.appendChild(cell).className = "grid-item";
  };
};

makeRows(height, width);