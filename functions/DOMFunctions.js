function addDigitsInputDOMButtonEventListenerList(document, query) {
  let buttonList = []
  let buttons = document.querySelectorAll(query)

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let clickedNum = event.target.textContent
      CALCULATOR_LOGIC.handleDigitInput(clickedNum)
    })

    let numButton = new Button(button)
    buttonList.push(numButton)
  })

  return buttonList
}

function addClearInputDOMButtonEventListener(document, query) {
  const clearButton = document.querySelector(query)

  clearButton.addEventListener('click', (event) => {
    CALCULATOR_LOGIC.handleClearInput()
  })

  const button = new Button(clearButton)
  return button
}

function addDeleteInputDOMButtonEventListener(document, query) {
  const delButton = document.querySelector(query)

  delButton.addEventListener('click', (event) => {
    CALCULATOR_LOGIC.handleDeleteInput()
  })

  const button = new Button(delButton)
  return button
}

function addOperatorInputDOMButtonEventListenerMap(document, query) {
  let buttonMap = new Map()
  let operators = document.querySelectorAll(query)

  operators.forEach((button) => {
    button.addEventListener('click', (event) => {
      let clickedOp = event.target.textContent
      CALCULATOR_LOGIC.handleOperatorInput(clickedOp)
    })

    let opButton = new OperatorButton(button)
    buttonMap.set(button.textContent, opButton)
  })

  return buttonMap
}

function addEqualInputDOMButtonEventListener(document, query) {
  const equalButton = document.querySelector(query)

  equalButton.addEventListener('click', (event) => {
    CALCULATOR_LOGIC.handleEqualInput()
  })

  const button = new Button(equalButton)
  return button
}

function addCommaInputDOMButtonEventListener(document, query) {
  const commaButton = document.querySelector(query)

  commaButton.addEventListener('click', (event) => {
    let comma = event.target.textContent
    CALCULATOR_LOGIC.handleCommaInput(comma)
  })

  const button = new Button(commaButton)
  return button
}

function addChangeSignInputDOMButtonEventListener(document, query) {
  const changeSignButton = document.querySelector(query)

  changeSignButton.addEventListener('click', (event) => {
    CALCULATOR_LOGIC.handleChangeSignInput()
  })

  const button = new Button(changeSignButton)
  return button
}
