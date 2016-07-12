function Hamster (maze, start, turns) {
  'use strict'

  this.speed = 40 + random(100)
  this.currentTurn = 0
  this.currentSquare = start
  this.stuck = false
  this.col = {
    r: 200 + random(20),
    g: 100 + random(100),
    b: 100 + random(50)
  }

  this.turns = turns || {}

  function squarePos (square) {
    return {
      x: (square % maze.cols) * maze.tileSize + (maze.tileSize * 0.5),
      y: Math.floor(square / maze.cols) * maze.tileSize + (maze.tileSize * 0.5)
    }
  }

  this.pos = squarePos(this.currentSquare)

  this.backwards = function () {
    switch (this.currentDirection) {
      case maze.directions.UP:
        return maze.directions.DOWN
      case maze.directions.DOWN:
        return maze.directions.UP
      case maze.directions.RIGHT:
        return maze.directions.LEFT
      case maze.directions.LEFT:
        return maze.directions.RIGHT
    }
  }

  this.display = function () {
    fill(this.col.r, this.col.g, this.col.b)
    ellipse(this.pos.x, this.pos.y, 24, 24)
  }

  this.onArrive = function (square) {
    this.currentTurn += 1
    this.currentSquare = square
    this.pos = squarePos(this.currentSquare)
    let dir = false

    if (this.turns[this.currentSquare]) {
      dir = this.turns[this.currentSquare]
    } else {
      let potentialTurns = maze.getPotentialTurns(this.currentSquare).filter(turn => turn !== this.backwards())
      if (potentialTurns) {
        dir = potentialTurns[floor(random(potentialTurns.length))]
        if (potentialTurns.length > 1) {
          // intersection
          this.turns[this.currentSquare] = dir
        }

      }
    }

    this.currentDirection = dir
    if (dir) {
      this.gotoSquare((this.currentSquare + dir))
    } else {
      this.stuck = true
    }
  }

  this.calcFitness = function () {
    const squareVal = maze.tiles[this.currentSquare].value
    return Math.round((1 / (squareVal * squareVal * squareVal)) * 1000000)
  }

  this.gotoSquare = function (nextSquare) {
    var squareTween = new Tween({
      duration: this.speed,
      startPos: this.pos,
      targetPos: squarePos(nextSquare),
      update: function (pos) {
        this.pos = pos
      }.bind(this),
      onComplete: this.onArrive.bind(this, nextSquare)
    })
  }

  this.onArrive(this.currentSquare)
}
