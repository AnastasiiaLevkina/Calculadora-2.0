class UserInterface {
  display
  numButtons
  operatorButtons
  clearButton
  deleteButton
  commaButton
  changeSignButton
  equalButton

  constructor(document) {
    this.display = new Display(document.querySelector('#display'))
    this.numButtons = addDigitsInputDOMButtonEventListenerList(
      document,
      'button[data-type = number]'
    )
    this.operatorButtons = addOperatorInputDOMButtonEventListenerMap(
      document,
      'button[data-type = operator]'
    )
    this.clearButton = addClearInputDOMButtonEventListener(
      document,
      'button[data-type = clear]'
    )
    this.deleteButton = addDeleteInputDOMButtonEventListener(
      document,
      'button[data-type = delete]'
    )
    this.commaButton = addCommaInputDOMButtonEventListener(
      document,
      'button[data-type = comma]'
    )
    this.changeSignButton = addChangeSignInputDOMButtonEventListener(
      document,
      'button[data-type = changeSign]'
    )
    this.equalButton = addEqualInputDOMButtonEventListener(
      document,
      'button[data-type = equal]'
    )
  }

  updateDisplayContent(newValue) {
    this.display.updateDisplayOutput(newValue)
  }

  showErrorMessageOnDisplay(message) {
    this.display.showErrorMessageOnDisplay(message)
  }

  disableComma() {
    this.commaButton.disableDOMButton()
  }

  setEnabledDigitInputButtons(enable) {
    this.numButtons.forEach((button) => {
      if (enable) {
        button.enableDOMButton()
      } else {
        button.disableDOMButton()
      }
    })
  }

  setEnabledOperatorInputButtons(enable) {
    this.operatorButtons.forEach((button) => {
      if (enable) {
        button.enableDOMButton()
      } else {
        button.disableDOMButton()
      }
    })
  }

  setEnabledCommaInputButton(enable) {
    if (enable) {
      this.commaButton.enableDOMButton()
    } else {
      this.commaButton.disableDOMButton()
    }
  }

  setEnabledClearInputButton(enable) {
    if (enable) {
      this.clearButton.enableDOMButton()
    } else {
      this.clearButton.disableDOMButton()
    }
  }

  setEnabledDeleteInputButton(enable) {
    if (enable) {
      this.deleteButton.enableDOMButton()
    } else {
      this.deleteButton.disableDOMButton()
    }
  }

  setEnabledChangeSignInputButton(enable) {
    if (enable) {
      this.changeSignButton.enableDOMButton()
    } else {
      this.changeSignButton.disableDOMButton()
    }
  }

  setEnabledEqualInputButton(enable) {
    if (enable) {
      this.equalButton.enableDOMButton()
    } else {
      this.equalButton.disableDOMButton()
    }
  }
}
