const get_first = (t) => {
    if (Array.isArray(t)) {
      return t[2]
    }
    return t
}

const isObject = (value) => {
    return value !== null && typeof value === 'object'
}

