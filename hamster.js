function Hamster (maze, start, turns) {
  'use strict'

  const stride = maze.stride

  const directions = {
    LEFT: -1,
    RIGHT: 1,
    UP: -stride,
    DOWN: stride
  }

  this.currentTurn = 0
  this.currentSquare = start

  this.turns = turns || {}

  this.turns[this.currentSquare] = directions.UP
  // { square: int, direction: int}

  this.currentDirection = this.turns[this.currentSquare]


  function squarePos (square) {
    return {
      x: (square % maze.cols) * maze.tileSize + (maze.tileSize * 0.5),
      y: Math.floor(square / maze.cols) * maze.tileSize + (maze.tileSize * 0.5)
    }
  }

  this.pos = squarePos(this.currentSquare)

  this.chooseDirection = function () {
    let potentialTurns = []
    let wrongWays = [this.backwards()]

    var squareRow = Math.floor(this.currentSquare / maze.cols)
    var top = (squareRow === 0)
    var bottom = (squareRow === this.rows - 1)

    if ( this.currentSquare % maze.cols === 0) {
      // left edge
      wrongWays.push(directions.LEFT)
    }

    if ((this.currentSquare + 1) % maze.cols === 0) {
      // right edge
      wrongWays.push(directions.RIGHT)
    }

    if (top) {
      wrongWays.push(directions.UP)
    }

    if (bottom) {
      wrongWays.push(directions.DOWN)
    }

    for (let dir in directions) {
      if (wrongWays.indexOf(directions[dir]) === -1) {
        let possibleSquare = maze.tiles[this.currentSquare + directions[dir]]
        if (possibleSquare && possibleSquare.wall !== true) {
          potentialTurns.push(directions[dir])
        }
      }
    }
    // console.log(potentialTurns)
    if (potentialTurns.length < 1) {
      return false
    }
    return potentialTurns[floor(random(potentialTurns.length))]
  }

  this.backwards = function () {
    // console.log(this.currentDirection)
    switch (this.currentDirection) {
      case directions.UP:
        return directions.DOWN
      case directions.DOWN:
        return directions.UP
      case directions.RIGHT:
        return directions.LEFT
      case directions.LEFT:
        return directions.RIGHT
    }
  }

  this.display = function () {
    fill(221,131,44)
    console.log(this.pos)
    ellipse(this.pos.x, this.pos.y, 24, 24)
  }

  // this.decideDirection = function (tile, maze) {
  //   this.currentTurn += 1
  //   if (this.currentTurn >= this.turns.length) {
  //     // need a new turn
  //     // get available turns
  //   }
  // }

  this.onArrive = function (square) {
    this.currentTurn += 1
    this.currentSquare = square
    this.pos = squarePos(this.currentSquare)
    let dir = false

    if (this.turns[this.currentSquare] && random() > 0.1) {
      dir = this.turns[this.currentSquare]
    } else {
      dir = this.chooseDirection(square);
      if (dir) {
        this.turns[this.currentSquare] = dir
      }
    }

    this.currentDirection = dir
    if (dir) {
      this.gotoSquare((this.currentSquare + dir))
    } else {
      console.log('my body will take me no further!')
      console.log(this.turns)
      console.log(this.currentSquare)
      console.log(maze.tiles[this.currentSquare].value)
    }

  }

  this.gotoSquare = function (nextSquare) {
    var squareTween = new Tween({
      duration: 100,
      startPos: this.pos,
      targetPos: squarePos(nextSquare),
      update: function (pos) {
        //console.log(this.pos)
        // this.display()
        this.pos = pos
      }.bind(this),
      onComplete: this.onArrive.bind(this, nextSquare)
    })
  }

  this.onArrive(this.currentSquare)

}
