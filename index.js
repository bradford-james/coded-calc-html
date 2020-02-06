const Calculator = require('./calculator/calc')
const HtmlInt = require('./interface/interface')

const calculatorInst = new Calculator()
const interfaceInst = new HtmlInt(calculatorInst)

interfaceInst.run()

// TODO add logging
// TODO display validation, limiting
// TODO Exponent display?
// TODO Sign display
// TODO Error handling
