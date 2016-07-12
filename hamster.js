function Hamster (maze, start, dna) {
  'use strict'

  this.speed = 60 + random(120)
  this.currentTurn = 0
  this.currentSquare = start
  this.stuck = false
  this.col = dna.col || COLORS.hammies[floor(random(COLORS.hammies.length))]

  this.patch = dna.patch || (random() > 0.5) ? true : false

  // this.points.push();

  function toRads (deg) {
    return deg / 180 * PI;
  }

  this.turns = dna.turns || {}

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

  this.rotation = function () {
    switch (this.currentDirection) {
      case maze.directions.UP:
        return toRads(180)
      case maze.directions.DOWN:
        return toRads(0)
      case maze.directions.RIGHT:
        return toRads(-90)
      case maze.directions.LEFT:
        return toRads(90)
    }
  }

  this.drawHamster = function (x, y, rotation) {
    push()
    translate(x, y)
    rotate(rotation)

    fill(this.col.r, this.col.g, this.col.b)
    noStroke()

    // body
    arc(0, 0, 22, 28, toRads(180), toRads(0))

    // ears
    arc(18, 2, 12, 12, 0, TWO_PI)
    arc(-18, 2, 12, 12, 0, TWO_PI)
    fill(253, 146, 200) // pink

    arc(18, 2, 8, 8, 0, TWO_PI)
    arc(-18, 2, 8, 8, 0, TWO_PI)

    fill(this.col.r, this.col.g, this.col.b)

    // head
    arc(0, 12, 40, 34, 0, TWO_PI)

    if (this.patch) {
      fill(187, 150, 77)
      arc(8, 10, 14, 14, 0, TWO_PI)
    }

    // teeth
    fill(255)
    rect(-2, 18, 4, 5)

    // nose
    fill(253, 146, 200)
    arc(0, 16, 4, 4, 0, TWO_PI)

    fill(0)

    // eyes
    arc(10, 12, 8, 8, 0, TWO_PI)
    arc(-10, 12, 8, 8, 0, TWO_PI)
    pop()
  }

  this.display = function () {
    this.drawHamster(this.pos.x, this.pos.y, this.rotation())
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


    if (dir) {
      this.gotoSquare((this.currentSquare + dir))
      this.currentDirection = dir
    } else {
      this.stuck = true
    }
  }

  this.calcFitness = function () {

    let minTurnVal = maze.tiles[mazeMap.start].value
    for (const turn in this.turns) {
      if (maze.tiles[turn].value < minTurnVal) {
        minTurnVal = maze.tiles[turn].value
      }
    }

    return minTurnVal
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
