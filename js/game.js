'use strict'

const MINES_IMG = `<img src="img/MINE.png">`
const FLAG_IMG = `🚩`

var gLevel = {
    SIZE: 7,
    MINES: 0,
    MARKMINES: 0,
    COVEREDCELLS: 0,
    FIRSTCLICK: false
}
var gBoard




function oninit() {
    gBoard = buildBoard(gLevel)
    renderBoard(gBoard)
    console.table(gBoard)
}

function firstClicked(currCell){
    
    gLevel.FIRSTCLICK = true
 addMinesToBoard(gBoard, currCell)
    setMinesNegsCount(gBoard)
    // renderBoard(gBoard)
    console.table(gBoard)
    
}

function checkGameOver(elCell){
    // console.log('gLevel.MINES:', gLevel.MINES)
    // console.log('gLevel.MARKCELLS:', gLevel.COVEREDCELLS)
    // console.log('gLevel.MARKMINES:', gLevel.MARKMINES)
 if(gLevel.MARKMINES === gLevel.COVEREDCELLS) alert('victory')
    
}

function buildBoard(gLevel) {
    const size = gLevel.SIZE
    const mines = gLevel.MINES
    const board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            const cell = {
                minesAroundCount: 0,
                isCovered: true,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
            gLevel.COVEREDCELLS++
        }
    }
    // board[2][3].isMine = true
    // board[1][2].isMine = true
    // console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            const cell = board[i][j]

            var cellClass = getClassName({ i: i, j: j }) // cell-0-0
        //    console.log('celClass:', celClass)
            

            strHTML += `<td id="cell-${i}-${j}" class="cell ${cellClass} Covered" 
                            onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(this, ${i}, ${j})">
                            ${cell.minesAroundCount}${cell.isMine}
                        </td>`
        }
        strHTML += '</tr>'
    }
    const elMat = document.querySelector('.game-board')
    elMat.innerHTML = strHTML
    elMat.addEventListener("contextmenu", (e) => {e.preventDefault()})
}


function onCellClicked(elCell) {
    const pos = getCellId(elCell.id)
    const currCell = gBoard[pos.i][pos.j]
    // console.log(pos)
    if(!gLevel.FIRSTCLICK){
        firstClicked(currCell)
        gLevel.COVEREDCELLS--
    }
    if(currCell.isCovered){
        if(!currCell.isMine){
            gLevel.COVEREDCELLS--
            expandReveal(gBoard, elCell)
            elCell.classList.remove('Covered')
            currCell.isCovered = false
        }
        }

    // console.log('currcell:', currCell)

    
    checkGameOver(elCell)
}


function expandReveal(board, elCell){
    const pos = getCellId(elCell.id)
    
        for (var i = pos.i - 1; i <= pos.i + 1; i++) {
            if (i < 0 || i >= board.length) continue
            for (var j = pos.j - 1; j <= pos.j + 1; j++) {
                if (i === pos.i && j === pos.j) continue
                if (j < 0 || j >= board[0].length) continue
                var currCell = board[i][j]
                if (!currCell.isMine) {
                    console.log('currCell:', currCell)
                    console.log('gLevel.COVEREDCELLS:', gLevel.COVEREDCELLS)
                    gLevel.COVEREDCELLS--
                    currCell.isCovered = false
                   const cellSelector = `.${getClassName({i: i , j: j})}`
                   console.log('cellSelector:', cellSelector)
                   console.log('elCell:', elCell)
                   const elCurrCell = document.querySelector(cellSelector)
                   elCurrCell.classList.remove('Covered')

                    
	
                    // console.log('currCell:', currCell)
                }
            }
        }

    }



