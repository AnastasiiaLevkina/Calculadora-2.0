let num1 = 0;
let num2 = 0;
let result = 0;
let selectedOperator = "";
let selectedNum = "";

const MAX_DIGITS = 9;
const DISPLAY = document.querySelector("#display");
const CALC_DISPLAY = new Display(display);

const NUM_BUTTONS = [];
const OPERATOR_BUTTONS = new Map();
const CLEAR_BUTTON = addClearInputDOMButtonEventListener();
const DELETE_BUTTON = addDeleteInputDOMButtonEventListener();
const EQUAL_BUTTON = addEqualInputDOMButtonEventListener();
const COMMA_BUTTON = addCommaInputDOMButtonEventListener();
const CHANGE_SIGN_BUTTON = addChangeSignInputDOMButtonEventListener();

let displayCleanNeeded;
let hasComma;
let reachedMaxDigits;
let finishedInputFirstNumber;
let operatorAndCommandButtonsDisabled;
let inputDigitButtonsDisabled;

main();

function main() {
  addNumberInputDOMButtonEventListener();
  addOperatorInputDOMButtonEventListener();

  executeClear();
}

function enterDigit(digit) {
  if (displayCleanNeeded) {
    selectedNum = "";
    displayCleanNeeded = false;
  }

  if (!reachedMaxDigits) {
    if (digit === ",") {
      handleCommaInput();
    } else {
      selectedNum += digit;
    }

    if (operatorAndCommandButtonsDisabled) {
      enableOperatorAndCommandButtons();
    }

    controlInputNumberCoherency();
    printOutputAndControlLength();
  }
}

function controlInputNumberCoherency() {
  const hasExtraCharacters =
    selectedNum.length > String(parseFloat(selectedNum)).length;
  const isNotNegativeZero = selectedNum != "-0";
  const hasNoDecimals = !selectedNum.includes(",");

  if (hasExtraCharacters && isNotNegativeZero && hasNoDecimals) {
    if (selectedNum[0] === "-") {
      selectedNum = "-" + selectedNum.slice(2, selectedNum.length);
    } else {
      selectedNum = selectedNum.slice(1, selectedNum.length);
    }
  }
}

function printOutputAndControlLength() {
  CALC_DISPLAY.updateDisplayOutput(selectedNum);

  if (selectedNum.length === MAX_DIGITS) {
    reachedMaxDigits = true;
    disableDigitInputButtons();
  }
}

function handleCommaInput() {
  if (!hasComma) {
    if (selectedNum.length === 0) {
      selectedNum = "0,";
    } else {
      selectedNum += ",";
    }

    hasComma = true;
    commaButton.disableDOMButton();
  }
}

function disableDigitInputButtons() {
  NUM_BUTTONS.forEach((button) => {
    button.disableDOMButton();
  });

  commaButton.disableDOMButton();

  if (selectedNum[0] != "-") {
    changeSignButton.disableDOMButton();
  }

  inputDigitButtonsDisabled = true;
}

function enableDigitInputButtons() {
  NUM_BUTTONS.forEach((button) => {
    button.enableDOMButton();
  });

  commaButton.enableDOMButton();
  changeSignButton.enableDOMButton();
  inputDigitButtonsDisabled = false;
}

function enableOperatorAndCommandButtons() {
  OPERATOR_BUTTONS.forEach((button) => {
    button.enableDOMButton();
  });

  clearButton.enableDOMButton();
  deleteButton.enableDOMButton();
  equalButton.enableDOMButton();
  operatorAndCommandButtonsDisabled = false;
}

function disableOperatorAndCommandButtons(disableClear) {
  OPERATOR_BUTTONS.forEach((button) => {
    button.disableDOMButton();
  });

  if (disableClear) {
    clearButton.disableDOMButton();
  }

  deleteButton.disableDOMButton();
  equalButton.disableDOMButton();
  operatorAndCommandButtonsDisabled = true;
}

