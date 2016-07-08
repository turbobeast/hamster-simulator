function Tile (num, width, wall) {
  'use strict'

  this.wall = wall
  this.num = num
  this.width = width
  this.graded = false
  this.value = Math.MAX_SAFE_INTEGER

  this.display = function (pos) {
    if (this.wall) {
      fill(25,2,2)
    } else {
      fill(254,2,2)
    }

    rect(pos.x, pos.y, this.width, this.width)
    textSize(32);
    fill(255)
    if (this.value) {
      text(this.value, pos.x + this.width * 0.4, pos.y + this.width * 0.6)
    }
  }

  this.grade = function (val) {
    if (this.graded) {
      throw new Error('why are you grading this tile twice?')
    }
    this.value = val
    this.graded = true
  }
}
