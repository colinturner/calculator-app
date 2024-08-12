class Calculator {
  private totalInput: string[] = [];
  private lastResult: string = "0"; // Store last result, so that the user can use the Ans button
  private lastInputWasEqualsSign: boolean = false;

  // Readonly getter for totalInput
  public getTotalInput(): ReadonlyArray<string> {
    return this.totalInput;
  }

  private invalidInput(
    input: string,
    previousInput: string,
    operators: string[]
  ) {
    // Can't have two operators in a row as inputs. E.g. "+" followed by another "+".
    if (operators.includes(input) && operators.includes(previousInput)) {
      return true;
    }

    // Can't have an operator such as "+" follow a "."
    if (operators.includes(input) && previousInput === ".") {
      return true;
    }

    // Can't have a %-symbol without an operator following it,
    // unless the %-symbol is the last input before "="
    if (previousInput === "%" && ![...operators, "="].includes(input)) {
      return true;
    }

    // Only allow 'Ans' after operators or opening parenthesis
    if (input === "Ans" && ![...operators, "("].includes(previousInput)) {
      return true;
    }

    // Only allow certain inputs after a result is obtained (i.e. no digits or dots)
    if (
      this.lastInputWasEqualsSign &&
      ![...operators, "%", "e", "π", "CE"].includes(input)
    ) {
      return true;
    }
    return false;
  }

  public handleInput(input: string) {
    const previousInput = this.totalInput[this.totalInput.length - 1];
    const operators = ["+", "−", "×", "÷"];

    if (this.invalidInput(input, previousInput, operators)) {
      return;
    }

    if (input === "=") {
      const result = this.calculateResult(this.totalInput);
      if (result === "NaN") {
        return;
      }
      this.lastInputWasEqualsSign = true;
      this.lastResult = result; // Store, so that user can use Ans button later
      this.totalInput = [result];
      return;
    }

    this.lastInputWasEqualsSign = false;

    if (input === "AC") {
      this.totalInput = [];
      return;
    }

    if (input === "CE") {
      this.totalInput.pop();
      return;
    }

    if (input === "Rnd") {
      if (this.totalInput.length === 0 || operators.includes(previousInput)) {
        const DECIMAL_PLACES = 6;
        const randomValue = String(
          Math.floor(Math.random() * Math.pow(10, DECIMAL_PLACES)) /
            Math.pow(10, DECIMAL_PLACES)
        );
        // Push each character (digit or dot) individually to allow the CE (backspace)
        // button to work as expected
        for (const character of randomValue) {
          this.totalInput.push(character);
        }
      }
      return;
    }

    if (input === "Ans") {
      this.totalInput.push(this.lastResult);
      return;
    }

    this.totalInput.push(input);
  }

  private inputRequiresSpaceBefore(val: string, index: number) {
    return ["÷", "×", "−", "+"].includes(val) && index !== 0 ? " " : "";
  }

  private inputRequiresSpaceAfter(val: string) {
    return ["÷", "×", "−", "+"].includes(val) ? " " : "";
  }

  private calculateResult(totalInput: string[]): string {
    /*
     * We handle the calculation in a series of passes over totalInput.
     * Focusing on just the last 3 passes, let's imagine that
     * we begin with this input heading into the first of the three passes:
     * ["4", "+", "3", "÷", "1", ".", "5", "−", "7"]
     *
     * Pass 1: Aggregate numbers and operators
     * --> ["4", "+", "3", "÷", "1.5", "−", "7"]
     *
     * Pass 2: Evaluate multiplication and division
     * --> ["4", "+", "2", "−", "7"]
     *
     * Pass 3: Evaluate addition and subtraction
     * --> "-1"
     *
     * Celebrate!
     */

    // Pass 1: Eliminate parentheses through recursion
    const pass1 = this.handleParentheses([...totalInput]);
    console.log("pass1", pass1);

    // Pass 2: Substitute special symbols for numbers and operators
    const pass2 = this.substituteSpecialSymbols(pass1);
    console.log("pass2", pass2);

    // Pass 3: Normalize input into a structured array that follows the pattern number-operator-number
    const pass3 = this.aggregateNumbersAndOperators(pass2);
    console.log("pass3", pass3);

    // Pass 4: Handle percentage symbols
    const pass4 = this.evaluatePercentages(pass3);

    // Pass 5: Handle square roots
    const pass5 = this.evaluateSquareRoots(pass4);
    console.log("pass5", pass5);

    // Pass 6: Handle multiplication and division
    const pass6 = this.evaluateMultiplicationAndDivision(pass5);
    console.log("pass6", pass6);

    // Pass 7: Handle addition and subtraction
    const pass7 = this.evaluateAdditionAndSubtraction(pass6);
    console.log("pass7", pass7);

    return pass7;
  }

  private handleParentheses(totalInput: string[]): string[] {
    const result: string[] = [];

    while (totalInput.length > 0) {
      const currentVal = totalInput.shift() as string;

      if (currentVal === "(") {
        // Start collecting the expression inside the parentheses
        const innerExpression: string[] = [];
        let depth = 1;

        while (totalInput.length > 0) {
          const nextVal = totalInput.shift() as string;
          if (nextVal === "(") {
            depth++;
          } else if (nextVal === ")") {
            depth--;
            if (depth === 0) {
              break; // End of the current parentheses scope
            }
          }
          innerExpression.push(nextVal);
        }

        // Recursively calculate the result for the inner expression
        const innerResult = this.calculateResult(innerExpression);
        result.push(innerResult); // Add the evaluated result to the main array
      } else {
        result.push(currentVal); // Push anything that's not a parenthesis
      }
    }

    return result;
  }

  private substituteSpecialSymbols(input: string[]): string[] {
    /**
     * This method eliminates the symbols 'e' and 'π'.
     * It takes an input such as:
     * [
      '4', '×', 'e',
      '+', '2', '÷', 'π'
    ]
     * and transforms it into:
     * [
        '4', '×', '2.718281828459045',
        '+', '2', '÷', '3.141592653589793'
        ]
     */
    const result: string[] = [];

    for (let i = 0; i < input.length; i++) {
      const currentVal = input[i];
      const previousVal = result[result.length - 1];
      const operators = ["+", "−", "×", "÷"];
      const specialSymbols = ["e", "π", "√"];

      if (currentVal === "π") {
        // Account for implicit multiplication, e.g. user entering "4π" instead of "4 × π"
        if (
          previousVal &&
          !operators.includes(previousVal) &&
          !specialSymbols.includes(previousVal)
        ) {
          result.push("×");
        }
        // Substitute "π" with the value of Math.PI
        result.push(String(Math.PI));
      } else if (currentVal === "e") {
        // Account for implicit multiplication, e.g. user entering "4e" instead of "4 × e"
        if (
          previousVal &&
          !operators.includes(previousVal) &&
          !specialSymbols.includes(previousVal)
        ) {
          result.push("×");
        }
        // Substitute "e" with the value of Math.E
        result.push(String(Math.E));
      } else {
        // Just push the current value if it's not one of the special symbols
        result.push(currentVal);
      }
    }

    return result;
  }

  private aggregateNumbersAndOperators(totalInput: string[]): string[] {
    const result: string[] = [];
    let currentNumber = "";

    while (totalInput.length > 0) {
      const currentVal = totalInput.shift() as string;

      if (["+", "−", "×", "÷", "√", "%"].includes(currentVal)) {
        if (currentNumber !== "") {
          result.push(currentNumber); // Push the complete number
          currentNumber = ""; // Reset for the next number
        }
        result.push(currentVal); // Push the operator
      } else {
        // Accumulate digits and decimal points into a complete number
        currentNumber += currentVal;
      }
    }

    // Push the final number, if any
    if (currentNumber !== "") {
      result.push(currentNumber);
    }

    return result;
  }

  private evaluatePercentages(input: string[]): string[] {
    const result: string[] = [];

    while (input.length > 0) {
      const currentVal = input.shift() as string;

      if (currentVal === "%") {
        const previousVal = result.pop(); // Pop the last number added to the result
        if (previousVal !== undefined) {
          const percentValue = (Number(previousVal) / 100).toString();
          result.push(percentValue);
        }
      } else {
        result.push(currentVal);
      }
    }

    return result;
  }

  private evaluateSquareRoots(input: string[]): string[] {
    const result: string[] = [];
    const operators = ["+", "−", "×", "÷"];

    while (input.length > 0) {
      const currentVal = input.shift() as string;
      const previousVal = result[result.length - 1];

      if (currentVal === "√") {
        // Insert multiplication if the previous value is not an operator or undefined (e.g., for "2√16")
        if (previousVal && !operators.includes(previousVal)) {
          result.push("×");
        }

        // Get the next value (the operand for the square root)
        const nextVal = input.shift() as string;
        const operand = Number(nextVal);
        const sqrtResult = Math.sqrt(operand);
        result.push(String(sqrtResult));
      } else {
        result.push(currentVal); // Push any other values as they are
      }
    }

    return result;
  }

  private evaluateMultiplicationAndDivision(
    aggregatedInput: string[]
  ): string[] {
    const result: string[] = [];
    let currentNumber = Number(aggregatedInput.shift() as string);

    while (aggregatedInput.length > 0) {
      const operator = aggregatedInput.shift() as string;
      const nextNumber = Number(aggregatedInput.shift() as string);

      if (["×", "÷"].includes(operator)) {
        currentNumber = this.performOperation(
          currentNumber,
          nextNumber,
          operator
        );
      } else {
        result.push(String(currentNumber)); // Push the result of the previous operation
        result.push(operator); // Push the addition/subtraction operator
        currentNumber = nextNumber; // Update current number
      }
    }

    result.push(String(currentNumber)); // Push the final result
    return result;
  }

  private evaluateAdditionAndSubtraction(input: string[]): string {
    let result = Number(input.shift() as string);

    while (input.length > 0) {
      const operator = input.shift() as string;
      const nextNumber = Number(input.shift() as string);

      result = this.performOperation(result, nextNumber, operator);
    }

    const FLOATING_POINT_CORRECTION = 100000000000;
    return String(
      Math.round(result * FLOATING_POINT_CORRECTION) / FLOATING_POINT_CORRECTION
    );
  }

  private performOperation(
    operand1: number,
    operand2: number,
    operator: string
  ): number {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "−": // Note this is a different character (the official "minus" symbol) than the more common hypen symbol used on the line below. Beware typo traps.
        return operand1 - operand2;
      case "×":
        return operand1 * operand2;
      case "÷":
        return operand1 / operand2;
      default:
        return NaN;
    }
  }

  public getDisplayValue() {
    if (!this.totalInput.length) {
      return "0";
    }

    let value = "";
    let openParenthesesCount = 0;

    this.totalInput.forEach((val, index) => {
      if (val === "(") {
        openParenthesesCount++;
      } else if (val === ")") {
        openParenthesesCount = Math.max(0, openParenthesesCount - 1);
      }

      value = value.concat(
        `${this.inputRequiresSpaceBefore(
          val,
          index
        )}${val}${this.inputRequiresSpaceAfter(val)}`
      );
    });

    // Add ghosted closing parentheses for each unmatched opening parenthesis
    for (let i = 0; i < openParenthesesCount; i++) {
      value += `<span class="ghost-parenthesis">)</span>`;
    }

    return value;
  }
}

export default Calculator;
