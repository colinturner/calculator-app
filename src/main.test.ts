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
describe("Calculator Tests", () => {
  let calculator: Calculator;
  let display: HTMLElement;

  beforeEach(() => {
    // Reinitialize the calculator for each test to ensure a clean state
    calculator = new Calculator();
    display = document.querySelector("#display") as HTMLElement;
  });

  describe("Arithmetic", () => {
    describe("Addition", () => {
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

      it("#3: compute multi−digit number (preceding operator) addition", () => {
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

      it("#4: compute multi−digit number (following operator) addition", () => {
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

      it("#5: compute multi−digit number (both preceding and following the operator) addition", () => {
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
        calculator.handleInput("4");
        calculator.handleInput(".");
        calculator.handleInput("5");
        calculator.handleInput("+");
        calculator.handleInput("6");
        calculator.handleInput("+");
        calculator.handleInput("7");
        calculator.handleInput(".");
        calculator.handleInput("8");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("24.3");
      });
    });

    describe("Subtraction", () => {
      it("#1: simple subtraction with single digits", () => {
        // Simulate some calculator input
        calculator.handleInput("1");
        calculator.handleInput("−");
        calculator.handleInput("2");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("-1");
      });
      it("#2: chain subtraction", () => {
        // Simulate some calculator input
        calculator.handleInput("10");
        calculator.handleInput("−");
        calculator.handleInput("2");
        calculator.handleInput("−");
        calculator.handleInput("3");
        calculator.handleInput(".");
        calculator.handleInput("4");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("4.6");
      });
    });

    describe("Multiplication", () => {
      it("#1: simple multiplication", () => {
        // Simulate some calculator input
        calculator.handleInput("6");
        calculator.handleInput("×");
        calculator.handleInput("3");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("18");
      });

      it("#2: decimal multiplication", () => {
        // Simulate some calculator input
        calculator.handleInput("6");
        calculator.handleInput(".");
        calculator.handleInput("2");
        calculator.handleInput("1");
        calculator.handleInput("×");
        calculator.handleInput("3");
        calculator.handleInput("6");
        calculator.handleInput(".");
        calculator.handleInput("8");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("228.528");
      });
    });

    describe("Division", () => {
      it("#1: simple division", () => {
        // Simulate some calculator input
        calculator.handleInput("6");
        calculator.handleInput("÷");
        calculator.handleInput("3");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("2");
      });

      it("#2: decimal division", () => {
        // Simulate some calculator input
        calculator.handleInput("6");
        calculator.handleInput(".");
        calculator.handleInput("2");
        calculator.handleInput("1");
        calculator.handleInput("÷");
        calculator.handleInput("3");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("2.07");
      });

      it("#3: division with non−terminating decimal result that truncates at 11 decimal places", () => {
        // Simulate some calculator input
        calculator.handleInput("1");
        calculator.handleInput("3");
        calculator.handleInput("÷");
        calculator.handleInput("7");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("1.85714285714");
      });
    });

    describe("Combined operator types", () => {
      it("#1: addition and subtraction", () => {
        // Simulate some calculator input
        calculator.handleInput("1");
        calculator.handleInput("+");
        calculator.handleInput("2");
        calculator.handleInput("−");
        calculator.handleInput("5");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("-2");
      });

      it("#2: multiplication and division", () => {
        // Simulate some calculator input
        calculator.handleInput("3");
        calculator.handleInput("÷");
        calculator.handleInput("1");
        calculator.handleInput(".");
        calculator.handleInput("4");
        calculator.handleInput("×");
        calculator.handleInput("5");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("10.71428571429");
      });

      it("#3: respects the order of operations between addition, subtraction, multiplication, and division", () => {
        // Simulate some calculator input
        calculator.handleInput("3");
        calculator.handleInput("+");
        calculator.handleInput("2");
        calculator.handleInput("÷");
        calculator.handleInput("5");
        calculator.handleInput(".");
        calculator.handleInput("7");
        calculator.handleInput("−");
        calculator.handleInput("2");
        calculator.handleInput("×");
        calculator.handleInput("8");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("-12.64912280702");
      });
    });

    describe("Parentheses", () => {
      it("#1: handles parentheses", () => {
        // Simulate some calculator input
        calculator.handleInput("(");
        calculator.handleInput("3");
        calculator.handleInput("+");
        calculator.handleInput("2");
        calculator.handleInput(")");
        calculator.handleInput("×");
        calculator.handleInput("4");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("20");
      });

      it("#2: handles nested parentheses", () => {
        // Simulate some calculator input
        calculator.handleInput("(");
        calculator.handleInput("(");
        calculator.handleInput("3");
        calculator.handleInput("+");
        calculator.handleInput("(");
        calculator.handleInput("8");
        calculator.handleInput("÷");
        calculator.handleInput("2");
        calculator.handleInput("0");
        calculator.handleInput(".");
        calculator.handleInput("7");
        calculator.handleInput(")");
        calculator.handleInput(")");
        calculator.handleInput("×");
        calculator.handleInput("5");
        calculator.handleInput(".");
        calculator.handleInput("1");
        calculator.handleInput(")");
        calculator.handleInput("−");
        calculator.handleInput("1");
        calculator.handleInput("2");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("5.27101449275");
      });

      it("#1: handles parentheses (expression not beginning with parentheses)", () => {
        // Simulate some calculator input
        calculator.handleInput("5");
        calculator.handleInput("+");
        calculator.handleInput("(");
        calculator.handleInput("3");
        calculator.handleInput("+");
        calculator.handleInput("2");
        calculator.handleInput(")");
        calculator.handleInput("×");
        calculator.handleInput("4");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("25");
      });
    });

    describe("Special symbols", () => {
      it("#1: handles the %-symbol", () => {
        // Simulate some calculator input
        calculator.handleInput("6");
        calculator.handleInput("%");
        calculator.handleInput("×");
        calculator.handleInput("5");
        calculator.handleInput("0");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("3");
      });

      it("#2: handles the π-symbol", () => {
        // Simulate some calculator input
        calculator.handleInput("6");
        calculator.handleInput("×");
        calculator.handleInput("π");
        calculator.handleInput("+");
        calculator.handleInput("1");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("19.84955592154");
      });

      it("#3: handles the e-symbol", () => {
        // Simulate some calculator input
        calculator.handleInput("4");
        calculator.handleInput("×");
        calculator.handleInput("e");
        calculator.handleInput("+");
        calculator.handleInput("2");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("12.87312731384");
      });

      it("#4: handles multiple special symbols at once", () => {
        // Simulate some calculator input
        calculator.handleInput("4");
        calculator.handleInput("×");
        calculator.handleInput("e");
        calculator.handleInput("+");
        calculator.handleInput("2");
        calculator.handleInput("%");
        calculator.handleInput("÷");
        calculator.handleInput("π");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("10.87949351156");
      });

      it("#5: correctly infers implicit multiplication with e-symbol", () => {
        // Simulate some calculator input
        calculator.handleInput("4");
        calculator.handleInput("e");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("10.87312731384");
      });

      it("#6: correctly infers implicit multiplication with π-symbol", () => {
        // Simulate some calculator input
        calculator.handleInput("4");
        calculator.handleInput("π");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("12.56637061436");
      });
    });

    describe("Miscellaneous", () => {
      it("#1: handle a no−operator input", () => {
        // Simulate some calculator input
        calculator.handleInput("5");
        calculator.handleInput("=");

        // Update the display based on the calculator's state
        updateDisplay(calculator);

        // Check that the display is correctly updated
        expect(display.textContent).toBe("5");
      });
    });
  });

  describe("AC/CE buttons", () => {
    it("#1: handle AC button", () => {
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

    it("#2: alternate AC/CE button", () => {
      const clearButton = document.querySelector("#clearButton") as HTMLElement;
      // Simulate some calculator input
      calculator.handleInput("1");
      calculator.handleInput("+");
      calculator.handleInput("2");

      updateClearButton(calculator);

      // Check that the display is correctly updated
      expect(clearButton.textContent).toBe("CE");
    });

    it("#3: CE button acts as a backspace key", () => {
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
    it("#4: display 0 after hitting CE button all the way back", () => {
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

  describe("User input validation", () => {
    it("#1: prevent two operators being input in immediate succession", () => {
      // Simulate some calculator input
      calculator.handleInput("1");
      calculator.handleInput("+");
      calculator.handleInput("+");

      // Update the display based on the calculator's state
      updateDisplay(calculator);

      // Check that the display is correctly updated
      expect(display.textContent).toBe("1 + ");
    });

    it("#2: prevent two operators being input in immediate succession", () => {
      // Simulate some calculator input
      calculator.handleInput("1");
      calculator.handleInput("+");
      calculator.handleInput("−");

      // Update the display based on the calculator's state
      updateDisplay(calculator);

      // Check that the display is correctly updated
      expect(display.textContent).toBe("1 + ");
    });

    it("#3: prevent two operators being input in immediate succession", () => {
      // Simulate some calculator input
      calculator.handleInput("1");
      calculator.handleInput("+");
      calculator.handleInput("÷");

      // Update the display based on the calculator's state
      updateDisplay(calculator);

      // Check that the display is correctly updated
      expect(display.textContent).toBe("1 + ");
    });

    it("#4: prevent two operators being input in immediate succession", () => {
      // Simulate some calculator input
      calculator.handleInput("1");
      calculator.handleInput("+");
      calculator.handleInput("×");

      // Update the display based on the calculator's state
      updateDisplay(calculator);

      // Check that the display is correctly updated
      expect(display.textContent).toBe("1 + ");
    });

    it("#5: allow dot input following operator input", () => {
      // Simulate some calculator input
      calculator.handleInput("1");
      calculator.handleInput("+");
      calculator.handleInput(".");
      calculator.handleInput("2");

      // Update the display based on the calculator's state
      updateDisplay(calculator);

      // Check that the display is correctly updated
      expect(display.textContent).toBe("1 + .2");
    });

    it("#6: skip operator input following dot input", () => {
      // Simulate some calculator input
      calculator.handleInput("1");
      calculator.handleInput(".");
      calculator.handleInput("+");
      calculator.handleInput("2");

      // Update the display based on the calculator's state
      updateDisplay(calculator);

      // Check that the display is correctly updated
      expect(display.textContent).toBe("1.2");
    });

    it("#6: prevent computation/display of incoherent result", () => {
      // Simulate some calculator input
      calculator.handleInput("(");
      calculator.handleInput("3");
      calculator.handleInput("×");
      calculator.handleInput("=");

      // Update the display based on the calculator's state
      updateDisplay(calculator);

      // Check that the display is correctly updated
      expect(display.textContent).toBe("(3 × ");
    });
  });
});
