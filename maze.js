function Maze (tileSize, mazeMap) {
  'use strict'

  this.tiles = []
  this.tileSize = tileSize || 64
  this.mazeMap = mazeMap
  this.stride = this.mazeMap.cols

  let map = mazeMap.map

  // offsets to adjacent tiles
  this.directions = {
    LEFT: -1,
    RIGHT: 1,
    UP: -this.stride,
    DOWN: this.stride
  }

  this.getPotentialTurns = function (square) {

    let potentialTurns = []
    let wrongWays = []

    var squareRow = Math.floor(square / this.cols)
    var top = (squareRow === 0)
    var bottom = (squareRow === this.rows - 1)

    if ( square % this.cols === 0) {
      // left edge
      wrongWays.push(this.directions.LEFT)
    }

    if ((square + 1) % this.cols === 0) {
      // right edge
      wrongWays.push(this.directions.RIGHT)
    }

    if (top) {
      wrongWays.push(this.directions.UP)
    }

    if (bottom) {
      wrongWays.push(this.directions.DOWN)
    }

    for (let dir in this.directions) {
      if (wrongWays.indexOf(this.directions[dir]) === -1) {
        let possibleSquare = this.tiles[square + this.directions[dir]]
        if (possibleSquare && possibleSquare.wall !== true) {
          potentialTurns.push(this.directions[dir])
        }
      }
    }
    return potentialTurns
  }

  function removeDoubles (ray) {
    'use strict'
    for(let i = 0; i < ray.length; i += 1) {
      for(let j = 0; j < ray.length; j += 1) {
        if(i === j) {
          continue
        }
        if(ray[j] === ray[i]) {
          ray.splice(i, 1)
          i--
        }
      }
    }

    return ray
  }

  this.findBuddies = function (squares) {
    let indices = []
    squares.forEach(square => {
      indices = this.getPotentialTurns(square).map(turn => turn + square).concat(indices)
    })
    // this gets way out of hand unless we remove doubles every time
    return removeDoubles(indices)
  }

  this.initialize = function (width, height, cheeseSquare) {
    if (width % this.tileSize !== 0) {
      throw new Error('tile size %s does not divide evenly into width %s', this.tileSize, width)
    }

    if (height % this.tileSize !== 0) {
      throw new Error('tile size %s does not divide evenly into height %s', this.tileSize, height)
    }

    this.cols = (width / this.tileSize)
    this.rows = (height / this.tileSize)

    this.stride = this.cols

    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        let tileNum = (i * this.cols) + j;
        this.tiles.push(new Tile(tileNum, this.tileSize, (map[i * this.cols + j] === 1 ), tileNum === cheeseSquare))
      }
    }

    var set = [cheeseSquare]
    this.tiles[cheeseSquare].grade(1)
    var val = 2
    var ungraded = this.tiles.filter(tile => (!tile.graded && !tile.wall))

    // var start = Date.now()

    // loop through all of the tiles and assign them values based on how many loops it took to reach them
    // therefore how far away they are from the cheese
    while(ungraded.length > 0 ) {
      set = this.findBuddies(set).filter(ind => this.tiles[ind].wall === false)
      set.forEach(tile => {
        if (!this.tiles[tile].graded) {
          this.tiles[tile].grade(val)
        }
      })
      ungraded = ungraded.filter(tile => (!tile.graded && !tile.wall))
      ++val

      if (val > 10000) {
        throw new Error('infinite while loop, theres no way the maze is that big!')
      }
    }
    // console.log('took ' + (Date.now() - start) + ' milliseconds to process' )
    // console.log(this.tiles)
  }

  this.display = function () {
    for (let i = 0; i < this.tiles.length; i += 1) {
      let tile = this.tiles[i]
      let pos = {
        x: (i % this.cols) * this.tileSize,
        y: Math.floor(i / this.cols) * this.tileSize
      }
      tile.display(pos)
    }
  }
}
