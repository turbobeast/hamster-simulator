
'use strict'

var mazeMap = maps.ALCATRAZ;
var maze;
var tileSize = 44
var mazeWidth = (tileSize * mazeMap.cols)
var mazeHeight = (tileSize * mazeMap.rows)
var hamsters = []
var numHams = 1
var generation = 1

function setup() {
  createCanvas(mazeWidth, mazeHeight)
  maze = new Maze(tileSize, mazeMap.map)
  maze.initialize(mazeWidth, mazeHeight, mazeMap.cheese)
  for (let i = 0; i < numHams; i += 1) {
    hamsters.push(new Hamster(maze, mazeMap.start))
  }

  maze.display()
}

var checked = false
function restartHamsters () {

  const genePool = []



  let max = 0
  for (let i = 0; i < numHams; i += 1) {
    let fit = Math.min(hamsters[i].calcFitness(), 400)
    if (fit > max) {
      max = fit
    }
    genePool.push(hamsters[i])
    // for(let j = 0; j < fit * 2; j += 1) {
    //  if (fit > max * 0.8) {
    //     genePool.push(hamsters[i])
    //   }
    // }
  }

  hamsters = []
  for(let i = 0; i < numHams; i += 1) {
    let papa = genePool[i] // [floor(random(genePool.length))]
    let minTurnVal = maze.tiles[mazeMap.start].value
    let minTurn = null
    for (const turn in papa.turns) {

      if (maze.tiles[turn].value < minTurnVal) {
        minTurnVal = maze.tiles[turn].value
        minTurn = turn
      }
    }
    delete papa.turns[minTurn]
    hamsters.push(new Hamster(maze, mazeMap.start, papa.turns))
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
