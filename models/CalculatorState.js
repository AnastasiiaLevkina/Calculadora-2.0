class CalculatorState {
  currentDisplayValue = ""
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

  updateCalculatorInterfaceState() {
    if (this.awaitingDisplayClean) {
      this.currentDisplayValue = "0"
    }
    if (this.mustRemoveNegativeSign) {
      if (this.hasNegativeSign) {
        this.currentDisplayValue.slice(1, this.currentDisplayValue.length)
      }
    } else if (this.mustAddNegativeSign) {
      if (this.hasNegativeSign) {
        this.currentDisplayValue = "-" + this.currentDisplayValue
      }
    }
    USER_INTERFACE.updateDisplayContent(this.currentDisplayValue)
    USER_INTERFACE.setEnabledCommaInputButton(this.isCommaButtonEnabled)
    USER_INTERFACE.setEnabledOperatorInputButtons(this.isOperatorButtonsEnabled)
    USER_INTERFACE.setEnabledDigitInputButtons(this.isInputDigitButtonsEnabled)
    USER_INTERFACE.setEnabledClearInputButton(this.isClearButtonEnabled)
    USER_INTERFACE.setEnabledDeleteInputButton(this.isDeleteButtonEnabled)
    USER_INTERFACE.setEnabledChangeSignInputButton(
      this.isChangeSignButtonEnabled
    )
    USER_INTERFACE.setEnabledEqualInputButton(this.isEqualButtonEnabled)
  }
}
