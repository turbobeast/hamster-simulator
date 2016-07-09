
'use strict'

var maze;
var tileSize = 64
var mazeWidth = (tileSize * 14)
var mazeHeight = (tileSize * 8)
var hamsters = []
var numHams = 10
// var mazeMap = [0,0,0,1,0,0,0,1,0,0,0,1,
//                0,1,0,0,0,1,1,1,0,1,1,0,
//                0,1,0,1,1,1,0,0,0,1,0,0,
//                0,1,1,1,0,0,0,1,0,1,1,0,
//                0,1,0,0,0,1,1,0,0,0,0,0,
//                0,0,0,1,0,0,1,0,1,1,0,1]

var mazeMap = [0,1,0,0, 0,1,0,1, 0,0,0,0 ,0,0,
               0,1,1,1, 0,1,0,1, 0,1,1,1, 1,0,
               0,0,0,0, 0,1,0,1, 0,0,0,0, 1,0,
               0,1,1,1, 0,1,0,1, 1,1,1,0, 1,1,
               0,1,0,0, 0,1,0,0, 0,0,1,0, 0,0,
               0,1,0,1, 1,1,0,1, 1,0,1,0, 1,0,
               1,1,0,0, 0,0,1,1, 0,0,0,0, 1,0,
               0,0,0,1, 1,0,0,0, 0,1,1,0, 1,0]

function setup() {

  createCanvas(mazeWidth, mazeHeight)
  maze = new Maze(tileSize, mazeMap)
  maze.initialize(mazeWidth, mazeHeight, 41)
  for (let i = 0; i < numHams; i += 1) {
    hamsters.push(new Hamster(maze, 70))
  }

  maze.display()
  // {28: 1, 29: 1, 30: 1, 31: 1, 32: 14, 42: -14, 46: 14, 56: -14, 58: 14, 59: -1, 60: -1, 67: 1, 68: 1, 69: 14, 70: -14, 72: 14, 81: -14, 83: 14, 86: 1, 87: 1, 88: 1, 89: 14, 92: 1, 93: 1, 94: 1, 95: -14, 97: 14, 103: 1, 104: 1, 105: 1, 106: -14}
  // [-14, -14, -14, -14, 1, 1, 1, 1, 14, 14, -1, -1, 14, 14, 14, -1, -1]
  // hamster.display()
}

function draw() {
  maze.display()
  for (let i = 0; i < numHams; i += 1) {
    hamsters[i].display()
  }

}
