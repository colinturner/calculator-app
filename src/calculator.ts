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
    const firstOperand = Number(totalInput.shift());
    const operator = totalInput.shift();
    const secondOperand = Number(totalInput.shift());
    switch (operator) {
      case "+":
        return String(firstOperand + secondOperand);
      default:
        return "123a";
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
