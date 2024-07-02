class CalculatorState {
  currentDisplayValue = ''
  highlightenOperatorButtonSign = ''
  digitToAddToDisplay = ''
  negativeSign = ''
  awaitingDisplayClean = false
  isCommaButtonEnabled = true
  isOperatorButtonsEnabled = true
  isInputDigitButtonsEnabled = true
  isClearButtonEnabled = true
  isDeleteButtonEnabled = true
  isChangeSignButtonEnabled = true
  isEqualButtonEnabled = true
  mustRemoveNegativeSign = false
  mustAddNegativeSign = false
  hasNegativeSign = false
  digitsToDelete = 0

  userInterface

  constructor(userInterface) {
    this.userInterface = userInterface
  }

  updateCalculatorInterfaceState() {
    console.log(CALCULATOR_LOGIC.currentNum)
    for (let i = 0; i < this.digitsToDelete; i++) {
      this.currentDisplayValue = this.currentDisplayValue.slice(0, this.currentDisplayValue.length-1)
      
    }
    if (this.awaitingDisplayClean && this.digitToAddToDisplay.length > 0) {
      this.currentDisplayValue = this.digitToAddToDisplay
    } else {
      this.currentDisplayValue += this.digitToAddToDisplay
    }
    if (this.mustRemoveNegativeSign) {
      if (this.hasNegativeSign) {
        this.negativeSign = ''
      }
    } else if (this.mustAddNegativeSign) {
      if (!this.hasNegativeSign) {
        this.negativeSign = '-'
      }
    }   
    this.userInterface.removeHighlightAllButtons()
    if (this.highlightenOperatorButtonSign.length > 0) {
      this.userInterface.setHighlightOnlyOnSelectedButton(this.highlightenOperatorButtonSign)
    }
    this.userInterface.updateDisplayContent(this.negativeSign + this.currentDisplayValue)
    this.userInterface.setEnabledCommaInputButton(this.isCommaButtonEnabled)
    this.userInterface.setEnabledOperatorInputButtons(
      this.isOperatorButtonsEnabled
    )
    this.userInterface.setEnabledDigitInputButtons(
      this.isInputDigitButtonsEnabled
    )
    this.userInterface.setEnabledClearInputButton(this.isClearButtonEnabled)
    this.userInterface.setEnabledDeleteInputButton(this.isDeleteButtonEnabled)
    this.userInterface.setEnabledChangeSignInputButton(
      this.isChangeSignButtonEnabled
    )
    this.userInterface.setEnabledEqualInputButton(this.isEqualButtonEnabled)
    this.digitToAddToDisplay = '' 
    this.awaitingDisplayClean = false
    this.mustRemoveNegativeSign = false
    this.mustAddNegativeSign = false
    this.digitsToDelete = 0
  }

}
