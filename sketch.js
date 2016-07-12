
'use strict'

var mazeMap = maps.ALCATRAZ;
var maze;
var tileSize = 54
var mazeWidth = (tileSize * mazeMap.cols)
var mazeHeight = (tileSize * mazeMap.rows)
var hamsters = []
var numHams = 10
var generation = 1

function setup() {
  createCanvas(mazeWidth, mazeHeight)
  maze = new Maze(tileSize, mazeMap)
  maze.initialize(mazeWidth, mazeHeight, mazeMap.cheese)
  for (let i = 0; i < numHams; i += 1) {
    hamsters.push(new Hamster(maze, mazeMap.start, {}))
  }

  maze.display()
}

function sortHamsters(hams) {
  'use strict'
  let length = hams.length
  for (let i = 0; i < length; i += 1) {
    let tmp = hams[i]
    for(var j = i -1; j >= 0 && hams[j].calcFitness() < tmp.calcFitness(); j -= 1) {
        hams[j+1] = hams[j]
    }

    hams[j+1] = tmp
  }
  return hams
}


function restartHamsters () {

  let genePool = sortHamsters([].concat(hamsters))
  hamsters = []

  for(let i = 0; i < numHams; i += 1) {
    let papa = genePool[genePool.length-1]
    let turnsCopy = {}
    for (let turn in papa.turns) {
      turnsCopy[turn] = papa.turns[turn]
    }
    let minTurnVal = maze.tiles[mazeMap.start].value
    let minTurn = null
    for (const turn in turnsCopy) {
      if (maze.tiles[turn].value < minTurnVal) {
        minTurnVal = maze.tiles[turn].value
        minTurn = turn
      }
    }

    if (maze.tiles[papa.currentSquare].value !== 1) {
      delete turnsCopy[minTurn]
    }
    hamsters.push(new Hamster(maze, mazeMap.start, Object.assign({}, {turns: turnsCopy})))
  }

  generation += 1
}

function draw() {

  maze.display()
  let done = true
  for (let i = 0; i < numHams; i += 1) {
    hamsters[i].display()
    if(!hamsters[i].stuck) {
      done = false
    }
  }

  if (done)  {
    restartHamsters()
  }
}
