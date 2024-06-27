let num1 = 0;
let num2 = 0;
let result = 0;
let selectedOperator = "";
let selectedNum = "";

const MAX_DIGITS = 9;
const display = document.querySelector("#display");
const calcDisplay = new Display(display);

const numButtons = [];
const operatorButtons = new Map();
const clearButton = addClearInputDOMButtonEventListener();
const deleteButton = addDeleteInputDOMButtonEventListener();
const equalButton = addEqualInputDOMButtonEventListener();
const commaButton = addCommaInputDOMButtonEventListener();
const changeSignButton = addChangeSignInputDOMButtonEventListener();

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
  calcDisplay.updateDisplayOutput(selectedNum);

  if (selectedNum.length === maxDigits) {
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
  numButtons.forEach((button) => {
    button.disableDOMButton();
  });

  commaButton.disableDOMButton();

  if (selectedNum[0] != "-") {
    changeSignButton.disableDOMButton();
  }

  inputDigitButtonsDisabled = true;
}

function enableDigitInputButtons() {
  numButtons.forEach((button) => {
    button.enableDOMButton();
  });

  commaButton.enableDOMButton();
  changeSignButton.enableDOMButton();
  inputDigitButtonsDisabled = false;
}

function enableOperatorAndCommandButtons() {
  operatorButtons.forEach((button) => {
    button.enableDOMButton();
  });

  clearButton.enableDOMButton();
  deleteButton.enableDOMButton();
  equalButton.enableDOMButton();
  operatorAndCommandButtonsDisabled = false;
}

function disableOperatorAndCommandButtons(disableClear) {
  operatorButtons.forEach((button) => {
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

    if (selectedNum.length === maxDigits) {
      reachedMaxDigits = true;
      disableDigitInputButtons();
    }
  }

  calcDisplay.updateDisplayOutput(selectedNum);
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
    operatorButtons.get(op).highlightDOMButton();
  } else if (selectedOperator === op) {
    selectedOperator = "";
    operatorButtons.get(op).removeHighlightDOMButton();
  }
}

function executeClear() {
  disableOperatorAndCommandButtons(true);
  enableDigitInputButtons();
  selectedNum = "0";
  calcDisplay.updateDisplayOutput(selectedNum);

  if (selectedOperator != "") {
    operatorButtons.get(selectedOperator).removeHighlightDOMButton();
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

    calcDisplay.updateDisplayOutput(selectedNum);

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

    if (formattedResult.length > maxDigits) {
      formattedResult = String(result.toExponential(2).replace(".", ","));
    }

    calcDisplay.updateDisplayOutput(formattedResult);
  } else {
    calcDisplay.showErrorMessage("ERROR");
  }
}

function blockAllButtonsButClear() {
  disableDigitInputButtons();
  disableOperatorAndCommandButtons(false);
  changeSignButton.disableDOMButton();
}
