// Add
const add = (num1, num2) => num1 + num2;

// Substract
const subtract = (num1, num2) => num1 - num2;

// Multiply
const multiply = (num1, num2) => num1 * num2;

// Divide
const divide = (num1, num2) => num1 / num2;

// Run operations
const operate = (operator, num1, num2) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return;
  }
};
