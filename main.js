const buttons = document.querySelectorAll("button");

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

const handleNum = (num) => {
  let lenghtA = operation.a.length;

  if (lenghtA === 0) {
    operation.a.push(num);
  }
  if (lenghtA > 0 && operation.operator === "") {
    operation.a.push(num);
  }
  if (lenghtA > 0 && operation.operator != "") {
    operation.b.push(num);
  }

  console.log(operation.a, operation.b, operation.operator);
};

const handleChar = (char) => {
  // debugger
  console.log(char);
  if (operation.a.length === 0 && operation.b.length === 0) {
    console.log(operation.a, operation.b, operation.operator);
    return;
  }

  if (char === "ac") {
    operation = {
      a: [],
      b: [],
      operator: "",
    };
    console.log(operation.a, operation.b, operation.operator);
    return;
  }

  if (char === "equal") {
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
      operator: char,
    };
    console.log(operation.a, operation.b, operation.operator);
    return;
  }

  operation.operator = char;
  console.log(operation.a, operation.b, operation.operator);
  return;
};
