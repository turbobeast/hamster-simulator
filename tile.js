function Tile (num, width, wall, cheese) {
  'use strict'

  this.wall = wall
  this.num = num
  this.width = width
  this.graded = false
  this.value = Math.MAX_SAFE_INTEGER

  this.display = function (pos) {



    if (!this.wall) {
      fill(25,12,52, 50)
    } else {
      fill(149,97,224, 50)
    }
    rect(pos.x, pos.y, this.width, this.width)

    if (cheese) {
      fill(245, 192, 56)
      triangle(pos.x + 2,
               pos.y + this.width-2,

               pos.x + this.width * 0.5,
               pos.y+2,

               pos.x + this.width-2,
               pos.y + this.width-2)
    }
    
    // textSize(12);
    // fill(198,48,229)
    // if (this.value) {
    //   text(this.value, pos.x + this.width * 0.4, pos.y + this.width * 0.6)
    // }
  }

  this.grade = function (val) {
    if (this.graded) {
      throw new Error('why are you grading this tile twice?')
    }
    this.value = val
    this.graded = true
  }
}
