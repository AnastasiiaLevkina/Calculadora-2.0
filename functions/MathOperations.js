function sum(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  let result;
  if (num2 != 0) {
    result = num1 / num2;
  } else {
    result = null;
  }
  return result;
}
