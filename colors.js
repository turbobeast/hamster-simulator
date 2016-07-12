function hex_to_rgb(hex) {
  'use strict'
  hex = hex.replace(/^[#|0x]/, '')
  if (hex.length !== 6) {
    throw new Error(`${hex} should have 6 characters not ${hex.length}`)
  }
  let r = parseInt(hex.slice(0,2), 16); // convert hexidecimal to decimal
  let g = parseInt(hex.slice(2,4), 16);
  let b = parseInt(hex.slice(4,6), 16);
  return {
    r: r,
    g: g,
    b: b
  }
}

function colorPool (colors) {
  return colors.map(function(color) {
    return hex_to_rgb(color)
  });
}

var COLORS = {};

COLORS.hammies = []
COLORS.hammies.push({ r: 255, g: 255, b: 255 })
COLORS.hammies.push({ r: 111, g: 111, b: 111 })
COLORS.hammies.push({ r: 215, g: 214, b: 191 })

COLORS.hammies.push({ r: 134, g: 106, b: 90 })
COLORS.mazeBlues = colorPool('#3D66A8,#3B5992,#324974,#344C73,#2F4056,#2D3344'.split(','))
