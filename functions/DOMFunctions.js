function addNumberInputDOMButtonEventListener() {
  const buttons = document.querySelectorAll("button[data-type = number]");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let clickedNum = event.target.textContent;
      enterDigit(clickedNum);
    });

    const numButton = new Button(button);
    NUM_BUTTONS.push(numButton);
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
    OPERATOR_BUTTONS.set(button.textContent, opButton);
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
