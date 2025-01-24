
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
    return op(1, 2);
}

let a;
let b;
let op = divide;

// console.log(operate(op, 1, 2));
const display = document.querySelector(".display");
const container = document.querySelector(".container")

container.addEventListener("click", (element) => {
    const btn =  element.target.classList;
    display.textContent = display.textContent + btn;
    if (btn == "clear") {
        display.textContent = "";
    }
})
