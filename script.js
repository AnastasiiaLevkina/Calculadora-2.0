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
      setEnabledOperatorAndCommandButtons(true)
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

  if (selectedNum.length === MAX_DIGITS) {
    reachedMaxDigits = true;
    setEnabledDigitInputButtons(false);
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

function setEnabledDigitInputButtons(enable) {
  numButtons.forEach((button) => {
    if (enable) {
      button.enableDOMButton();
    } else {
      button.disableDOMButton();
    }
    
  });
  if (enable) {
    commaButton.enableDOMButton();
    changeSignButton.enableDOMButton();

  } else {
    commaButton.disableDOMButton();
    if (selectedNum[0] != "-") {
      changeSignButton.disableDOMButton();
    }

  }
  inputDigitButtonsDisabled = !enable;
}

function setEnabledOperatorAndCommandButtons(enable, disableClear = false) {
  operatorButtons.forEach((button) => {
    if (enable) {
      button.enableDOMButton();
    } else {
      button.disableDOMButton();
    }
  });

  if (enable) {
    deleteButton.enableDOMButton();
    equalButton.enableDOMButton();
    clearButton.enableDOMButton();
  } else {
    deleteButton.disableDOMButton();
    equalButton.disableDOMButton();
    if (disableClear) {
    clearButton.disableDOMButton();
    }
  }
  operatorAndCommandButtonsDisabled = !enable;
}

function changeInputNumberSign() {
  if (displayCleanNeeded) {
    selectedNum = "";
    displayCleanNeeded = false;
  }

  if (selectedNum[0] === "-") {
    selectedNum = selectedNum.slice(1, selectedNum.length);

    if (inputDigitButtonsDisabled) {
      setEnabledDigitInputButtons(true);
      reachedMaxDigits = false;
    }
  } else if (!reachedMaxDigits) {
    if (selectedNum.length === 0) {
      selectedNum = "0";
    }

    selectedNum = "-" + selectedNum;

    if (selectedNum.length === MAX_DIGITS) {
      reachedMaxDigits = true;
      setEnabledDigitInputButtons(false);
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
    setEnabledDigitInputButtons(true);
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
  setEnabledOperatorAndCommandButtons(false, true);
  setEnabledDigitInputButtons(true);
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
      setEnabledDigitInputButtons(true);
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

    calcDisplay.updateDisplayOutput(formattedResult);
  } else {
    calcDisplay.showErrorMessage("ERROR");
  }
}

function blockAllButtonsButClear() {
  setEnabledDigitInputButtons(false);
  setEnabledOperatorAndCommandButtons(false)
  changeSignButton.disableDOMButton();
}
