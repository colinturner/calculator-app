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

  private calculateResult(totalInput: string[]) {
    // Holds the running result
    let operand1: number | null = null;
    // Accumulates digits and dots for the next operand
    let operand2: string | number = "";
    let operator = "";

    const FLOATING_POINT_CORRECTION = 100000000000;

    while (totalInput.length > 0) {
      const currentVal = totalInput.shift() as string; // *[1] Grab the first value from totalInput

      // Skip down if it's not an operator
      if (["÷", "×", "−", "+"].includes(currentVal)) {
        // Indicates that the first operator has been encountered
        if (operand1 === null) {
          operand1 = Number(operand2);
        } else {
          // Our args here are:
          // operand1: the accumulated result until now
          // operand2: the new number we want to meld in to the result
          // operator: the previously-stored operator
          operand1 = this.performOperation(
            operand1,
            Number(operand2),
            operator
          );
        }

        // Set the new operator for the next run of performOperation()
        operator = currentVal;
        operand2 = ""; // Reset operand2 to begin accumulating digits (and possibly a dot) for the next operand
      } else if (currentVal === "=") {
        break;
      } else {
        operand2 += currentVal; // *[1] Accumulate the string value into operand2
      }
    }

    // Handle a no-operator case, such as "5 =" input. In that case, operand1 would never have been un-nulled.
    if (operand1 === null) {
      operand1 = Number(operand2);
    } else {
      // One final operation after exiting the while-loop
      operand1 = this.performOperation(operand1, Number(operand2), operator);
    }

    return String(
      Math.round(operand1 * FLOATING_POINT_CORRECTION) /
        FLOATING_POINT_CORRECTION
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
