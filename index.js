let gridElement = document.querySelector('#grid');
let columns = 10;
let rows = 10;

console.log(gridElement);
function createCells() {
    const div = document.createElement('div')
    div.classList.add('cell')
    gridElement.append(div)
}
function createGrid() {
    for (let i = 0; i < columns * rows; i++) {
        createCells()
    }
}
createGrid()