function sum() {
  return num1 + num2;
}

function subtract() {
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
