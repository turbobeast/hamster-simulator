function Maze (tileSize, map) {
  'use strict'

  this.tiles = []
  this.tileSize = tileSize || 64


  this.mapValues = function (squares) {

    let indices = [];
    squares.forEach(square => {

      var squareRow = Math.floor(square / this.cols)
      var notTop = (squareRow > 0)
      var notBottom = (squareRow < this.rows - 1)
      if ( square % this.cols !== 0) {
        // not left edge
        indices.push(square - 1)
        // if (notTop) {
        //   indices.push(square - this.stride - 1)
        // }
        //
        // if (notBottom) {
        //   indices.push(square + this.stride - 1)
        // }
      }

      if ((square + 1) % this.cols !== 0) {
          // not right edge
        indices.push(square + 1)
        // if (notTop) {
        //   indices.push(square - this.stride + 1)
        // }
        //
        // if (notBottom) {
        //   indices.push(square + this.stride + 1)
        // }
      }

      if (notTop) {
        indices.push(square - this.stride)
      }

      if (notBottom) {
        indices.push(square + this.stride)
      }

    })

    return indices
  }

  this.initialize = function (width, height, cheeseSquare) {

    if (width % this.tileSize !== 0) {
      console.warn('tile size %s does not divide evenly into width %s', this.tileSize, width)
    }

    if (height % this.tileSize !== 0) {
      console.warn('tile size %s does not divide evenly into height %s', this.tileSize, height)
    }
    this.cols = (width / this.tileSize)
    this.rows = (height / this.tileSize)

    this.stride = this.cols

    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        let tileNum = (i * this.cols) + j;
        this.tiles.push(new Tile(tileNum, this.tileSize, (map[i]===1)))
      }
    }

    var set = [cheeseSquare]
    this.tiles[cheeseSquare].grade(0)
    var val = 1
    var ungraded = this.tiles.filter(tile => !tile.graded)

    var start = Date.now()
    while(ungraded.length > 0) {
      set = this.mapValues(set) //.map(ind => ) // .filter(ind => this.tiles[ind].wall === false)
      set.forEach(tile => {
        if (!this.tiles[tile].graded) {
          this.tiles[tile].grade(val)
        }
      })
      ungraded = ungraded.filter(tile => !tile.graded)
      ++val
    }
    console.log('took ' + (Date.now() - start) + ' milliseconds to process' )

    console.log(this.tiles)
  }

  this.display = function () {
    for (let i = 0; i < this.tiles.length; i += 1) {
      let tile = this.tiles[i]
      console.log(i, (i % this.cols) * this.tileSize )
      let pos = {
        x: (i % this.cols) * this.tileSize,
        y: Math.floor(i / this.cols) * this.tileSize
      }
      tile.display(pos)
    }
  }
}
