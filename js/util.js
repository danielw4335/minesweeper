'use strict'


function getRndIntExcMax(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRndIntIncMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function getCellId(strCellId) {
  const coord = {}
  const parts = strCellId.split('-') // ['cell','2','7']
  coord.i = +parts[1]
  coord.j = +parts[2]
  return coord
}

function renderCell(location, value) {
	const cellSelector = `.${getClassName(location)}` //.cell-0-0
	const elCell = document.querySelector(cellSelector)
	elCell.innerHTML = value
}

function getClassName(location) {
	const cellClass = `cell-${location.i}-${location.j}` //מקבל אובייקט עם I וJ ומוציא אותו לHTML
	return cellClass
}