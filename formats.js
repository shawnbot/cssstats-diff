const formats = {
  csv: {delimiter: ','},
  tsv: {delimiter: '\t'},
  markdown: {
    delimiter: ' | ',
    beforeLine: '| ',
    afterLine: ' |',
    headerSeparatorCell: ':---'
  }
}

module.exports = getFormat

function getFormat(format, columns) {
  return createFormat(formats[format], columns)
}

function createFormat(options, columns) {
  const {
    delimiter,
    beforeLine = '',
    afterLine = '',
    headerSeparatorCell,
    lineDelimiter = '\n'
  } = options

  const formatRow = cells => beforeLine + cells.join(delimiter) + afterLine
  return {
    formatRow,
    getHeader() {
      return formatRow(columns.map(escape))
    },
    getHeaderSeparator() {
      return headerSeparatorCell
        ? formatRow(columns.map(() => headerSeparatorCell))
        : null
    }
  }
}
