const get_2d_safe = (a, x, y) => {
  if (Array.isArray(a) && a[x] && a[x][y]) {
    return a[x][y]
  }
  return null
}

const merge_2d = (a1, a2, offset_y, offset_x) => {
  for(var y = 0; y < a2.length; y++){
    if(0 <= y + offset_y && y + offset_y < a1.length){
      var line1 = [...a1[y + offset_y]]
      var line2 = [...a2[y]]
      for(var x = 0; x < line2.length; x++){
        if(0 <= x + offset_x && x + offset_x < a1[y + offset_y].length){
          line1[x + offset_x] = line2[x]
        }
      }
      a1[y + offset_y] = line1.join('')
    }
  }
}

const force_array = (a) => {
  if(Array.isArray(a)){
      return a
  }
  return [a]
}

const isObject = (value) => {
    return value !== null && typeof value === 'object'
}

const DIR_UL = 0b10000000
const DIR_U  = 0b01000000
const DIR_UR = 0b00100000
const DIR_L  = 0b00010000
const DIR_R  = 0b00001000
const DIR_DL = 0b00000100
const DIR_D  = 0b00000010
const DIR_DR = 0b00000001
const DIR_NO = 0b00000000
const CENTER = DIR_U | DIR_D | DIR_R | DIR_L
const TC_U = DIR_L | DIR_D | DIR_R
const TC_L = DIR_U | DIR_D | DIR_R
const TC_D = DIR_U | DIR_L | DIR_R
const TC_R = DIR_U | DIR_L | DIR_D
const CORNER_UL = DIR_R | DIR_D
const CORNER_UR = DIR_L | DIR_D
const CORNER_DL = DIR_R | DIR_U
const CORNER_DR = DIR_L | DIR_U
const EDGE_V = DIR_U | DIR_D
const EDGE_H = DIR_L | DIR_R
const END_D = DIR_U
const END_U = DIR_D
const END_L = DIR_R
const END_R = DIR_L
