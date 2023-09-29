const buttons = document.querySelectorAll("button");
const numbersDisplay = document.getElementById("numbers");
const operationsDisplay = document.getElementById("operations");

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let val = event.target.dataset;
    if (val.char) {
      handleChar(val.char);
    } else if (val.num) {
      handleNum(val.num);
    } else {
      handleDecimal(val.dec);
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

const handleDecimal = (dec) => {
  console.log(dec);

  if (endOfOperation) {
    operation = {
      a: [],
      b: [],
      operator: "",
    };
    endOfOperation = false;
  }
  if (operation.a.length === 0 && operation.operator === "") {
    operation.a.push("0");
    changeDisplay();
  }

  if (
    operation.b.length === 0 &&
    operation.a.length > 0 &&
    operation.operator != ""
  ) {
    operation.b.push("0");
    changeDisplay();
  }

  if (operation.a.length > 0 && operation.operator === "") {
    if (operation.a.includes(".")) {
      return;
    } else {
      operation.a.push(".");
      changeDisplay();
    }
  }

  if (operation.b.length > 0) {
    if (operation.b.includes(".")) {
      return;
    } else {
      operation.b.push(".");
      changeDisplay();
    }
  }
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

// Keyboard

window.addEventListener("keydown", (event) => {
  let val = event.key;
  console.log(val);

  if (Number(val) >= 0) {
    handleNum(val);
    return;
  }

  if (val === ".") {
    handleDecimal(val);
    return;
  }

  switch (val) {
    case "+":
      handleChar("plus");
      return;
    case "-":
      handleChar("sub");
      return;
    case "/":
      handleChar("div");
      return;
    case "*":
      handleChar("mult");
      return;
    case "Enter":
      handleChar("equal");
      return;
    case "=":
      handleChar("equal");
      return;
    case "Backspace":
      handleChar("ac");
      return;
    default:
      break;
  }

  return;
});
