const start = document.getElementById('start-button');
const dialog = document.getElementById('dialog')
const ok = document.getElementById('ok-button')
//const restart = document.getElementById('restart')
const rulesContainer = document.getElementById('rules-container')
const modalWin = document.getElementById('winModal')
const modalLost = document.getElementById('lostModal')
const nextLevel = document.getElementById('next-level')
const restart = document.getElementById('restart')
let gridElement = document.querySelector('#grid');
let gridCell = gridElement.getElementsByClassName('cell');
//let hiddenButton = document.querySelectorAll('.reset-button');
let columns = 10;
let rows = 10;
let cells = [];
let currentPosition = 0;
let timeoutId = null


//grid wall template 1,0,1,1,1,1,1,1,1,1(1),1,0,1,1,0,0,0,0,0,0(2),1,0,1,1,0,0,0,0,1,0(3),1,0,1,1,0,1,1,1,1,0(4),1,0,1,1,0,1,1,1,1,0(5),1,0,1,1,0,1,1,1,1,0(6),1,0,1,1,0,0,1,1,1,1(7),1,0,1,1,0,0,1,1,1,1(8),1,0,0,0,0,0,1,1,1,1(9),1,1,1,1,1,1,1,1,1,1(10)
//numbers in parenthesis mark the end of a row
// Grid levels
let level1 = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 0, 0, 0, 0, 1, 0,
    2, 0, 1, 1, 1, 1, 1, 1, 1, 0,
    1, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    1, 0, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
let level2 = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
    2, 0, 0, 0, 1, 0, 0, 1, 1, 1,
    1, 0, 0, 0, 1, 0, 0, 1, 1, 1,
    1, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 1, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
let level3 = [1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
    2, 0, 0, 0, 1, 0, 0, 1, 1, 1,
    1, 0, 0, 0, 1, 0, 0, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
let level4 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
    2, 0, 0, 0, 1, 0, 0, 1, 1, 1,
    1, 0, 0, 0, 1, 0, 0, 1, 1, 1,
    1, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 1, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
let level5 = [1,0,1,1,1,1,1,1,1,1,
             1,0,0,0,0,0,0,0,0,1,
             1,1,1,1,1,1,1,1,0,1,
             2,1,0,0,0,0,0,1,0,1,
             0,1,0,1,0,1,0,1,0,1,
             0,1,0,0,0,0,0,1,0,1,
             0,1,0,1,1,1,0,1,0,1,
             0,0,0,0,0,0,0,0,0,1,
             0,1,0,1,1,1,0,0,0,1,
             1,1,1,1,1,1,1,1,1,1]
    let allLevels = [level1, level2, level3, level4, level5]


function createCells(type) {
    const div = document.createElement('div')
    div.classList.add('cell')
    if (type) {
        div.classList.add(type)
    }
    gridElement.append(div)
    cells.push(div)
}
function createGrid(levelArray) {
    // for (let i = 0; i < columns * rows; i++) {
    //     createCells()
    // }
    cells.splice(0, cells.length)
    levelArray.forEach(element => {
        if (element === 0) {
            createCells()
        } else if (element === 1) {
            createCells('wall')
        } else {
            createCells('exit')
        }
    })

}



function displayPlayer(position) {
    cells[position].id = 'player'
}
function hidePlayer() {
    cells[currentPosition].id = ''
}
//Below is the code for arrow key operations
window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowLeft':
            if (currentPosition % 10 === 0) {
                return
            }
            hidePlayer()
            currentPosition--
            displayPlayer(currentPosition)
            break
        case 'ArrowRight':
            if ((currentPosition + 1) % 10 === 0) {
                return
            }
            hidePlayer()
            currentPosition++
            displayPlayer(currentPosition)
            break
        case 'ArrowUp':
            if (currentPosition < 10) {
                return
            }
            hidePlayer()
            currentPosition -= 10
            displayPlayer(currentPosition)
            break
        case 'ArrowDown':
            if (currentPosition >= 90) {
                return
            }
            hidePlayer()
            currentPosition += 10
            displayPlayer(currentPosition)
            break
    }
    endGame()
})
function endGame() {
    if (cells[currentPosition].classList.contains('exit')) {
        modalWin.showModal()
    }
    else if (cells[currentPosition].classList.contains('wall')) {
        modalLost.showModal()
    }
}
function lightsOff() {
    cells.forEach(element => { element.classList.add('lights-off') })
}

// nextLevel.onclick = function nextLevelStart(){
//     modalWin.close()
//     currentPosition = 1
//     gridElement.innerHTML = ''


//     let randomNum = Math.floor(Math.random()* allLevels.length)
//     createGrid(allLevels[randomNum])
//     displayPlayer(currentPosition)
//     console.log(cells);
// }
ok.onclick = function rules() {
    //start.style.visibility = 'visible'
    rulesContainer.style.display = 'none'
    startTheGame()
}

function startTheGame() {
    currentPosition = 1
    gridElement.innerHTML = ''
    cells = []
    let randomNum = Math.floor(Math.random() * allLevels.length)
    createGrid(allLevels[randomNum])
    displayPlayer(currentPosition)
    //start.style.visibility = 'hidden'
    restart.style.visibility = 'visible'
    timeoutId = setTimeout(lightsOff, 2000)
}
restart.addEventListener('click', () => {
    modalLost.close()
    clearTimeout(timeoutId)
    startTheGame()
})
//start.addEventListener('click', startTheGame)

nextLevel.addEventListener('click', () => {
    modalWin.close()
    clearTimeout(timeoutId)
    startTheGame()
})