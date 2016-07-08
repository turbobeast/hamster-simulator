
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
  
}

function draw() {
  maze.display()
}
