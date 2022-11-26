// reference: https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
console.log('this is running')
const height = 4;
const width = 4;

// generate canvas ---------
const container = document.getElementById('game-container');
let rowsSelector = document.getElementsByClassName('gridRow');
let columnSelector = document.getElementsByClassName('gridCell');

function generateRows(numRows){
    for(let i = 0; i < numRows; i++){
        let row = document.createElement('div');
        container.appendChild(row).className = 'gridRow';
    }
}

function generateColumns(numCols){
    for(let i = 0; i < rowsSelector.length; i++){
        for(let j = 0; j < numCols; j++){
            let newCell = document.createElement('div');
            rows[j].appendChild(newCell).className = 'gridCell';
        }
    }
}

function createCanvas(){
    generateRows(height);
    generateColumns(width);
}

createCanvas();