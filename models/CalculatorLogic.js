class CalculatorLogic {
  maxDigits
  num1 = 0
  num2 = 0
  currentNum = 0
  digitsCount = 0
  decimalsCount = 0
  hasComma = false
  selectedOperator = ""
  isNegative = false

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
      this.handleDigitsLimit()
      CALCULATOR_STATE.currentDisplayValue += String(digit)
      CALCULATOR_STATE.updateCalculatorInterfaceState()
    }
  }

  handleCommaInput(comma) {
    if (!this.hasComma && this.digitsCount < this.maxDigits) {
      this.hasComma = true
      this.digitsCount++
      this.handleDigitsLimit()
      CALCULATOR_STATE.currentDisplayValue += comma
      CALCULATOR_STATE.isCommaButtonEnabled = false
      CALCULATOR_STATE.updateCalculatorInterfaceState()
    }
  }

  handleChangeSignInput() {
    if (this.digitsCount < this.maxDigits || this.currentNum < 0) {
      this.currentNum *= -1
      if (!this.isNegative) {
        CALCULATOR_STATE.mustAddNegativeSign = true
        this.digitsCount++
      }else{
        CALCULATOR_STATE.mustRemoveNegativeSign = true
        this.digitsCount--
      }
      this.handleDigitsLimit()
      CALCULATOR_STATE.updateCalculatorInterfaceState()
      this.isNegative = !this.isNegative
      CALCULATOR_STATE.hasNegativeSign = this.isNegative
      CALCULATOR_STATE.mustAddNegativeSign = false
      CALCULATOR_STATE.mustRemoveNegativeSign = false
    }
  }

  handleOperatorInput() {

  }

  handleClearInput(){
    CALCULATOR_STATE.awaitingDisplayClean = true
    CALCULATOR_STATE.isCommaButtonEnabled = true
    CALCULATOR_STATE.isOperatorButtonsEnabled = false
    CALCULATOR_STATE.isInputDigitButtonsEnabled = true
    CALCULATOR_STATE.isClearButtonEnabled = false
    CALCULATOR_STATE.isDeleteButtonEnabled = false
    CALCULATOR_STATE.isChangeSignButtonEnabled = true
    CALCULATOR_STATE.isEqualButtonEnabled = false
    CALCULATOR_STATE.mustRemoveNegativeSign = true
    CALCULATOR_STATE.mustAddNegativeSign = false
    CALCULATOR_STATE.hasNegativeSign = false
    CALCULATOR_STATE.updateCalculatorInterfaceState()
    CALCULATOR_STATE.awaitingDisplayClean = false
    CALCULATOR_STATE.mustRemoveNegativeSign = false

    this.currentNum = 0
    this.num1 = 0
    this.num2 = 0
    this.isNegative = false
    this.hasComma = false
    this.digitsCount = 0
    this.decimalsCount = 0
    this.selectedOperator = ""
  }

  handleDeleteInput(){
    if (!this.hasComma) {
      this.currentNum = parseInt(this.currentNum/10) 
    }else if (this.decimalsCount > 0){
      let numToInteger = parseInt(this.currentNum * Math.pow(10, this.decimalsCount - 1))
      this.currentNum = parseFloat(numToInteger) / Math.pow(10, this.decimalsCount - 1)
    }

  }

  handleDigitsLimit() {
    if (this.digitsCount === this.maxDigits) {
      CALCULATOR_STATE.isInputDigitButtonsEnabled = false
      CALCULATOR_STATE.isCommaButtonEnabled = false
      if (!this.isNegative) {
        CALCULATOR_STATE.isChangeSignButtonEnabled = false
      }
    }else{
      CALCULATOR_STATE.isInputDigitButtonsEnabled = true
      CALCULATOR_STATE.isCommaButtonEnabled = true
      CALCULATOR_STATE.isChangeSignButtonEnabled = true
    }
  }
}
