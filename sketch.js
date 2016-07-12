
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
}


function restartHamsters () {
  let genePool = [].concat(hamsters)
  let papa = hamsters[0]
  for (let i = 1; i < numHams; i += 1) {
    // square 1 is the square with the cheese on
    // calcFitness only
    if (maze.tiles[hamsters[i].currentSquare].value === 1) {
      papa = hamsters[i]
      break
    } else if (hamsters[i].calcFitness() < papa.calcFitness()) {
      papa = hamsters[i]
    }
  }

  hamsters = []

  for(let i = 0; i < numHams; i += 1) {

    let turnsCopy = {}
    let mama = genePool[floor(random(genePool.length))]
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
    hamsters.push(new Hamster(maze, mazeMap.start, Object.assign({}, mama, {turns: turnsCopy})))
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
