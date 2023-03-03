const numbers = document.querySelectorAll("[data-operand]");
const operators = document.querySelectorAll("[data-operator]");
const displayText = document.querySelector(".display-text");
const equalsBtn = document.querySelector("[data-equals]");

let currNum = "";
let prevNum = "";
let isOperatorSet = "";
let captureOperation;

const appendNum = (e) => {
  if (isOperatorSet) {
    operators.forEach((operator) => {
      operator.classList.contains("pressed")
        ? operator.classList.remove("pressed")
        : null;
    });

    displayText.textContent = "";

    displayText.textContent = e.target.textContent;
    currNum = e.target.textContent;
    captureOperation = isOperatorSet;
    isOperatorSet = "";
    return;
  }

  if (displayText.textContent.length === 11) return;
  if (e.target.textContent === "." && displayText.textContent.includes("."))
    return;
  if (displayText.textContent === "0") {
    displayText.textContent = e.target.textContent;
    currNum = e.target.textContent;
  } else {
    displayText.textContent += e.target.textContent;
    currNum += e.target.textContent;
  }
};

const setOperator = (e) => {
  prevNum = Number(currNum);
  currNum = "";
  isOperatorSet = e.target.value;

  // Add 'pressed' class to desired operator
  prevNum ? e.target.classList.add("pressed") : null;
};

const equalPressed = (e) => {
  if (!currNum || !prevNum) return;
  switch (captureOperation) {
    case "add":
      displayText.textContent =
        add(prevNum, currNum) % 1 != 0
          ? add(prevNum, currNum).toFixed(1)
          : add(prevNum, currNum);
      break;
    case "subtract":
      displayText.textContent = subtract(prevNum, currNum).toFixed(1);
      break;
    case "multiply":
      displayText.textContent = multiply(prevNum, currNum).toFixed(1);
      break;
    case "divide":
      displayText.textContent = divide(prevNum, currNum).toFixed(1);
      break;
  }
};

const add = (num1, num2) => Number(num1) + Number(num2);

const subtract = (num1, num2) => Number(num1) - Number(num2);

const multiply = (num1, num2) => Number(num1) * Number(num2);

const divide = (num1, num2) => Number(num1) / Number(num2);

numbers.forEach((number) => number.addEventListener("click", appendNum));

operators.forEach((operator) =>
  operator.addEventListener("click", setOperator)
);

equalsBtn.addEventListener("click", equalPressed);
