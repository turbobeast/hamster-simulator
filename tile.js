function Tile (num, width, wall, cheese) {
  'use strict'

  this.wall = wall
  this.num = num
  this.width = width
  this.graded = false
  this.value = Math.MAX_SAFE_INTEGER

  this.wallCol = COLORS.mazeBlues[5]
  this.pathCol = COLORS.mazeBlues[1]
  this.outLine = COLORS.mazeBlues[0]

  this.display = function (pos) {

    stroke(this.outLine.r,this.outLine.g,this.outLine.b)
    if (!this.wall) {
      fill(this.pathCol.r, this.pathCol.g, this.pathCol.b)
    } else {
      fill(this.wallCol.r, this.wallCol.g, this.wallCol.b)
    }
    rect(pos.x, pos.y, this.width, this.width)

    if (cheese) {

      // side wall
      fill(245, 192, 56)
      beginShape()
      vertex(pos.x + 8, pos.y + 26)
      vertex(pos.x + 8, pos.y + 40)
      vertex(pos.x + 45, pos.y + 35)
      vertex(pos.x + 45, pos.y + 15)
      endShape()


      fill(255, 232, 112)
      beginShape()
      vertex(pos.x + 7, pos.y + 27)
      vertex(pos.x + 32, pos.y + 5)
      vertex(pos.x + 45, pos.y + 15)
      endShape()
      noStroke()
      fill(255, 232, 112)
      arc(pos.x + 32, pos.y + 27, 5, 4, 0, TWO_PI)

      fill(255, 232, 112)
      arc(pos.x + 20, pos.y + 33, 3, 3, 0, TWO_PI)
    }

    textSize(12);
    fill(198,48,229)
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
