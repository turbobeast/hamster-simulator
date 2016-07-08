

function removeDoubles (ray) {
  'use strict'
  for(let i = 0; i < ray.length; i += 1) {
    for(let j = 0; j < ray.length; j += 1) {
      if(i === j) {
        continue
      }
      if(ray[j] === ray[i]) {
        ray.splice(i, 1)
      }
    }
  }

  return ray
}


console.log(removeDoubles([1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,7,7]))
