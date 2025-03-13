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
    if (currCell.includes(elCell)) {
        elCell.classList.remove('Covered')
        const elImg = elCell.querySelector("img")
        elImg.classList.remove("mine-img")
    } else if (!currCell.includes(elCell)) {
        LIVES--
        const rename = document.getElementById("lives")
        if (LIVES === 2) rename.innerText = heart + heart
        if (LIVES === 1) rename.innerText = heart
        if (LIVES === 0) rename.innerText = skull

        currCell.push(elCell)
    }
    if (!LIVES) gLevel.LOSS = true
    console.log('LIVES:', LIVES)
    console.log('gLevel.loss:', gLevel.LOSS)
    checkGameOver(elCell)
}


function smileyButton(elSmiley) {
    document.getElementById("smiley").innerText = "😁"
    document.getElementById("lives").innerText = heart + heart + heart
    document.getElementById("HINTS").innerText = lantern + lantern + lantern
    LIVES = 3
    SUMHINTS = 3
    gLevel.SIZE = 8
    oninit()
}

function smileyButtonStatus() {
    if (gLevel.LOSS) {
        console.log('loss')
        const smileyChange = document.getElementById("smiley")
        smileyChange.innerText = "🤯"
    }
    if (gLevel.WIN) {
        console.log('winn')
        smileyChange.innerText = "😎"
    }
}



function whenHintClicked() {
    const changHints = document.getElementById("HINTS")
    if(!SUMHINTS)return
    HINTS = true 
    SUMHINTS--
     if (SUMHINTS === 3) changHints.innerText = lantern + lantern + lantern
     if (SUMHINTS === 2) changHints.innerText = lantern + lantern 
        if (SUMHINTS === 1) changHints.innerText = lantern 
        if (SUMHINTS === 0){changHints.innerText = "Actions Exhausted"}
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

            if (currCell.isMine && !currCell.isMarked) {
                console.log('currCell:mines', currCell)
                var elImg = elCurrCell.querySelector("img")
                elImg.classList.remove("mine-img")
            }

            setTimeout((elCurrCell, currCell, elImg) => {
                elCurrCell.classList.add("Covered")
                if (currCell.isMine && elImg) {
                    elImg.classList.add("mine-img")
                    }
            }, 2500, elCurrCell, currCell, elImg);
              
        }
    }
    HINTS = false
}


function safeCell(){

    // while (gBoard.length ** 2){
    //     const i = getRandomInt(0, gBoard.length)
    //     const j = getRandomInt(0, gBoard.length)
    //     const curCell = gBoard[i][j]
    //     console.log(curCell)
    // }


}
