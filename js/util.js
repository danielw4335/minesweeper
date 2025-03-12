'use strict'

// get Random integer variations

function getRndIntExcMax(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRndIntIncMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//colors

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color = '#'

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}


function getCellCoord(strCellId) {
  const coord = {}
  const parts = strCellId.split('-') // ['cell','2','7']
  coord.i = +parts[1]
  coord.j = +parts[2]
  return coord
}