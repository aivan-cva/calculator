const buttons = document.querySelectorAll("button");
const numbersDisplay = document.getElementById("numbers");
const operationsDisplay = document.getElementById("operations");

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let val = event.target.dataset;
    if (val.char) {
      handleChar(val.char);
    } else {
      handleNum(val.num);
    }
  });
});

const evaluateOperation = ({ a, b, operator }) => {
  const numA = Number(a.join(""));
  const numB = Number(b.join(""));

  switch (operator) {
    case "plus":
      return numA + numB;
    case "sub":
      return numA - numB;
    case "mult":
      return numA * numB;
    case "div":
      return numA / numB;
    default:
      break;
  }
};

let operation = {
  a: [],
  b: [],
  operator: "",
};

let endOfOperation = false;

const changeDisplay = () => {
  const OPERATORS = {
    plus: "+",
    sub: "-",
    div: "&#247;",
    mult: "&#215;",
  };

  let firstNum = operation.a.join("");
  let secondNum = operation.b.join("");
  let oper = OPERATORS[operation.operator] || "";
  let disp = `${firstNum} ${oper} ${secondNum}`;

  console.log(disp);
  numbersDisplay.innerHTML = disp;
};

const handleNum = (num) => {
  let lenghtA = operation.a.length;
  if (endOfOperation) {
    operation = {
      a: [],
      b: [],
      operator: "",
    };
    endOfOperation = false;
  }

  if (lenghtA === 0) {
    operation.a.push(num);
    changeDisplay();
    console.log(operation.a, operation.b, operation.operator);
    return;
  }
  if (lenghtA > 0 && operation.operator === "") {
    operation.a.push(num);
    changeDisplay();
    console.log(operation.a, operation.b, operation.operator);
    return;
  }
  if (lenghtA > 0 && operation.operator != "") {
    operation.b.push(num);

    changeDisplay();
    console.log(operation.a, operation.b, operation.operator);
    return;
  }
};

const handleChar = (char) => {
  // debugger
  endOfOperation = false;
  console.log(char);
  if (operation.a.length === 0 && operation.b.length === 0) {
    changeDisplay();
    console.log(operation.a, operation.b, operation.operator);
    return;
  }

  if (char === "ac") {
    operation = {
      a: [],
      b: [],
      operator: "",
    };
    changeDisplay();

    console.log(operation.a, operation.b, operation.operator);
    return;
  }

  if (char === "equal") {
    // debugger;
    if (!operation.b) {
      return;
    }
    if (operation.a && operation.b && operation.operator) {
      const result = evaluateOperation(operation);
      operation = {
        a: result.toString().split(""),
        b: [],
        operator: "",
      };
      endOfOperation = true;
      changeDisplay();
      console.log(operation.a, operation.b, operation.operator);
      return;
    }
  }

  if (
    operation.a.length > 0 &&
    operation.b.length > 0 &&
    operation.operator != ""
  ) {
    const result = evaluateOperation(operation);
    operation = {
      a: result.toString().split(""),
      b: [],
      operator: char === "equal" ? "" : char,
    };
    changeDisplay();
    console.log(operation.a, operation.b, operation.operator);
    return;
  }

  (operation.operator = char === "equal" ? "" : char), changeDisplay();
  console.log(operation.a, operation.b, operation.operator);
  return;
};
