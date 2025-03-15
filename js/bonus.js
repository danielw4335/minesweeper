'use strict'
var SUMHINTS = 3
var LIVES = 3
var HINTS = false
var currCell = []

var heart = "❤️"
var skull = "☠️☠️☠️"
var lantern = "🔦"

function countLives(elCell, posCell) {
    if (HINTS) return

    const elImg = elCell.querySelector("img")

    if (currCell.includes(elCell)) {
        elCell.classList.remove('Covered')
        if (elImg) {
            elImg.classList.remove("mine-img")
            elImg.style.opacity = "1"
        } else {
            console.log('nun img', elCell)
        }
    } else {
        LIVES--
        const rename = document.getElementById("lives")
        if (LIVES === 2) rename.innerText = heart + heart
        if (LIVES === 1) rename.innerText = heart
        if (LIVES === 0) rename.innerText = skull

        currCell.push(elCell)
    }

    if (!LIVES) gLevel.LOSS = true
    console.log("LIVES:", LIVES)
    console.log("gLevel.loss:", gLevel.LOSS)
    checkGameOver(elCell)
}

gLevel = {
    SIZE: gLevel.SIZE, 
    MINES: 0,
    MARKMINES: 0,
    COVEREDCELLS: 0,
    FIRSTCLICK: false,
    LOSS: false,
    WIN: false
}

function smileyButton(elSmiley) {
    document.getElementById("smiley").innerText = "😁"
    document.getElementById("lives").innerText = heart + heart + heart
    document.getElementById("HINTS").innerText = lantern + lantern + lantern
    LIVES = 3
    SUMHINTS = 3
    gLevel.FIRSTCLICK=false
    oninit()
}

function smileyButtonStatus() {
    const smileyChange = document.getElementById("smiley")

    if (gLevel.LOSS) {
        console.log('loss')
        smileyChange.innerText = "🤯"
    }
    if (gLevel.WIN) {
        console.log('winn')
        smileyChange.innerText = "😎"
    }
}

function whenHintClicked() {
    const changHints = document.getElementById("HINTS")
    if (SUMHINTS <= 0) return

    SUMHINTS--
    HINTS = true

    if (SUMHINTS === 3) changHints.innerText = lantern + lantern + lantern
    if (SUMHINTS === 2) changHints.innerText = lantern + lantern
    if (SUMHINTS === 1) changHints.innerText = lantern
    if (SUMHINTS === 0) { changHints.innerText = "Actions Exhausted" }
}

function uncoverdsHint(elCell) {
    const board = gBoard
    const pos = getCellId(elCell.id)

    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (!currCell.isCovered) continue

            console.log('currCell:', currCell)

            const cellSelector = `.${getClassName({ i: i, j: j })}`
            var elCurrCell = document.querySelector(cellSelector)
            elCurrCell.classList.remove('Covered')

            currCell.wasHinted = true
            if (currCell.isMine && !currCell.isMarked) {
                var elImg = elCurrCell.querySelector("img")
                if (elImg) {
                    elImg.classList.remove("mine-img")
                    elImg.style.opacity = "1"
                } else {
                    console.log('null img', elCurrCell)
                }
            }

            setTimeout(() => {
                for (var i = pos.i - 1; i <= pos.i + 1; i++) {
                    if (i < 0 || i >= board.length) continue
                    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
                        if (j < 0 || j >= board[0].length) continue

                        var currCell = board[i][j]
                        if (!currCell.wasHinted) continue

                        const cellSelector = `.${getClassName({ i: i, j: j })}`
                        var elCurrCell = document.querySelector(cellSelector)
                        elCurrCell.classList.add("Covered")

                        if (currCell.isMine) {
                            var elImg = elCurrCell.querySelector("img")
                            if (elImg) {
                                elImg.classList.add("mine-img")
                                elImg.style.opacity = "0"
                            }
                        }
                        currCell.wasHinted = false
                    }
                }
            }, 1500)
        }
    }
    HINTS = false
}

function safeCell() {
var safeCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell.isCovered && !currCell.isMine){
                safeCells.push({ cell: currCell, i: i, j: j })
            }
        }
    }
  const randNum = getRndIntExcMax(0, safeCells.length)
    const safeCell = safeCells[randNum]
        renderCell(safeCell, "✅")
        
        setTimeout(() => {
          
            renderCell(safeCell, "")
        }, 1500)
}


