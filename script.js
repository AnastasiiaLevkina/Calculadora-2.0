let num1 = 0;
let num2 = 0;
let result = 0;
let selectedOperator = "";
let selectedNum = "";

const maxDigits = 9;
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
    printOutputAndContolLength();
  }
}

function controlInputNumberCoherency() {
  if (selectedNum.length > String(parseFloat(selectedNum)).length) {
    if (selectedNum != "-0" && !selectedNum.includes(",")) {
      if (selectedNum[0] === "-") {
        selectedNum = "-" + selectedNum.slice(2, selectedNum.length);
      } else {
        selectedNum = selectedNum.slice(1, selectedNum.length);
      }
    }
  }
}

function printOutputAndContolLength() {
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
        result = sum();
        break;
      case "-":
        result = substract();
        break;
      case "x":
        result = multiply();
        break;
      case "/":
        result = divide();
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

function sum() {
  return num1 + num2;
}

function substract() {
  return num1 - num2;
}

function multiply() {
  return num1 * num2;
}

function divide() {
  let result;
  if (num2 != 0) {
    result = num1 / num2;
  } else {
    result = null;
  }
  return result;
}

function addNumberInputDOMButtonEventListener() {
  const buttons = document.querySelectorAll("button[data-type = number]");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let clickedNum = event.target.textContent;
      enterDigit(clickedNum);
    });
    const numButton = new Button(button);
    numButtons.push(numButton);
  });
}

function addClearInputDOMButtonEventListener() {
  const clearButton = document.querySelector("button[data-type = clear]");
  clearButton.addEventListener("click", (event) => {
    executeClear();
  });
  const button = new Button(clearButton);
  return button;
}

function addDeleteInputDOMButtonEventListener() {
  const delButton = document.querySelector("button[data-type=delete]");
  delButton.addEventListener("click", (event) => {
    executeDelete();
  });
  const button = new Button(delButton);
  return button;
}

function addOperatorInputDOMButtonEventListener() {
  const operators = document.querySelectorAll("button[data-type = operator]");
  operators.forEach((button) => {
    button.addEventListener("click", (event) => {
      let clickedOp = event.target.textContent;
      selectOperator(clickedOp);
    });
    const opButton = new OperatorButton(button);
    operatorButtons.set(button.textContent, opButton);
  });
}

function addEqualInputDOMButtonEventListener() {
  const equalButton = document.querySelector("button[data-type = equal]");
  equalButton.addEventListener("click", (event) => {
    executeEqual();
  });
  const button = new Button(equalButton);
  return button;
}

function addCommaInputDOMButtonEventListener() {
  const commaButton = document.querySelector("button[data-type = comma]");
  commaButton.addEventListener("click", (event) => {
    let clickedNum = event.target.textContent;
    enterDigit(clickedNum);
  });
  const button = new Button(commaButton);
  return button;
}

function addChangeSignInputDOMButtonEventListener() {
  const changeSignButton = document.querySelector(
    "button[data-type = changeSign]"
  );
  changeSignButton.addEventListener("click", (event) => {
    changeInputNumberSign();
  });
  const button = new Button(changeSignButton);
  return button;
}
