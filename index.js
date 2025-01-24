
function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function mult(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(op, a, b){
    if (op == "+") op = add;
    if (op == "-") op = sub;
    if (op == "*") op = mult;
    if (op == "/") op = divide;
    return op(a, b);
}

let a;
let b;
let op;
let reset = false;

// console.log(operate(op, 1, 2));
const display = document.querySelector(".display");
const container = document.querySelector(".container")

container.addEventListener("click", (element) => {
    const btn =  element.target.id;
    const classList = element.target.classList;
    if (element.target.tagName == "BUTTON"){
        if (btn == "clear") {
            display.textContent = "";
        } else if (classList == "operator"){
            a = display.textContent;
            op = btn;
            display.textContent = "";
        } else if (btn == "="){
            b = display.textContent;
            display.textContent = operate(op, a, b);
            reset = true;
        } else {
            if (reset){
                display.textContent = ""
            }
            display.textContent = display.textContent + btn;
        }
    }
})
