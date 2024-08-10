class Calculator {
  private totalInput: string[] = [];

  public handleInput(input: string) {
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
    let firstOperand: string | number = "";
    let operator = "";
    let secondOperand: string | number = "";

    while (totalInput.length > 0) {
      const currentVal = totalInput.shift() as string;

      if (["÷", "×", "−", "+"].includes(currentVal)) {
        operator = currentVal;
        break;
      } else {
        firstOperand += currentVal;
      }
    }

    while (totalInput.length > 0) {
      const currentVal = totalInput.shift();

      if (currentVal === "=") {
        break;
      }

      secondOperand += currentVal;
    }

    let result: string | number;
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);

    switch (operator) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      default:
        return "Something went wrong";
    }

    const FLOATING_POINT_CORRECTION = 1000000000;

    return String(
      Math.round(result * FLOATING_POINT_CORRECTION) / FLOATING_POINT_CORRECTION
    );
  }

  public getDisplayValue() {
    if (this.totalInput[this.totalInput.length - 1] === "=") {
      const result = this.calculateResult(this.totalInput);
      this.totalInput = [];
      return result;
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
