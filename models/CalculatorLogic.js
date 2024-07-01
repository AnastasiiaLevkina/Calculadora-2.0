class CalculatorLogic {
  maxDigits
  num1 = 0
  num2 = 0
  currentNum = 0
  digitsCount = 0
  decimalsCount = 0
  hasComma = false
  selectedOperator = ''
  isNegative = false

  state

  constructor(state, maxDigits) {
    this.state = state
    this.maxDigits = maxDigits
  }

  handleDigitInput(digit) {
    if (this.digitsCount < this.maxDigits) {
      if (!this.hasComma) {
        this.currentNum = this.currentNum * 10 + digit
      } else {
        this.decimalsCount++
        this.currentNum += digit * Math.pow(10, this.decimalsCount * -1)
      }
      this.digitsCount++
      this.handleDigitsLimit()
      this.state.currentDisplayValue += String(digit)
      this.state.updateCalculatorInterfaceState()
    }
  }

  handleCommaInput(comma) {
    if (!this.hasComma && this.digitsCount < this.maxDigits) {
      this.hasComma = true
      this.digitsCount++
      this.handleDigitsLimit()
      this.state.currentDisplayValue += comma
      this.state.isCommaButtonEnabled = false
      this.state.updateCalculatorInterfaceState()
    }
  }

  handleChangeSignInput() {
    if (this.digitsCount < this.maxDigits || this.currentNum < 0) {
      this.currentNum *= -1
      if (!this.isNegative) {
        this.state.mustAddNegativeSign = true
        this.digitsCount++
      } else {
        this.state.mustRemoveNegativeSign = true
        this.digitsCount--
      }
      this.handleDigitsLimit()
      this.state.updateCalculatorInterfaceState()
      this.isNegative = !this.isNegative
      this.state.hasNegativeSign = this.isNegative
      this.state.mustAddNegativeSign = false
      this.state.mustRemoveNegativeSign = false
    }
  }

  handleOperatorInput(op) {}

  handleClearInput() {
    this.state.awaitingDisplayClean = true
    this.state.isCommaButtonEnabled = true
    this.state.isOperatorButtonsEnabled = false
    this.state.isInputDigitButtonsEnabled = true
    this.state.isClearButtonEnabled = false
    this.state.isDeleteButtonEnabled = false
    this.state.isChangeSignButtonEnabled = true
    this.state.isEqualButtonEnabled = false
    this.state.mustRemoveNegativeSign = true
    this.state.mustAddNegativeSign = false
    this.state.hasNegativeSign = false
    this.state.updateCalculatorInterfaceState()
    this.state.awaitingDisplayClean = false
    this.state.mustRemoveNegativeSign = false

    this.currentNum = 0
    this.num1 = 0
    this.num2 = 0
    this.isNegative = false
    this.hasComma = false
    this.digitsCount = 0
    this.decimalsCount = 0
    this.selectedOperator = ''
  }

  handleDeleteInput() {
    if (!this.hasComma) {
      this.currentNum = parseInt(this.currentNum / 10)
    } else if (this.decimalsCount > 0) {
      const NUM_TO_INTEGER = parseInt(
        this.currentNum * Math.pow(10, this.decimalsCount - 1)
      )
      this.currentNum =
        parseFloat(NUM_TO_INTEGER) / Math.pow(10, this.decimalsCount - 1)
    }
  }

  handleEqualInput() {
    let result
    switch (this.selectedOperator) {
      case '+':
        result = sum(num1, num2)
        break
      case '-':
        result = subtract(num1, num2)
        break
      case 'x':
        result = multiply(num1, num2)
        break
      case '/':
        result = divide(num1, num2)
        break
      default:
        operationExecuted = false
        break
    }
  }

  handleDigitsLimit() {
    if (this.digitsCount === this.maxDigits) {
      this.state.isInputDigitButtonsEnabled = false
      this.state.isCommaButtonEnabled = false
      this.state.isChangeSignButtonEnabled = this.isNegative
      this.state.isDeleteButtonEnabled = true
      this.state.isClearButtonEnabled = true
    } else {
      this.state.isInputDigitButtonsEnabled = true
      this.state.isCommaButtonEnabled = true
      this.state.isChangeSignButtonEnabled = true
    }
  }
}
