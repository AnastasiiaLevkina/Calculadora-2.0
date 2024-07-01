function addNumberInputDOMButtonEventListenerList(document, query) {
  let buttonList = []
  let buttons = document.querySelectorAll(query);

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let clickedNum = event.target.textContent;
      enterDigit(clickedNum);
    });

    let numButton = new Button(button);
    buttonList.push(numButton);
  });

  return buttonList
}

function addClearInputDOMButtonEventListener(document, query) {
  const clearButton = document.querySelector(query);

  clearButton.addEventListener("click", (event) => {
    executeClear();
  });

  const button = new Button(clearButton);
  return button;
}

function addDeleteInputDOMButtonEventListener(document, query) {
  const delButton = document.querySelector(query);

  delButton.addEventListener("click", (event) => {
    executeDelete();
  });

  const button = new Button(delButton);
  return button;
}

function addOperatorInputDOMButtonEventListenerMap(document, query) {
  let buttonMap = new Map()
  let operators = document.querySelectorAll(query);

  operators.forEach((button) => {
    button.addEventListener("click", (event) => {
      let clickedOp = event.target.textContent;
      selectOperator(clickedOp);
    });

    let opButton = new OperatorButton(button);
    buttonMap.set(button.textContent, opButton);
  });

  return buttonMap
}

function addEqualInputDOMButtonEventListener(document, query) {
  const equalButton = document.querySelector(query);

  equalButton.addEventListener("click", (event) => {
    executeEqual();
  });

  const button = new Button(equalButton);
  return button;
}

function addCommaInputDOMButtonEventListener(document, query) {
  const commaButton = document.querySelector(query);

  commaButton.addEventListener("click", (event) => {
    let clickedNum = event.target.textContent;
    enterDigit(clickedNum);
  });

  const button = new Button(commaButton);
  return button;
}

function addChangeSignInputDOMButtonEventListener(document, query) {
  const changeSignButton = document.querySelector(query);

  changeSignButton.addEventListener("click", (event) => {
    changeInputNumberSign();
  });

  const button = new Button(changeSignButton);
  return button;
}
