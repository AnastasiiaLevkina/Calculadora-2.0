class CalculatorState {
  currentDisplayValue = ''
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

  userInterface

  constructor(userInterface) {
    this.userInterface = userInterface
  }

  updateCalculatorInterfaceState(digit = '0') {
    if (this.awaitingDisplayClean) {
      this.currentDisplayValue = digit
    }
    if (this.mustRemoveNegativeSign) {
      if (this.hasNegativeSign) {
        this.currentDisplayValue.slice(1, this.currentDisplayValue.length)
      }
    } else if (this.mustAddNegativeSign) {
      if (this.hasNegativeSign) {
        this.currentDisplayValue = '-' + this.currentDisplayValue
      }
    }
    this.userInterface.updateDisplayContent(this.currentDisplayValue)
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
  }
}
