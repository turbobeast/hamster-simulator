
'use strict'

var maze;
var tileSize = 74
var mazeWidth = (tileSize * 12)
var mazeHeight = (tileSize * 6)

var mazeMap = [0,0,0,1,0,0,0,1,0,0,0,1,
               0,1,0,0,0,1,1,1,0,1,1,0,
               0,1,0,1,1,1,0,0,0,1,0,0,
               0,1,1,1,0,0,0,1,0,1,1,0,
               0,1,0,0,0,1,1,0,0,0,0,0,
               0,0,0,1,0,0,1,0,1,1,0,1]

function setup() {

  createCanvas(mazeWidth, mazeHeight)
  maze = new Maze(tileSize, mazeMap)
  maze.initialize(mazeWidth, mazeHeight, 23)
  // maze.initialize(108, 108, 7)
  // maze.initialize(108, 108, 8)
  // maze.initialize(108, 108, 3)
  // maze.initialize(108, 108, 4)

  // maze.initialize(108, 108, 5)
  // maze.display()
}

function draw() {
  maze.display()
}
