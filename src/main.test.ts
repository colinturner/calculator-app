import fs from "fs";
import path from "path";
import Calculator from "./calculator";
import { updateDisplay, updateClearButton } from "./main"; // Assuming updateDisplay is exported

// Read the index.html file and load it into the DOM
beforeEach(() => {
  const html = fs.readFileSync(
    path.resolve(__dirname, "../index.html"),
    "utf8"
  );
  document.documentElement.innerHTML = html;
});

// Test case for updateDisplay()
describe("updateDisplay function", () => {
  let calculator: Calculator;
  let display: HTMLElement;

  beforeEach(() => {
    // Reinitialize the calculator for each test to ensure a clean state
    calculator = new Calculator();
    display = document.querySelector("#display") as HTMLElement;
  });

  it("#1: display simple addition with single digits", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("1 + 2");
  });

  it("#2: compute simple addition with single digits", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");
    calculator.handleInput("=");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("3");
  });

  it("#3: compute multi-digit number (preceding operator) addition", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("2");
    calculator.handleInput("+");
    calculator.handleInput("3");
    calculator.handleInput("=");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("15");
  });

  it("#4: compute multi-digit number (following operator) addition", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");
    calculator.handleInput("3");
    calculator.handleInput("=");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("24");
  });

  it("#5: compute multi-digit number (both preceding and following the operator) addition", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("2");
    calculator.handleInput("+");
    calculator.handleInput("3");
    calculator.handleInput("4");
    calculator.handleInput("=");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("46");
  });

  it("#6: handle decimal numbers in addition", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("2");
    calculator.handleInput(".");
    calculator.handleInput("3");
    calculator.handleInput("+");
    calculator.handleInput("4");
    calculator.handleInput(".");
    calculator.handleInput("5");
    calculator.handleInput("=");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("16.8");
  });

  it("#7: handle floating point precision errors in addition", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("2");
    calculator.handleInput(".");
    calculator.handleInput("3");
    calculator.handleInput("+");
    calculator.handleInput("3");
    calculator.handleInput(".");
    calculator.handleInput("4");
    calculator.handleInput("=");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("15.7");
  });

  it("#8: handle multiple addition operators", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");
    calculator.handleInput("+");
    calculator.handleInput("3");
    calculator.handleInput("=");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("6");
  });

  it("#9: handle multiple addition operators (with decimals)", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");
    calculator.handleInput("+");
    calculator.handleInput("3");
    calculator.handleInput("+");
    calculator.handleInput("4.5");
    calculator.handleInput("+");
    calculator.handleInput("6");
    calculator.handleInput("+");
    calculator.handleInput("7.8");
    calculator.handleInput("=");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("24.3");
  });

  it("#10: handle a no-operator input", () => {
    // Simulate some calculator input
    calculator.handleInput("5");
    calculator.handleInput("=");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("5");
  });

  it("#11: handle AC button", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");
    calculator.handleInput("=");
    calculator.handleInput("AC");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("0");
  });

  it("#12: alternate AC/CE button", () => {
    const clearButton = document.querySelector("#clearButton") as HTMLElement;
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");

    updateClearButton(calculator);

    // Check that the display is correctly updated
    expect(clearButton.textContent).toBe("CE");
  });

  it("#13: CE button acts as a backspace key", () => {
    const clearButton = document.querySelector("#clearButton") as HTMLElement;
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");

    updateClearButton(calculator);
    calculator.handleInput("CE");
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("1 + ");
  });
  it("#14: display 0 after hitting CE button all the way back", () => {
    const clearButton = document.querySelector("#clearButton") as HTMLElement;
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");

    updateClearButton(calculator);

    // Hit backspace ("CE") three times
    calculator.handleInput("CE");
    updateDisplay(calculator);

    calculator.handleInput("CE");
    updateDisplay(calculator);

    calculator.handleInput("CE");
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("0");
  });
});
