const numbers = document.querySelectorAll("[data-operand]");
const operators = document.querySelectorAll("[data-operator]");
const displayText = document.querySelector(".display-text");
const equalsBtn = document.querySelector("[data-equals]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");

let currNum = "";
let prevNum = "";
let isOperatorSet = "";
let captureOperation;

const appendNum = (e) => {
  let numVal;
  if (Number(e) || e === ".") {
    numVal = e.toString();
  } else {
    numVal = e.target.textContent;
  }

  if (isOperatorSet) {
    operators.forEach((operator) => {
      operator.classList.contains("pressed")
        ? operator.classList.remove("pressed")
        : null;
    });

    displayText.textContent = "";

    displayText.textContent = numVal;
    currNum = numVal;
    captureOperation = isOperatorSet;
    isOperatorSet = "";
    return;
  }

  if (displayText.textContent.length === 11) return;
  if (numVal === "." && displayText.textContent.includes(".")) return;
  if (displayText.textContent === "0") {
    displayText.textContent = numVal;
    currNum = numVal;
  } else {
    displayText.textContent += numVal;
    currNum += numVal;
  }
};

const setOperator = (e) => {
  if (isNaN(displayText.textContent)) return;
  if (captureOperation) {
    equalPressed();
  }

  let operatorVal;
  if (typeof e === "string") {
    operatorVal = e;
  } else {
    operatorVal = e.target.value;
  }

  prevNum = currNum;
  currNum = "";
  isOperatorSet = operatorVal;

  // Add 'pressed' class to desired operator
  if (prevNum && typeof e === "string") {
    operators.forEach((operator) => {
      if (operator.value === operatorVal) {
        operator.classList.add("pressed");
      }
    });
  } else {
    prevNum ? e.target.classList.add("pressed") : null;
  }
};

const equalPressed = () => {
  if (!currNum || !prevNum) return;
  switch (captureOperation) {
    case "add":
      displayText.textContent =
        add(prevNum, currNum) % 1 != 0
          ? add(prevNum, currNum).toFixed(1)
          : add(prevNum, currNum);

      currNum =
        add(prevNum, currNum) % 1 != 0
          ? add(prevNum, currNum).toFixed(1)
          : add(prevNum, currNum);
      break;
    case "subtract":
      displayText.textContent =
        subtract(prevNum, currNum) % 1 != 0
          ? subtract(prevNum, currNum).toFixed(1)
          : subtract(prevNum, currNum);

      currNum =
        subtract(prevNum, currNum) % 1 != 0
          ? subtract(prevNum, currNum).toFixed(1)
          : subtract(prevNum, currNum);
      break;
    case "multiply":
      displayText.textContent =
        multiply(prevNum, currNum) % 1 != 0
          ? multiply(
              Number(prevNum).toFixed(1),
              Number(currNum).toFixed(1)
            ).toFixed(2)
          : multiply(prevNum, currNum);

      currNum =
        multiply(prevNum, currNum) % 1 != 0
          ? multiply(prevNum, currNum).toFixed(1)
          : multiply(prevNum, currNum);
      break;
    case "divide":
      // Check if either numbers are 0 - can't divide by 0
      if (
        currNum === "0" ||
        prevNum === "0" ||
        currNum === 0 ||
        prevNum === 0
      ) {
        displayText.textContent = "80085";
        document.querySelectorAll("button:not([data-clear])").forEach((btn) => {
          btn.disabled = true;
          if (btn.classList.contains("dark-gray")) {
            btn.classList.add("dark-disabled");
          } else if (btn.classList.contains("light-gray")) {
            btn.classList.add("light-disabled");
          } else if (btn.classList.contains("orange")) {
            btn.classList.add("orange-disabled");
          }
        });
        break;
      }

      displayText.textContent =
        divide(prevNum, currNum) % 1 != 0
          ? divide(prevNum, currNum).toFixed(1)
          : divide(prevNum, currNum);

      currNum =
        divide(prevNum, currNum) % 1 != 0
          ? divide(prevNum, currNum).toFixed(1)
          : divide(prevNum, currNum);
      break;
    default:
      break;
  }

  isOperatorSet = "";
  captureOperation = "";
};

const clearDisplay = () => {
  displayText.textContent = "0";
  operators.forEach((operator) =>
    operator.classList.contains("pressed")
      ? operator.classList.remove("pressed")
      : null
  );
  document.querySelectorAll("button:not([data-clear])").forEach((btn) => {
    btn.disabled = false;
    if (btn.classList.contains("dark-disabled")) {
      btn.classList.remove("dark-disabled");
    } else if (btn.classList.contains("light-disabled")) {
      btn.classList.remove("light-disabled");
    } else if (btn.classList.contains("orange-disabled")) {
      btn.classList.remove("orange-disabled");
    }
  });
  currNum = "";
  prevNum = "";
  isOperatorSet = "";
  captureOperation;
};

const deleteNum = () => {
  if (isOperatorSet) return;
  if (displayText.textContent.length <= 0 || displayText.textContent == "0")
    return;
  if (displayText.textContent.length === 1) {
    displayText.textContent = "0";
    currNum = "0";
    return;
  }
  const displayNum = displayText.textContent.split("");
  displayNum.pop();

  displayText.textContent = displayNum.join("");
  currNum = displayNum.join("");
};

// Math functions
const add = (num1, num2) => Number(num1) + Number(num2);
const subtract = (num1, num2) => Number(num1) - Number(num2);
const multiply = (num1, num2) => Number(num1) * Number(num2);
const divide = (num1, num2) => Number(num1) / Number(num2);

// Event Listeners
numbers.forEach((number) => number.addEventListener("click", appendNum));

operators.forEach((operator) =>
  operator.addEventListener("click", setOperator)
);

equalsBtn.addEventListener("click", equalPressed);

clearBtn.addEventListener("click", clearDisplay);

deleteBtn.addEventListener("click", deleteNum);

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if ((key >= 0 && key <= 9) || key === ".") {
    appendNum(key);
    return;
  }
  switch (key) {
    case "Backspace":
      deleteNum();
      break;
    case "c":
    case "C":
      clearDisplay();
      break;
    case "+":
      setOperator("add");
      break;
    case "-":
      setOperator("subtract");
      break;
    case "*":
      setOperator("multiply");
      break;
    case "/":
      setOperator("divide");
      break;
    case "=":
      equalPressed();
      break;
    default:
      break;
  }
});
