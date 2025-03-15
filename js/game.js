'use strict'

const MINES_IMG = `<img src="img/MINE.png" class="mine-img">`
// const MINES_IMG = `💣`
const FLAG_IMG = `🚩`

var gBoard

var gLevel = {
    SIZE: 8,
    MINES: 0,
    MARKMINES: 0,
    COVEREDCELLS: 0,
    FIRSTCLICK: false,
    LOSS: false,
    WIN: false
}


function oninit() {

    gBoard = buildBoard(gLevel)
    renderBoard(gBoard)
    console.table(gBoard)
}

function firstClicked(currCell) {
    console.log('chek184')
    gLevel.FIRSTCLICK = true
    addMinesToBoard(gBoard, currCell)
    setMinesNegsCount(gBoard)
    console.table(gBoard)

}

function checkGameOver() {
    
    const totalCells = gLevel.SIZE * gLevel.SIZE
    const nonMineCells = totalCells - gLevel.MINES

    console.log(gLevel.COVEREDCELLS)
    console.log(nonMineCells)

    if (gLevel.COVEREDCELLS === gLevel.MINES && !gLevel.LOSS) {
        gLevel.WIN = true;
        console.log('winn')
    }

    smileyButtonStatus()
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
            // console.log('gLevel.COVEREDCELLS++:buildboard', gLevel.COVEREDCELLS)
        }
    }
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
                        </td>`
        }
        strHTML += '</tr>'
    }
    const elMat = document.querySelector('.game-board')
    elMat.innerHTML = strHTML
    elMat.addEventListener("contextmenu", (e) => { e.preventDefault() })
}

function onCellClicked(elCell) {
   if(HINTS){
    uncoverdsHint(elCell)
 return
}
    const pos = getCellId(elCell.id)
    const currCell = gBoard[pos.i][pos.j]
    console.log(pos)
    if (!gLevel.FIRSTCLICK) {
        firstClicked(currCell)
    }
    if (currCell.isCovered) {
        if (!currCell.isMine) {
            gLevel.COVEREDCELLS--
            // console.log('gLevel.COVEREDCELLS--:oncelclick', gLevel.COVEREDCELLS)
            expandReveal(gBoard, elCell)
            elCell.classList.remove('Covered')
            currCell.isCovered = false
        }
        if (currCell.isMine) {
            countLives(elCell, currCell)
        }
    }
 
    checkGameOver(elCell)
    
}

function expandReveal(board, elCell) {
    const pos = getCellId(elCell.id)

    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isCovered) {

                if (!currCell.isMine) {
                    // console.log('currCell:', currCell)
                    gLevel.COVEREDCELLS--
                    // console.log('gLevel.COVEREDCELLS--:eapand1', gLevel.COVEREDCELLS)
                    currCell.isCovered = false
                    if (currCell.isMarked) {
                        currCell.isMarked = false
                        renderCell({ i: i, j: j }, currCell.minesAroundCount)
                    }
                    const cellSelector = `.${getClassName({ i: i, j: j })}`
                    //    console.log('cellSelector:', cellSelector)
                    //    console.log('elCell:', elCell)
                    const elCurrCell = document.querySelector(cellSelector)
                    elCurrCell.classList.remove('Covered')
                    // console.log('currCell:', currCell)
                    checkGameOver()
                }
            }
        }
    }

}

function changeBoardSize(size) {
    gLevel = {
        SIZE: size,
        MINES: 0,
        MARKMINES: 0,
        COVEREDCELLS: 0,
        FIRSTCLICK: false,
        LOSS: false,
        WIN: false
    }
    
    
    
    oninit()
    console.table(gBoard)
    console.log('gLevel.SIZE:', gLevel.SIZE)

}


