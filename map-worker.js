var gradeds = []
var cols = 0
var rows = 0
var stride = 0

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

function findBuddies(squares) {

  let indices = [];
  squares.forEach(square => {

    var squareRow = Math.floor(square / cols)
    var notTop = (squareRow > 0)
    var notBottom = (squareRow < this.rows - 1)

    if (square % cols !== 0) {
      // not left edge
      // console.log(square + ' is not on left edge')
      indices.push(square - 1)
    }

    if ((square + 1) % cols !== 0) {
        // not right edge
      indices.push(square + 1)
    }

    if (notTop) {
      indices.push(square - stride)
    }

    if (notBottom) {
      indices.push(square + stride)
    }

  })

  return removeDoubles(indices)
}
//
// var set = [cheeseSquare]
// this.tiles[cheeseSquare].grade(0)
// var val = 1
// var ungraded = this.tiles.filter(tile => !tile.graded)
//
// var start = Date.now()
// while(ungraded.length > 0) {
//   set = this.mapValues(set) //.map(ind => ) // .filter(ind => this.tiles[ind].wall === false)
//   set.forEach(tile => {
//     if (!this.tiles[tile].graded) {
//       this.tiles[tile].grade(val)
//     }
//   })
//   ungraded = ungraded.filter(tile => !tile.graded)
//   ++val
// }

function mapValues (options) {
  cols = options.cols
  rows = options.rows
  stride = options.cols

  var tiles = options.map.map((t) => ({
      graded: false,
      wall: (t === 1) ? true : false,
      grade: function (val) {
        this.value = val;
        this.graded = true;
      }
    })
  )
  var val = 0;
  var set = [options.cheeseSquare]
  tiles[options.cheeseSquare].grade(0)
  var ungraded = tiles.filter(tile => !tile.graded)

  // set = findBuddies(set)
  // console.log(set)
  // set = findBuddies(set)
  // set.forEach(s => {
  //   if(gradeds.indexOf(s) === -1) {
  //     gradeds.push(s)
  //   }
  // })
  // console.log(set)
  // set = findBuddies(set)
  // set.forEach(s => {
  //   if(gradeds.indexOf(s) === -1) {
  //     gradeds.push(s)
  //   }
  // })
  // console.log(set)
  //
  // set = findBuddies(set)
  // set.forEach(s => {
  //   if(gradeds.indexOf(s) === -1) {
  //     gradeds.push(s)
  //   }
  // })
  // console.log(set)

  while(ungraded.length > 0) {
    set = findBuddies(set); //.filter(ind => tiles[ind].graded === false)
    console.log(set)
    set.forEach(tile => {
      // gradeds.push(tile)
      if (!tiles[tile].graded) {
        tiles[tile].grade(val)
        gradeds.push(tile)
      }
    })
    // // console.log(val)
    ungraded = ungraded.filter(tile => !tile.graded)
    ++val
  }
  return tiles.map(tile => tile.value)
}

self.addEventListener('message', function (e) {
  var buddies = mapValues(e.data)
  self.postMessage(buddies.join('-'));
}, false)
