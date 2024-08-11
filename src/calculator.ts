class Calculator {
  private totalInput: string[] = [];

  // Readonly getter for totalInput
  public getTotalInput(): ReadonlyArray<string> {
    return this.totalInput;
  }

  private invalidInput(input: string) {
    const previousInput = this.totalInput[this.totalInput.length - 1];
    const operators = ["+", "−", "×", "÷"];

    if (operators.includes(input) && operators.includes(previousInput)) {
      return true;
    }

    if (operators.includes(input) && previousInput === ".") {
      return true;
    }

    return false;
  }

  public handleInput(input: string) {
    if (this.invalidInput(input)) {
      return;
    }

    if (input === "=") {
      const result = this.calculateResult(this.totalInput);
      this.totalInput = [result];
      return;
    }

    if (input === "AC") {
      this.totalInput = [];
      return;
    }

    if (input === "CE") {
      this.totalInput.pop();
      return;
    }

    this.totalInput.push(input);
  }

  private inputRequiresSpaceBefore(val: string) {
    return ["√", "(", "%", "π", "÷", "e", "×", "−", "+"].includes(val)
      ? " "
      : "";
  }

  private inputRequiresSpaceAfter(val: string) {
    return ["√", ")", "%", "π", "÷", "e", "×", "−", "+"].includes(val)
      ? " "
      : "";
  }

  private calculateResult(totalInput: string[]): string {
    /***
     * We handle the calculation in a series of passes.
     * Let's imagine that we begin with this totalInput:
     * ["4", "+", "3", "÷", "1", ".", "5", "−", "7"]
     *
     * Pass 1: Aggregate inputs into complete numbers separated by operators
     * --> ["4", "+", "3", "÷", "1.5", "−", "7"]
     *
     * Pass 2: Evaluate multiplication and division
     * --> ["4", "+", "2", "−", "7"]
     *
     * Pass 3: Evaluate addition and subtraction
     * --> "-1"
     *
     * Celebrate!
     * ***/

    // Pass 1: Normalize input into a structured array that follows the pattern number-operator-number
    const pass1 = this.aggregateNumbersAndOperators([...totalInput]);
    console.log("Pass 1:", pass1);

    // Pass 2: Handle multiplication and division
    const pass2 = this.evaluateMultiplicationAndDivision(pass1);
    console.log("Pass 2:", pass2);

    // Pass 3: Handle addition and subtraction
    const pass3 = this.evaluateAdditionAndSubtraction(pass2);
    console.log("Pass 3:", pass3);

    return pass3;
  }

  private aggregateNumbersAndOperators(totalInput: string[]): string[] {
    const result: string[] = [];
    let currentNumber = "";

    while (totalInput.length > 0) {
      const currentVal = totalInput.shift() as string;

      if (["+", "−", "×", "÷"].includes(currentVal)) {
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
    this.totalInput.forEach(
      (val) =>
        (value = value.concat(
          `${this.inputRequiresSpaceBefore(
            val
          )}${val}${this.inputRequiresSpaceAfter(val)}`
        ))
    );
    return value;
  }
}

export default Calculator;
