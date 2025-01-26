
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
    if (b == 0){
        return NaN;
    }
    return a / b;
}

function operate(op, a, b){
    if (op == "+") op = add;
    if (op == "-") op = sub;
    if (op == "*") op = mult;
    if (op == "/") op = divide;
    return op(a, b);
}

let calc = [];
let op = null;

let reset = false;
let hasDecimal = false;

const display = document.querySelector(".display");
const container = document.querySelector(".container")

container.addEventListener("click", (element) => {
    const btn =  element.target.id;
    const classList = element.target.classList;

    if (element.target.tagName == "BUTTON"){
        if (classList == "operator"){
            calc.push(display.textContent);
            calc.push(btn)
            display.textContent = "";
        } else {
            switch(btn) {
                case "clear":
                    display.textContent = "";
                    calc = [];
                    break;
                case "equal":
                    calc.push(display.textContent);
                    // if (isValid(calc)){
                    //     display.textContent = operate(op, a, b);
                    //     reset = true;
                    // } else {
                    //     calc = [];
                    //     display.textContent = "ERROR";
                    // }
                    
                    while (calc.length != 1){
                        console.log(calc);
                        a = calc.splice(0, 1);
                        op = calc.splice(0, 1);
                        b = calc.splice(0, 1);
                        calc.unshift(operate(op, a, b));
                    }
                    display.textContent = `${calc[0]}`;
                    calc = [];
                    break;
                case "+/-":
                    if (display.textContent > 0 || display.textContent == ""){
                        display.textContent = "-" + display.textContent;
                    } else {
                        display.textContent = -1 * display.textContent;
                    }
                    break;
                case ".":
                    display.textContent = display.textContent + btn;
                    break;
                default:
                    if(reset){
                        display.textContent = ""
                        reset = false;
                    }
                    display.textContent = display.textContent + btn;
                    break;
            }
        }
    }
})
