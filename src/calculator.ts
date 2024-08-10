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
    let firstOperand = "";
    let operator = "";
    let secondOperand = "";

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

    switch (operator) {
      case "+":
        return String(Number(firstOperand) + Number(secondOperand));
      default:
        return "Something went wrong";
    }
  }

  public getDisplayValue() {
    if (this.totalInput[this.totalInput.length - 1] === "=") {
      const result = this.calculateResult(this.totalInput);
      this.totalInput = [];
      console.log("result!!!", result);
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
    console.log("value!!!", value);
    return value;
  }
}

export default Calculator;
