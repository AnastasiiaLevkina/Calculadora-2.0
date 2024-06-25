let num1 = 0;
let num2 = 0;
let operator = "";
let result = "";
let screen = 0;
const MAX_DIGITS = 9;
const MAX_NUM = 999999999;
const DISPLAY = document.querySelector("header");
let displayCleanNeeded = false;
let hasComma = false;
let operatorClicked = false;
let numberClicked = false;

function addNum(){

}

function addComma(){

}

function addOperator(){

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
    const buttons = document.querySelectorAll("button.num");
    console.log("input number");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let clickedNum = event.target.textContent;
        inputNumber(clickedNum);
      });
    });
  }
  
  function addClearInputDOMButtonEventListener() {
    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", (event) => {
      onClearInput();
    });
  }
  
  function addDeleteInputDOMButtonEventListener() {
    const delButton = document.getElementById("delButton");
    delButton.addEventListener("click", (event) => {
      onDeleteInput();
    });
  }
  
  function addOperatorInputDOMButtonEventListener() {
    const operators = document.querySelectorAll("button.op");
    operators.forEach((button) => {
      button.addEventListener("click", (event) => {
        let clickedOp = event.target;
        inputOp(clickedOp);
      });
    });
  }
  
  function addEqualInputDOMButtonEventListener() {
    const equalButton = document.getElementById("equalButton");
    equalButton.addEventListener("click", (event) => {
      onEqualInput();
    });
  }