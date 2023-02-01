const start = document.getElementById('start-button');
const dialog = document.getElementById('dialog')
let gridElement = document.querySelector('#grid');
let gridCell = gridElement.getElementsByClassName('cell');
let hiddenButton = document.querySelectorAll('.hidden-button');
let columns = 10;
let rows = 10;
let cells = [];
let currentPosition = 0;


//grid wall template 1,0,1,1,1,1,1,1,1,1(1),1,0,1,1,0,0,0,0,0,0(2),1,0,1,1,0,0,0,0,1,0(3),1,0,1,1,0,1,1,1,1,0(4),1,0,1,1,0,1,1,1,1,0(5),1,0,1,1,0,1,1,1,1,0(6),1,0,1,1,0,0,1,1,1,1(7),1,0,1,1,0,0,1,1,1,1(8),1,0,0,0,0,0,1,1,1,1(9),1,1,1,1,1,1,1,1,1,1(10)
//numbers in parenthesis mark the end of a row
// Grid levels
let level1 = [1,0,1,1,1,1,1,1,1,1,
              1,0,1,1,0,0,0,0,0,0,
              1,0,1,1,0,0,0,0,1,0,
              1,0,1,1,0,1,1,1,1,0,
              1,0,1,1,0,1,1,1,1,0,
              1,0,1,1,0,1,1,1,1,2,
              1,0,1,1,0,0,1,1,1,1,
              1,0,1,1,0,0,1,1,1,1,
              1,0,0,0,0,0,1,1,1,1,
              1,1,1,1,1,1,1,1,1,1]
let level2 = [1,0,1,1,1,1,1,1,1,1,
              1,0,0,0,0,0,1,1,1,1,
              1,1,1,1,1,0,1,1,1,1,
              2,0,0,0,1,0,0,1,1,1,
              1,0,0,0,1,0,0,1,1,1,
              1,1,0,0,0,1,0,0,0,1,
              1,1,0,0,1,0,1,0,0,1,
              1,1,0,0,0,0,0,0,0,1,
              1,1,0,0,0,0,0,0,0,1,
              1,1,1,1,1,1,1,1,1,1]


function createCells(type) {
    const div = document.createElement('div')
    div.classList.add('cell')
    if (type){
        div.classList.add(type)
    }
    gridElement.append(div)
    cells.push(div)
}
function createGrid(levelArray) {
    // for (let i = 0; i < columns * rows; i++) {
    //     createCells()
    // }
levelArray.forEach(element => {
    if (element === 0){
        createCells()
    }else if (element === 1){
        createCells('wall')
    }else {
        createCells('exit')
    }
})

}



function displayPlayer(position){
    cells[position].classList.add('player')
}
function hidePlayer(){
    cells[currentPosition].classList.remove('player')
}
//Below is the code for arrow key operations
window.addEventListener('keydown', (event) =>{
    switch (event.code) {
        case 'ArrowLeft':
            if (currentPosition % 10 === 0){
                return
            }
            hidePlayer()
            currentPosition--

            displayPlayer(currentPosition)
        break
        case 'ArrowRight':
            if ((currentPosition + 1) % 10 === 0){
                return
            }
            hidePlayer()
            currentPosition++
            displayPlayer(currentPosition)
        break
        case 'ArrowUp':
            if (currentPosition < 10){
                return
            }
            hidePlayer()
            currentPosition -= 10
            displayPlayer(currentPosition)
        break
        case 'ArrowDown':
            if (currentPosition >= 90){
                return
            }
            hidePlayer()
            currentPosition += 10
            displayPlayer(currentPosition)
        break
    }
})



function hiddenButtons(){
    hiddenButton.forEach(element => element.style.visibility = 'visible')
}

start.onclick = function startTheGame(){
    currentPosition = 1
    gridElement.innerHTML = ''
    cells = []
    createGrid(level2)
    displayPlayer(currentPosition)
    start.style.visibility = 'hidden'
    hiddenButtons()
}