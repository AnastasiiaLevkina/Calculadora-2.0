let num1 = 0;
let num2 = 0;
let result = 0;
let selectedOperator = "";
let selectedNum = "";

let defaultDisplayOutput = "0";
const maxDigits = 9;
const maxNum = getMaxNum(maxDigits)
const display = document.querySelector("header");
const calcDisplay = new Display(display, defaultDisplayOutput)

const numButtons = []
const operatorButtons = []
const clearButton = addClearInputDOMButtonEventListener()
const deleteButton = addDeleteInputDOMButtonEventListener()
const equalButton = addEqualInputDOMButtonEventListener()
const commaButton = addCommaInputDOMButtonEventListener()
const changeSignButton = addChangeSignInputDOMButtonEventListener()

let displayCleanNeeded = false
let hasComma = false;
let operatorClicked = false;
let reachedMaxDigits = false;
let operatorAndCommandButtonsDisabled 
let inputDigitButtonsDisabled 

main()

function main(){
  addNumberInputDOMButtonEventListener()
  addOperatorInputDOMButtonEventListener()
  executeClear() 
}

function getMaxNum(maxDigits){
  let maxNum = ""
  for(let digit = 0; digit < maxDigits; digit++){
    maxNum += "9"
  }
  return parseFloat(maxNum)
}

function enterDigit(digit){
  if(!reachedMaxDigits){
    if(digit === ","){
      if(!hasComma){
        if (selectedNum.length === 0) {
          selectedNum = "0,"
        } else {
          selectedNum += digit
        }
        hasComma = true
        commaButton.disableDOMButton()
      } 
    } else {
      selectedNum += digit
    }
    if(operatorAndCommandButtonsDisabled){
      enableOperatorAndCommandButtons()
    }
    if (!selectedNum.includes(",")) {
      if (selectedNum[0] === "-") {
        selectedNum = "-" + selectedNum.slice(2, selectedNum.length)
      }else {
        selectedNum = selectedNum.slice(1, selectedNum.length)
      }
    }
    calcDisplay.updateDisplayOutput(selectedNum)
    if (selectedNum.length === maxDigits) {
      reachedMaxDigits = true
      disableDigitInputButtons()
    }
  } 
}

function disableDigitInputButtons(){
  numButtons.forEach((button) => {
    button.disableDOMButton()
  })
  commaButton.disableDOMButton()
  if (selectedNum[0] != "-") {
    changeSignButton.disableDOMButton()
  }
  inputDigitButtonsDisabled = true
}

function enableDigitInputButtons(){
  numButtons.forEach((button) => {
    button.enableDOMButton()
  })
  commaButton.enableDOMButton()
  changeSignButton.enableDOMButton()
  inputDigitButtonsDisabled = false
}

function enableOperatorAndCommandButtons(){
  operatorButtons.forEach((button) => {
    button.enableDOMButton()
  })
  clearButton.enableDOMButton()
  deleteButton.enableDOMButton()
  equalButton.enableDOMButton()
  operatorAndCommandButtonsDisabled = false
}

function disableOperatorAndCommandButtons(){
  operatorButtons.forEach((button) => {
    button.disableDOMButton()
  })
  clearButton.disableDOMButton()
  deleteButton.disableDOMButton()
  equalButton.disableDOMButton()
  operatorAndCommandButtonsDisabled = true
}

function changeInputNumberSign(){
  if (selectedNum[0] === "-") { 
    selectedNum = selectedNum.slice(1, selectedNum.length)
    if (inputDigitButtonsDisabled) {
      enableDigitInputButtons()
      reachedMaxDigits = false
    }
  } else if (!reachedMaxDigits) {
    if (selectedNum.length === 0) {
      selectedNum = "0"
    }
    selectedNum = "-" + selectedNum
    if(selectedNum.length === maxDigits){

    }
  }
  
  calcDisplay.updateDisplayOutput(selectedNum)
  
}

function selectOperator(op){

}

function executeClear(){
  disableOperatorAndCommandButtons()
  calcDisplay.setDefaultDisplayOutput()
  enableDigitInputButtons()
  hasComma = false
  reachedMaxDigits = false
  selectedNum = ""
}

function executeDelete(){

}

function executeEqual(){

}

function sum(){
    result = String(num1 + num2);
    return result;
}

function substract(){
    result = String(num1 - num2);
    return result;
}

function multiply(){
    result = String(num1 * num2);
    return result;
}

function divide(){
    if(num2 != 0){
        result = String(num1 / num2);
    }else {
        result = "ERROR";
    }
    return result;
}

function clear(){
    num1 = 0;
    num2 = 0;
    operator = "";
    result = "";
    displayCleanNeeded = false;
    hasComma = false;
    operatorClicked = false;
    numberClicked = false; 
}

function addNumberInputDOMButtonEventListener() { 
    const buttons = document.querySelectorAll("button[data-type = number]");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let clickedNum = event.target.textContent;
        enterDigit(clickedNum);
      });
      const numButton = new Button(button);
      numButtons.push(numButton) 
    });
  }
  
  function addClearInputDOMButtonEventListener() {
    const clearButton = document.querySelector("button[data-type = clear]");
    clearButton.addEventListener("click", (event) => {
      executeClear();
    });
    const button = new Button(clearButton)
    return button
  }
  
  function addDeleteInputDOMButtonEventListener() {
    const delButton = document.querySelector("button[data-type=delete]");
    delButton.addEventListener("click", (event) => {
      executeDelete();
    });
    const button = new Button(delButton)
    return button
  }
  
  function addOperatorInputDOMButtonEventListener() {
    const operators = document.querySelectorAll("button[data-type = operator]");
    operators.forEach((button) => {
      button.addEventListener("click", (event) => {
        let clickedOp = event.target;
        selectOperator(clickedOp);
      });
      const opButton = new OperatorButton(button);
      operatorButtons.push(opButton) 
    });
  }
  
  function addEqualInputDOMButtonEventListener() {
    const equalButton = document.querySelector("button[data-type = equal]");
    equalButton.addEventListener("click", (event) => {
      executeEqual();
    });
    const button = new Button(equalButton)
    return button
  }

  function addCommaInputDOMButtonEventListener() {
    const commaButton = document.querySelector("button[data-type = comma]");
    commaButton.addEventListener("click", (event) => {
      let clickedNum = event.target.textContent;
      enterDigit(clickedNum);
    });
    const button = new Button(commaButton)
    return button
  }

  function addChangeSignInputDOMButtonEventListener() {
    const changeSignButton = document.querySelector("button[data-type = changeSign]");
    changeSignButton.addEventListener("click", (event) => {
      changeInputNumberSign()
    });
    const button = new Button(changeSignButton)
    return button
  }