'use strict'


var gLevel = {
    SIZE: 4,
    MINES: 0,
    MARKMINES: 0,
    COVEREDCELLS: 0
}
var gBoard

function oninit() {
    gBoard = buildBoard(gLevel)
    addMinesToBoard(gBoard)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
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
            // var className = (isMine) ? 'bomb' : 'number'
            // if (currCell.type === FLOOR) cellClass += ' floor' // cell-0-0 floor
            // else if (currCell.type === WALL) cellClass += ' wall'
            const tdId = `cell-${i}-${j}`

            strHTML += `<td class="cell Covered" id="${tdId}" 
                            onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(this)">
                            ${cell.minesAroundCount}${cell.isMine}
                        </td>`
        }
        strHTML += '</tr>'
    }
    const elMat = document.querySelector('.game-board')
    elMat.innerHTML = strHTML
    elMat.addEventListener("contextmenu", (e) => {e.preventDefault()})
}


function onCellClicked(elCell, i, j) {
    // console.log('elcell, i, j:', elCell, i, j)
    if(gBoard[i][j].isCovered){
        if(!gBoard[i][j].isMine)gLevel.COVEREDCELLS--
        checkGameOver(elCell)
    }
    elCell.classList.remove('Covered')
    gBoard[i][j].isCovered = false
    // console.log('gBoard[i][j]:', gBoard[i][j])
    
}



