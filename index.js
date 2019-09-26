const prettyBytes = require('pretty-bytes')
const cssstats = require('cssstats')
const dotProp = require('dot-prop')

const sizeKeys = new Set(['size', 'gzipSize'])

module.exports = function cssstatsDiff(beforeArg, afterArg, options = {}) {
  const beforeStats = getStats(beforeArg)
  const afterStats = getStats(afterArg)

  const {keys = []} = options

  const diff = {}
  for (const key of keys) {
    const before = dotProp.get(beforeStats, key)
    const after = dotProp.get(afterStats, key)
    const delta = after - before
    if (delta !== 0) {
      const readable = sizeKeys.has(key) ? prettyBytes(delta) : delta.toLocaleString()
      diff[key] = {key, before, after, delta: readable}
    }
  }

  return diff
}

function getStats(arg) {
  if (typeof arg === 'string') {
    return cssstats(arg)
  } else if (arg && typeof arg === 'object') {
    return arg
  } else {
    throw new Error(`Expected CSS string or stats object; got "${typeof arg}"`)
  }
}
