
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

function evaluate(calc){
    let a = calc.splice(0, 1);
    op = calc.splice(0, 1);
    let b = calc.splice(0, 1);
    calc.unshift(operate(op, parseInt(a), parseInt(b)));

    display.textContent = `${Math.ceil(calc[0] * 1000) / 1000}`;
    reset = true;
}

let calc = [];
let op = null;

let reset = false;
let hasDecimal = false;

const display = document.querySelector(".display");
const container = document.querySelector(".container")
display.textContent = 0;

container.addEventListener("click", (element) => {
    const btn =  element.target.id;
    const classList = element.target.classList;

    if (element.target.tagName == "BUTTON"){
        if (classList == "operator"){
            //do not push if calc is empty
            if (!calc.length == 0){
                if (calc.length == 3){
                    evaluate(calc);
                    calc.push(btn);
                } else {
                    if (isNaN(calc[calc.length - 1])){//if the end is an operator, replace it
                        calc[calc.length - 1] = btn;
                    } else {
                        calc.push(btn);
                    }
                }
            }
        } else {
            switch(btn) {
                case "clear":
                    display.textContent = "";
                    calc = [];
                    break;
                case "equal":
                    if (calc.length % 2 != 0 && calc.length != 0){
                        evaluate(calc);
                    }
                    break;
                case "+/-":
                    //only change sign if there is already a number in display
                    if (!(calc.length == 0 || (isNaN(calc[calc.length - 1])))){
                        calc[calc.length - 1] = calc[calc.length - 1] * -1;
                        display.textContent = calc[calc.length - 1]
                    }
                    break;
                case ".":
                    display.textContent = display.textContent + btn;
                    break;
                default:
                    if(reset){
                        display.textContent = ""
                        calc.push(btn);
                        reset = false;
                    }else {
                        if (calc.length == 0 || (isNaN(calc[calc.length - 1]))){ //check if calc is empty or last element is operator
                            calc.push(btn);
                        } else{
                            calc[calc.length - 1] = calc[calc.length - 1] + btn;
                        }
                    }
                    display.textContent = calc[calc.length - 1];
                    break;
            }
        }
    }
})
