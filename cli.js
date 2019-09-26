#!/usr/bin/env node
const cssstatsDiff = require('.')
const fetch = require('node-fetch')
const {promisify} = require('util')
const readFile = promisify(require('fs').readFile)
const getFormat = require('./formats')

const yargs = require('yargs')
  .usage('$0 <before.json | before-url> <after.json | after-url>')
  .option('f', {
    alias: 'format',
    default: 'tsv',
    describe: 'The output data format'
  })
const options = yargs.argv
const [beforeArg, afterArg] = options._

if (!beforeArg || !afterArg) {
  yargs.showUsage()
  process.exit(0)
}

const keys = [
  'size',
  'gzipSize',
  'rules.total',
  'selectors.total',
  'selectors.type',
  'selectors.class',
  'selectors.id',
  'selectors.pseudoClass',
  'selectors.pseudoElement',
  'declarations.total',
  'mediaQueries.total'
]

Promise.all([readStats(beforeArg), readStats(afterArg)])
  .then(([before, after]) => {
    const diff = cssstatsDiff(before, after, {keys})
    const columns = ['key', 'delta', 'before', 'after']
    const table = getTable({format: options.format, columns})
    const rows = Object.values(diff).map(value => columns.map(col => value[col]))
    console.log(table.print(rows))
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

function readStats(arg) {
  if (/^https?:\/\//.test(arg)) {
    return arg.includes('.json') ? fetch(arg).then(res => res.json()) : fetch(arg).then(res => res.text())
  } else {
    return readFile(arg, 'utf8')
  }
}

function getTable({format, columns}) {
  const {getHeader, getHeaderSeparator, formatRow, lineDelimiter = '\n'} = getFormat(format, columns)

  return {
    print(rows) {
      return [getHeader(), getHeaderSeparator(), ...rows.map(formatRow)].filter(Boolean).join(lineDelimiter)
    }
  }
}
