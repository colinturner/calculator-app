import fs from "fs";
import path from "path";
import Calculator from "./calculator";
import { updateDisplay } from "./main"; // Assuming updateDisplay is exported

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

  it("should show the correct display value: #1", () => {
    // Simulate some calculator input
    calculator.handleInput("1");
    calculator.handleInput("+");
    calculator.handleInput("2");

    // Update the display based on the calculator's state
    updateDisplay(calculator);

    // Check that the display is correctly updated
    expect(display.textContent).toBe("1 + 2");
  });

  it("should show the correct display value: #2", () => {
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

  it("should show the correct display value: #3", () => {
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
});
