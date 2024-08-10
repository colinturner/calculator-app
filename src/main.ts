import Calculator from "./calculator";
import "./styles/style.css";

const calculator = new Calculator();

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.handleInput(button.innerHTML);
    updateDisplay(calculator);
    updateClearButton(calculator);
  });
});

export const updateDisplay = (calc: Calculator) => {
  const display = document.querySelector("#display") as HTMLElement;
  display.textContent = calc.getDisplayValue();
};

export const updateClearButton = (calc: Calculator) => {
  const clearButton = document.querySelector("#clearButton") as HTMLElement;
  if (calc.getTotalInput().length > 0) {
    clearButton.textContent = "CE";
  } else {
    clearButton.textContent = "AC";
  }
};
