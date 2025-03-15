'use strict'


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
               const count = countMinesAround(board, i, j)
                board[i][j].minesAroundCount = count
                renderCell({ i: i, j: j }, count)
            }
        }
    }
    // console.table(board)
}

function countMinesAround(mat, cellI, cellJ) {
    var count = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine) count++
            console.log('mat[i][j], minesNegs:', mat[i][j], count)
        }
    }
    return count
}

function addMinesToBoard(board, firsCell) {
    const randNum = getRandomInt(board.length * 2 , board.length * 4)
    // console.log('randNum:', randNum)
    for (var i = 0; i < randNum; i++) {
        const i = getRandomInt(0, board.length)
        const j = getRandomInt(0, board.length)
        const curCell = board[i][j]
        console.log('i, j:', i, j)
        if (!curCell.isMine && firsCell !== curCell) {
            curCell.isMine = true
            gLevel.MINES++
            // var minePos = getClassName({ i: i, j: j }) // cell-0-0
            renderCell({ i: i, j: j }, MINES_IMG )
            console.log('gLevel.MINES:', gLevel.MINES)
            
        }
    }
}

function onCellMarked(elCell) {
    const pos = getCellId(elCell.id)
    const curCell = gBoard[pos.i][pos.j]
    // console.log('curCell:', curCell)
    if(!curCell.isCovered)return

    if (!curCell.isMarked) {
        curCell.isMarked = true
        if (curCell.isMine) gLevel.MARKMINES++
        // console.log('gLevel.MARKMINES--: marked', gLevel.MARKMINES)
        renderCell({ i: pos.i, j: pos.j }, FLAG_IMG)
    }
    else{
        curCell.isMarked = false
        if (curCell.isMine){
            gLevel.MARKMINES--
            // console.log('gLevel.MARKMINES--: marked1', gLevel.MARKMINES)
            renderCell({ i: pos.i, j: pos.j }, MINES_IMG)
        }else if(!curCell.isMine){
            renderCell({ i: pos.i, j: pos.j }, curCell.minesAroundCount)
        }

    }
    // console.log('curCell:', curCell)

    checkGameOver(elCell)
}

