module.exports = class HtmlInt {
  constructor(calculator) {
    this.calculator = calculator
    this.UPPER_LIMIT = 1000000000000
    this.LOWER_LIMIT = 0.00000001
    this.calcButtons = document.querySelectorAll('.calc-button')
    this.display = document.getElementById('display')
  }

  inputEvent(cmdCode) {
    this.calculator.handleInput(cmdCode)
    const displayVal = this.calculator.getDisplay().value
    this.display.innerHTML = displayVal
  }

  run() {
    ;[...this.calcButtons].forEach(button => {
      const cmdCode = button.id.replace('Btn', '').toUpperCase()
      button.addEventListener('click', () => this.inputEvent(cmdCode))
    })
  }
}

const keyMapping = e => {
  const keyCode = e.which || e.keyCode

  switch (keyCode) {
    case 49:
      break
    case 49:
      break
    case 49:
      break
    case 49:
      break
    case 49:
      break
    case 49:
      break
    case 49:
      break
    case 49:
      break
    case 49:
      break
    case 49:
      break
    case 49:
      break
    default:
      break
  }
}

document.addEventListener('keydown', keyMapping, false)
