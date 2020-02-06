// --------
// IMPORTS
//--------

const {
  getCmd,
  handleError,
  appendNumber,
  invertSign,
  appendDecimal,
} = require('./utils/functions')

// ----------
// CLASS DEF
//----------

module.exports = class Calculator {
  constructor() {
    this.val1 = ''
    this.operand = ''
    this.val2 = ''
    this.resultant = ''
    this.state = 0
    this.VALUE_LENGTH_LIMIT = 100
  }

  getDisplay() {
    let displayObj = ''
    if (this.resultant !== '') {
      displayObj = {
        type: 'resultant',
        value: this.resultant,
      }
    } else if (this.val2 !== '') {
      displayObj = {
        type: 'val2',
        value: this.val2,
      }
    } else if (this.val1 !== '') {
      displayObj = {
        type: 'val1',
        value: this.val1,
      }
    } else {
      displayObj = {
        type: 'default',
        value: '0',
      }
    }
    return displayObj
  }

  handleInput(receivedInput) {
    try {
      this.state = this._determineState()
      const cmd = getCmd(receivedInput)

      switch (true) {
        // ------------------------
        // STATE 0 - Initial State
        //------------------------
        case this.state === 0 && cmd.type === 'NUM':
          this.val1 = appendNumber(this.val1, cmd.value)
          break

        case this.state === 0 && cmd.type === 'DEC':
          this.val1 = appendDecimal(this.val1)
          break

        // --------------------------------------
        // STATE 1 - One number has been entered
        //--------------------------------------
        case this.state === 1 && cmd.type === 'NUM':
          this.val1 = appendNumber(this.val1, cmd.value)
          break

        case this.state === 1 && cmd.type === 'OP_CONT':
          this.operand = cmd.value
          break

        case this.state === 1 && cmd.type === 'OP_EXEC':
          // To be used by squared, square root, absolute value, etc
          break

        case this.state === 1 && cmd.type === 'DEC':
          this.val1 = appendDecimal(this.val1)
          break

        case this.state === 1 && cmd.type === 'SIGN':
          this.val1 = invertSign(this.val1)
          break

        // ----------------------------------------------------
        // STATE 2 - A number and an operand have been entered
        //----------------------------------------------------
        case this.state === 2 && cmd.type === 'NUM':
          this.val2 = appendNumber(this.val2, cmd.value)
          break

        case this.state === 2 && cmd.type === 'OP_CONT':
          this.operand = cmd.value
          break

        // -------------------------------------------------------
        // STATE 3 - Two numbers and an operand have been entered
        //-------------------------------------------------------
        case this.state === 3 && cmd.type === 'NUM':
          this.val2 = appendNumber(this.val2, cmd.value)
          break

        case this.state === 3 && cmd.type === 'OP_CONT':
          this.val1 = this._executeOperation()
          this.operand = cmd.value
          this.val2 = ''
          break

        case this.state === 3 && cmd.type === 'OP_EXEC':
          if (cmd.code === 'EQ') this.resultant = this._executeOperation()
          break

        case this.state === 3 && cmd.type === 'DEC':
          this.val2 = appendDecimal(this.val2)
          break

        case this.state === 3 && cmd.type === 'SIGN':
          this.val2 = invertSign(this.val2)
          break

        // ------------------------------------------------------------
        // STATE 4 - An equation has been executed and returned a result
        //------------------------------------------------------------
        case this.state === 4 && cmd.type === 'NUM':
          this._clearState()
          this.val1 = appendNumber(this.val1, cmd.value)
          break

        case this.state === 4 && cmd.type === 'OP_CONT':
          this.val1 = this.resultant
          this.operand = cmd.value
          this.val2 = ''
          this.resultant = ''
          break

        case this.state === 4 && cmd.type === 'OP_EXEC':
          this.val1 = this.resultant
          this.resultant = this._executeOperation()
          break

        case this.state === 4 && cmd.type === 'SIGN':
          this.resultant = invertSign(this.resultant)
          break

        // ---------------
        // CLEAR COMMANDS
        //---------------
        case this.state === 3 && cmd.code === 'CLR':
          this.val2 = ''
          break

        case cmd.type === 'CLR':
          this._clearState()
          break

        default:
          handleError('NON_ALLOW')
      }
      return this._setReturn(receivedInput)
    } catch (err) {
      return this._setReturn(receivedInput, err)
    }
  }

  revertValue(type, val) {
    if (type === 'val1') {
      this.val1 = val
    } else if (type === 'val2') {
      this.val2 = val
    }
    return this._setReturn('NONE')
  }

  _determineState() {
    if (!this.val1 && !this.operand && !this.val2 && !this.resultant) {
      return 0
    }
    if (this.val1 !== '' && !this.operand && !this.val2 && !this.resultant) {
      return 1
    }
    if (
      this.val1 !== '' &&
      this.operand !== '' &&
      !this.val2 &&
      !this.resultant
    ) {
      return 2
    }
    if (
      this.val1 !== '' &&
      this.operand !== '' &&
      this.val2 !== '' &&
      !this.resultant
    ) {
      return 3
    }
    if (
      this.val1 !== '' &&
      this.operand !== '' &&
      this.val2 !== '' &&
      this.resultant !== ''
    ) {
      return 4
    }
    return handleError('INV_STATE')
  }

  _clearState() {
    this.val1 = ''
    this.operand = ''
    this.val2 = ''
    this.resultant = ''
    this.state = 0

    return true
  }

  _executeOperation() {
    if (this.operand === '/' && this.val2 === '0') handleError('DIV_ZERO')

    //
    const value1 = Number(this.val1)
    const value2 = Number(this.val2)
    /* eslint no-new-func: 0 */
    const operation = new Function(
      'value1',
      'value2',
      `return value1 ${this.operand} value2`
    )

    const result = operation(value1, value2)
    return result.toString()
  }

  _setReturn(inputCmd, err = '') {
    const success = !err ? 'Y' : 'N'

    return {
      success,
      code: err,
      appState: {
        command: inputCmd,
        val1: this.val1,
        operand: this.operand,
        val2: this.val2,
        resultant: this.resultant,
        state: this.state,
      },
    }
  }
}
