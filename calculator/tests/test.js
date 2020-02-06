// Tests are based on Jest javascript testing library

/*
-----------------
SET UP/TEAR DOWN
----------------
*/

const Calculator = require('../calc')

const CalcInst = new Calculator()

beforeEach(() => {
  CalcInst.handleInput('ALL_CLR')
})

/*
--------
TESTS
-------
*/

describe('Init', () => {
  test('Initial Display', () => {
    expect(CalcInst.getDisplay().value).toBe('0')
  })
})

describe('Basic Commands', () => {
  test('Addition test', () => {
    CalcInst.handleInput('SEVEN')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('THREE')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay()).toEqual({ type: 'resultant', value: '10' })
  })

  test('Subtraction test', () => {
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('SUB')
    CalcInst.handleInput('FOUR')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('-2')
  })

  test('Multiplication test', () => {
    CalcInst.handleInput('EIGHT')
    CalcInst.handleInput('MUL')
    CalcInst.handleInput('SIX')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('48')
  })

  test('Division test', () => {
    CalcInst.handleInput('NINE')
    CalcInst.handleInput('DIV')
    CalcInst.handleInput('THREE')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('3')
  })

  test('All Clear test', () => {
    CalcInst.handleInput('NINE')
    CalcInst.handleInput('DIV')
    CalcInst.handleInput('THREE')
    CalcInst.handleInput('ALL_CLR')
    CalcInst.handleInput('FOUR')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('THREE')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('7')
  })

  test('Clear test', () => {
    CalcInst.handleInput('NINE')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('THREE')
    CalcInst.handleInput('CLR')
    CalcInst.handleInput('FIVE')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('14')
  })
})

describe('Non-Allowable/Blocked Commands', () => {
  test('Starting Operand Check', () => {
    CalcInst.handleInput('ADD')
    expect(CalcInst.getDisplay().value).toBe('0')
  })

  test('Equals With No Operand', () => {
    CalcInst.handleInput('ONE')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('1')
  })

  test('Equals With No Second Value', () => {
    CalcInst.handleInput('ONE')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('1')
  })
})

describe('Advanced Use Cases', () => {
  test('Double Digit Numbers', () => {
    CalcInst.handleInput('ONE')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('THREE')
    CalcInst.handleInput('ONE')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('43')
  })

  test('Decimal Returns', () => {
    CalcInst.handleInput('FIVE')
    CalcInst.handleInput('DIV')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('2.5')
  })

  test('Complex Decimal Returns', () => {
    CalcInst.handleInput('FIVE')
    CalcInst.handleInput('ONE')
    CalcInst.handleInput('DIV')
    CalcInst.handleInput('SEVEN')
    CalcInst.handleInput('EQ')
    expect(Number(CalcInst.getDisplay().value).toFixed(6)).toBe('7.285714')
  })

  test('Switched Operand Entries', () => {
    CalcInst.handleInput('FIVE')
    CalcInst.handleInput('SUB')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('7')
  })

  test('Sequential Operand Entries', () => {
    CalcInst.handleInput('FIVE')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('THREE')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('12')
  })

  test('Separate Equations', () => {
    CalcInst.handleInput('FOUR')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('EQ')
    CalcInst.handleInput('THREE')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('5')
  })

  test('Sequential Equals, Increments', () => {
    CalcInst.handleInput('FOUR')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('EQ')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('8')
  })

  test('Negative Number', () => {
    CalcInst.handleInput('FOUR')
    CalcInst.handleInput('SIGN')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('-2')
  })

  test('Both Numbers are Negative', () => {
    CalcInst.handleInput('THREE')
    CalcInst.handleInput('SIGN')
    CalcInst.handleInput('MUL')
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('SIGN')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('6')
  })

  test('Decimal Number', () => {
    CalcInst.handleInput('TWO')
    CalcInst.handleInput('DEC')
    CalcInst.handleInput('ONE')
    CalcInst.handleInput('ADD')
    CalcInst.handleInput('ONE')
    CalcInst.handleInput('EQ')
    expect(CalcInst.getDisplay().value).toBe('3.1')
  })
})
