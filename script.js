const keys = [
    "AC", "⌫", "=",
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "−",
    "0", ".", "+"
];

const numKeys = ["0","1","2","3","4","5","6","7","8","9","."];
const operators = ["+","−","×","÷"];
const keyPad = document.querySelector("#keypad");
const resultDisplay = document.querySelector("#result");
const expressionDisplay = document.querySelector("#expression");


for (let key of keys){
    const button = document.createElement("button");
    if (numKeys.includes(key)){
        button.classList.add("number");
    }else if(operators.includes(key)){
        button.classList.add("operator");
    }else{
        button.classList.add("functional");
    }
    if (key === "×") {
        button.value = "*";
    } else if (key === "÷") {
        button.value = "/";
    } else if (key === "−") {
        button.value = "-";
    } else if (key ==="⌫"){
        button.value = "del";
    }else {
        button.value = key;
    }

    if(key === "0" || key === "="){
        button.classList.add("wide");
    }

    button.textContent = key;
    keyPad.appendChild(button);
}


let expression = {
    leftOperand : "0",
    operator : "",
    rightOperand : "",
    justEvaluated : false,
}

const symbols = {
    "+" : "+",
    "-" : "−",
    "*" : "×",
    "/" : "÷",
    ""  : "",
};

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

const operation = {
    "+" : add,
    "-" : subtract,
    "*" : multiply,
    "/" : divide,
};

function handleNums(value){
    if (expression.justEvaluated){
        expression.justEvaluated = false;
        expression.leftOperand = "";
    }

    if (expression.leftOperand === "0"){
        expression.leftOperand = value;
        return;
    } 
    if (expression.operator === ""){
        expression.leftOperand += value;
    } else expression.rightOperand += value;
}

function handleOps(value){
    expression.justEvaluated = false;
    if (expression.rightOperand !== ""){
        calculate(expression.leftOperand, expression.operator, expression.rightOperand);
    }  
    expression.operator = value;
}

function clearAll(){
    expression.leftOperand = "0";
    expression.operator = "";
    expression.rightOperand = "";
}

function calculate(a,op,b){
    if (op === "/" && b === "0"){
        alert("You can't divide by 0, silly!");
        clearAll();
        return;
    }
    expression.result = operation[op](Number(a), Number(b));
    expression.leftOperand = expression.result;
    expression.rightOperand = "";
    expression.operator = "";
}

function handleEquals(){
    if (expression.rightOperand === ""){
        return;
    }else{
        calculate(expression.leftOperand, expression.operator, expression.rightOperand);
        expression.justEvaluated = true;
    }
}



function updateDisplay(){
    resultDisplay.textContent = expression.leftOperand + symbols[expression.operator] + expression.rightOperand;
}

keyPad.addEventListener("click",(event)=>{
    const button = event.target.closest("button");
    if(!button || !keyPad.contains(button)) return;

    const value = button.value;
    if (button.classList.contains("number")) handleNums(value);
    else if (button.classList.contains("operator")) handleOps(value);
    else if (value === "=") handleEquals();
    else if (value === "AC") clearAll();
    updateDisplay();
})