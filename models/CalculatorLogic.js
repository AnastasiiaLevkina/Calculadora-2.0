class CalculatorLogic {
  maxDigits
  num1 = 0
  num2 = 0
  currentNum = 0
  digitsCount = 0
  decimalsCount = 0
  hasComma = false
  selectedOperator = ""
  hasNegativeSign = false

  constructor(maxDigits) {
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
      if (this.digitsCount === this.maxDigits) {
        CALCULATOR_STATE.isInputDigitButtonsEnabled = false
        CALCULATOR_STATE.isCommaButtonEnabled = false
        if (this.currentNum > 0) {
          CALCULATOR_STATE.isChangeSignButtonEnabled = false
        }
      }
      CALCULATOR_STATE.currentDisplayValue += String(digit)
      CALCULATOR_STATE.updateCalculatorInterfaceState()
    }
  }

  handleCommaInput(comma) {
    if (!this.hasComma && this.digitsCount < this.maxDigits) {
      this.hasComma = true
      this.digitsCount++
      if (this.digitsCount === this.maxDigits) {
        CALCULATOR_STATE.isInputDigitButtonsEnabled = false
        CALCULATOR_STATE.isCommaButtonEnabled = false
        if (this.currentNum > 0) {
          CALCULATOR_STATE.isChangeSignButtonEnabled = false
        }
      }
      CALCULATOR_STATE.currentDisplayValue += comma
      CALCULATOR_STATE.isCommaButtonEnabled = false
      CALCULATOR_STATE.updateCalculatorInterfaceState()
    }
  }

  handleOperatorInput() {}
}
