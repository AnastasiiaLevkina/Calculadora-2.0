const USER_INTERFACE = new UserInterface(document)
const CALCULATOR_STATE = new CalculatorState()
const CALCULATOR_LOGIC = new CALCULATOR_LOGIC()

function init() {
  CALCULATOR_STATE.awaitingDisplayClean = false
  CALCULATOR_STATE.isCommaButtonEnabled = true
  CALCULATOR_STATE.isOperatorButtonsEnabled = false
  CALCULATOR_STATE.isInputDigitButtonsEnabled = true
  CALCULATOR_STATE.isClearButtonEnabled = false
  CALCULATOR_STATE.isDeleteButtonEnabled = false
  CALCULATOR_STATE.isChangeSignButtonEnabled = true
  CALCULATOR_STATE.isEqualButtonEnabled = false
  CALCULATOR_STATE.mustRemoveNegativeSign = false
  CALCULATOR_STATE.mustAddNegativeSign = false
  CALCULATOR_STATE.hasNegativeSign = false
  CALCULATOR_STATE.updateCalculatorInterfaceState()
}
