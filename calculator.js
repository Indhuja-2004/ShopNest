let expression = "";

function addNumber(number) {

    expression += number;

    document.getElementById("display").value = expression;

}

function addOperator(operator) {

    expression += operator;

    document.getElementById("display").value = expression;

}

function calculate() {

    let result = eval(expression);

    document.getElementById("display").value = result;

    expression = String(result);

}

function clearCalculator() {

    expression = "";

    document.getElementById("display").value = "";

}