const { getCmdDAL } = require('./DAL')

const handleError = errCode => {
  throw errCode
}

const getCmd = inputCode => {
  const cmdObj = getCmdDAL(inputCode)
  if (!cmdObj) handleError('NOT_FOUND')

  return cmdObj
}

const appendNumber = (val, appendee, limit = 100) => {
  const valF = val.toString()
  const appendeeF = appendee.toString()

  if (valF.length >= limit) handleError('EXCESS_LEN')
  if (valF === '' || valF === 0) return appendeeF

  return valF.concat(appendeeF)
}

const appendDecimal = (val, limit = 100) => {
  let valF = val.toString()
  valF = !valF ? '0' : valF

  const decimalCount = (valF.match(/[0-9]\./g) || []).length
  if (decimalCount >= 1) handleError('DUP_DEC')
  if (valF.length >= limit) handleError('EXCESS_LEN')

  return valF.concat('.')
}

const invertSign = val => {
  const valF = Number(val)
  if (valF === '' || valF === 0) return val

  const invertedVal = (valF * -1).toString()
  return invertedVal
}

exports.getCmd = getCmd
exports.handleError = handleError
exports.appendNumber = appendNumber
exports.invertSign = invertSign
exports.appendDecimal = appendDecimal
