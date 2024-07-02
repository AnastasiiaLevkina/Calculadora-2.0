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
  writingSecondNumber = false

  state

  constructor(state, maxDigits) {
    this.state = state
    this.maxDigits = maxDigits
  }

  handleDigitInput(digit) {
    if (this.digitsCount < this.maxDigits) {
      if (!this.hasComma) {
        if (this.digitsCount > 0 && this.currentNum === 0) {
          this.state.awaitingDisplayClean = true
          this.digitsCount--
        }
        this.currentNum = this.currentNum * 10 + (digit * (this.isNegative? -1: 1))
      } else {
        this.decimalsCount++
        this.currentNum += (digit * Math.pow(10, this.decimalsCount * -1)) * (this.isNegative? -1: 1)
      }
      if (this.isNegative && this.currentNum >= 0){
        this.currentNum *= -1
      }
      this.digitsCount++
      this.handleDigitsLimit()
      this.state.digitToAddToDisplay = String(digit)
      this.state.isOperatorButtonsEnabled = true
      this.state.isDeleteButtonEnabled = true
      this.state.isClearButtonEnabled = true
      this.state.isEqualButtonEnabled = true
      this.state.updateCalculatorInterfaceState()
      
    }
  }

  handleCommaInput(comma) {
    if (!this.hasComma && this.digitsCount < this.maxDigits) {
     
      if (this.digitsCount > 0) {
        this.state.digitToAddToDisplay = comma
      } else {
        this.state.digitToAddToDisplay = '0' + comma
        this.digitsCount++
      }
      this.hasComma = true
      this.digitsCount++
      this.handleDigitsLimit()
      this.state.isCommaButtonEnabled = false
      this.state.updateCalculatorInterfaceState()
    }
  }

  handleChangeSignInput() {
    if (this.digitsCount < this.maxDigits || this.isNegative) {
      this.currentNum *= -1
      if (this.digitsCount === 0 && this.state.awaitingDisplayClean) {
        this.state.digitToAddToDisplay = '0'
        this.digitsCount++
      }
      if (!this.isNegative) {
        this.state.mustAddNegativeSign = true
        this.digitsCount++
      } else {
        this.state.mustRemoveNegativeSign = true
        this.digitsCount--
      }  
      this.isNegative = !this.isNegative
      this.handleDigitsLimit()
      this.state.updateCalculatorInterfaceState()  
      this.state.hasNegativeSign = this.isNegative
    }
  }

  handleOperatorInput(op) {
    if (this.selectedOperator.length === 0) {
      this.selectedOperator = op 
      this.state.highlightenOperatorButtonSign = op
    } else if (this.selectedOperator === op) {
      this.selectedOperator = ''
      this.state.highlightenOperatorButtonSign = ''
    }
    this.state.updateCalculatorInterfaceState()
    if (!this.writingSecondNumber) {
      this.num1 = this.currentNum
      this.currentNum = 0
      this.digitsCount = 0
      this.decimalsCount = 0
      this.isNegative = false
      this.writingSecondNumber = true
      this.hasComma = false
      this.state.isInputDigitButtonsEnabled = true
      this.state.isChangeSignButtonEnabled = true
      this.state.isCommaButtonEnabled = true
      this.state.updateCalculatorInterfaceState()  
      this.state.mustRemoveNegativeSign = true
      this.state.awaitingDisplayClean = true  
    }
  }

  handleClearInput() {
    this.currentNum = 0
    this.num1 = 0
    this.num2 = 0
    this.isNegative = false
    this.hasComma = false
    this.digitsCount = 0
    this.decimalsCount = 0
    this.selectedOperator = ''
    this.writingSecondNumber = false

    this.state.digitToAddToDisplay = '0'  
    this.state.isCommaButtonEnabled = true
    this.state.isOperatorButtonsEnabled = false
    this.state.isInputDigitButtonsEnabled = true
    this.state.isClearButtonEnabled = false
    this.state.isDeleteButtonEnabled = false
    this.state.isChangeSignButtonEnabled = true
    this.state.isEqualButtonEnabled = false
    this.state.mustRemoveNegativeSign = true
    this.state.mustAddNegativeSign = false
    this.state.highlightenOperatorButtonSign = ''
    this.state.awaitingDisplayClean = true
    
    this.state.updateCalculatorInterfaceState()
    this.state.awaitingDisplayClean = true
    this.state.hasNegativeSign = false
  }

  handleDeleteInput() {
    if (this.digitsCount > 0) {
      if (!this.hasComma) {
        this.currentNum = parseInt(this.currentNum / 10)
      } else if (this.decimalsCount > 0) {
        const NUM_TO_INTEGER = parseInt(
          this.currentNum * Math.pow(10, this.decimalsCount - 1)
        )
        this.currentNum = parseFloat(NUM_TO_INTEGER) / Math.pow(10, this.decimalsCount - 1)
        this.decimalsCount--
      } else {
        this.hasComma = false
      }
      this.digitsCount--
      this.state.digitsToDelete = 1
      this.handleDigitsLimit()
      this.state.updateCalculatorInterfaceState()
      if (this.digitsCount === 0) {
        this.state.awaitingDisplayClean = true
      }
    }
  }

  handleEqualInput() {
    let result
    let formattedNumber
    if (this.writingSecondNumber) {
      this.num2 = this.currentNum
      switch (this.selectedOperator) {
        case '+':
          result = sum(this.num1, this.num2)
          break
        case '-':
          result = subtract(this.num1, this.num2)
          break
        case 'x':
          result = multiply(this.num1, this.num2)
          break
        case '/':
          result = divide(this.num1, this.num2)
          break
        default:
          operationExecuted = false
          break
      }
      this.state.isOperatorButtonsEnabled = false
      this.state.isInputDigitButtonsEnabled = false
      this.state.isCommaButtonEnabled = false
      this.state.isDeleteButtonEnabled = false
      this.state.isEqualButtonEnabled = false
      this.state.isChangeSignButtonEnabled = false
    } else {
      result = this.currentNum
    }
    formattedNumber = this.checkNumberExceedingDigitLimit(result)
    this.state.awaitingDisplayClean = true
    this.state.digitToAddToDisplay = String(formattedNumber).replace('.', ',')
    this.state.updateCalculatorInterfaceState()
  }

  handleDigitsLimit() {
    if (this.digitsCount === this.maxDigits) {
      this.state.isInputDigitButtonsEnabled = false
      this.state.isCommaButtonEnabled = false
      this.state.isChangeSignButtonEnabled = this.isNegative
      this.state.isDeleteButtonEnabled = true
      this.state.isClearButtonEnabled = true
    } else if (this.digitsCount === 1 && this.isNegative) {
      this.state.isDeleteButtonEnabled = false
      this.state.digitToAddToDisplay = '0'
      this.state.awaitingDisplayClean = true
    } else {
      this.state.isInputDigitButtonsEnabled = true
      this.state.isCommaButtonEnabled = !this.hasComma
      this.state.isChangeSignButtonEnabled = true
    }
    if (this.digitsCount === 0) {
      this.state.isDeleteButtonEnabled = false
      this.state.digitToAddToDisplay = '0'
      this.state.awaitingDisplayClean = true
    }
  }

  checkNumberExceedingDigitLimit(number){
    let formattedNumber
    if (String(number).length > this.maxDigits) {
      formattedNumber = number.toExponential(2)
    } else {
      formattedNumber = number
    }
    return formattedNumber
  }
}
