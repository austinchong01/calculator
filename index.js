
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
    //[3, +, 4]  => [a, op, b]
    let a = calc.splice(0, 1);
    op = calc.splice(0, 1);
    let b = calc.splice(0, 1);

    //[7]
    calc.unshift(operate(op, Number(a), Number(b)));

    //round to nearest .001
    calc[0] = Math.ceil(calc[0] * 1000) / 1000

    display.textContent = calc[0];
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
                hasDecimal = false;
            }
            reset = false;
        } else {
            switch(btn) {
                case "clear":
                    display.textContent = 0;
                    calc = [];
                    hasDecimal = false;
                    break;
                case "equal":
                    if (calc.length % 2 != 0 && calc.length != 0){
                        evaluate(calc);
                    }
                    hasDecimal = false;
                    break;
                case "+/-":
                    //only change sign if there is already a number in display
                    if (!(calc.length == 0) && !(isNaN(calc[calc.length - 1]))){
                        calc[calc.length - 1] = -1 * Math.ceil(calc[calc.length - 1] * 1000) / 1000;
                        display.textContent = calc[calc.length - 1];
                    }
                    break;
                case ".":
                    if (!hasDecimal){
                        if (calc.length == 0 || (isNaN(calc[calc.length - 1]))){
                            calc.push("0.");
                            display.textContent = "0.";
                        } else {
                            calc[calc.length - 1] = calc[calc.length - 1] + btn;
                            display.textContent = display.textContent + btn;
                        }
                        hasDecimal = true;
                    }
                    break;
                default:
                    if(reset){
                        //remove element, reset calc array
                        calc.shift();
                        calc.push(btn);
                        display.textContent = ""

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
