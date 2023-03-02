const numbers = document.querySelectorAll("[data-operand]");
const operators = document.querySelectorAll("[data-operator]");
const displayText = document.querySelector(".display-text");
const prev = document.querySelector(".prev-num");

let currNum = "";
let prevNum = "";
let isOperatorSet = false;

const appendNum = (e) => {
  if (isOperatorSet) {
    displayText.textContent = "";
    currNum = "";

    displayText.textContent = e.target.textContent;
    currNum = e.target.textContent;

    isOperatorSet = false;
    return;
  }

  if (displayText.textContent.length === 11) return;
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
  prev.textContent = prevNum;
  isOperatorSet = true;
};

numbers.forEach((number) => number.addEventListener("click", appendNum));

operators.forEach((operator) =>
  operator.addEventListener("click", setOperator)
);