function changeInputNumberSign() {
  if (displayCleanNeeded) {
    selectedNum = "";
    displayCleanNeeded = false;
  }

  if (selectedNum[0] === "-") {
    selectedNum = selectedNum.slice(1, selectedNum.length);

    if (inputDigitButtonsDisabled) {
      enableDigitInputButtons();
      reachedMaxDigits = false;
    }
  } else if (!reachedMaxDigits) {
    if (selectedNum.length === 0) {
      selectedNum = "0";
    }

    selectedNum = "-" + selectedNum;

    if (selectedNum.length === MAX_DIGITS) {
      reachedMaxDigits = true;
      disableDigitInputButtons();
    }
  }

  CALC_DISPLAY.updateDisplayOutput(selectedNum);
}

function selectOperator(op) {
  if (!finishedInputFirstNumber) {
    num1 = parseFloat(selectedNum.replace(",", "."));
    displayCleanNeeded = true;
    reachedMaxDigits = false;
    finishedInputFirstNumber = true;
    hasComma = false;
    commaButton.enableDOMButton();
    enableDigitInputButtons();
  }

  if (selectedOperator === "") {
    selectedOperator = op;
    OPERATOR_BUTTONS.get(op).highlightDOMButton();
  } else if (selectedOperator === op) {
    selectedOperator = "";
    OPERATOR_BUTTONS.get(op).removeHighlightDOMButton();
  }
}

function executeClear() {
  disableOperatorAndCommandButtons(true);
  enableDigitInputButtons();
  selectedNum = "0";
  CALC_DISPLAY.updateDisplayOutput(selectedNum);

  if (selectedOperator != "") {
    OPERATOR_BUTTONS.get(selectedOperator).removeHighlightDOMButton();
    selectedOperator = "";
  }

  hasComma = false;
  reachedMaxDigits = false;
  finishedInputFirstNumber = false;
  displayCleanNeeded = false;
}

function executeDelete() {
  if (selectedNum.length > 0 && selectedNum != "-0") {
    selectedNum = selectedNum.slice(0, selectedNum.length - 1);

    if (!selectedNum.includes(",") && hasComma) {
      hasComma = false;
      commaButton.enableDOMButton();
    }

    if (selectedNum.length === 0) {
      selectedNum = "0";
    } else if (selectedNum === "-") {
      selectedNum = "-0";
    }

    CALC_DISPLAY.updateDisplayOutput(selectedNum);

    if (inputDigitButtonsDisabled) {
      enableDigitInputButtons();
      reachedMaxDigits = false;
    }
  }
}

function executeEqual() {
  let operationExecuted = true;

  if (finishedInputFirstNumber && !displayCleanNeeded) {
    num2 = parseFloat(selectedNum.replace(",", "."));

    switch (selectedOperator) {
      case "+":
        result = sum(num1, num2);
        break;
      case "-":
        result = subtract(num1, num2);
        break;
      case "x":
        result = multiply(num1, num2);
        break;
      case "/":
        result = divide(num1, num2);
        break;
      default:
        result = parseFloat(selectedNum);
        operationExecuted = false;
        break;
    }
  } else {
    result = parseFloat(selectedNum.replace(",", "."));
    operationExecuted = false;
  }

  printFormattedOutput(result);

  if (operationExecuted) {
    blockAllButtonsButClear();
  }
}

function printFormattedOutput(result) {
  if (result != null) {
    let formattedResult = String(result).replace(".", ",");

    if (formattedResult.length > MAX_DIGITS) {
      formattedResult = String(result.toExponential(2).replace(".", ","));
    }

    CALC_DISPLAY.updateDisplayOutput(formattedResult);
  } else {
    CALC_DISPLAY.showErrorMessage("ERROR");
  }
}

function blockAllButtonsButClear() {
  disableDigitInputButtons();
  disableOperatorAndCommandButtons(false);
  changeSignButton.disableDOMButton();
}
