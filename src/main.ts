import Calculator from "./calculator";
import "./styles/style.css";

const calculator = new Calculator();

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.handleInput(button.innerHTML);
    updateDisplay(calculator);
  });
});

export const updateDisplay = (calc: Calculator) => {
  const display = document.querySelector("#display") as HTMLElement;
  display.textContent = calc.getDisplayValue();
};
