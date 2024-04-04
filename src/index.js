import Calculator from "./calculator.js";

const calculator = new Calculator();  // All it it's soposed to do is getResult and to add to expression

const clickHandler = (target) => {
    return {
        text: target.innerText,
        class: target.classList[1],
        id: target.id
    }
}

const screen = {
    expressionField: $('.expression'),
    outputField: $('.result'),
    updateExpression() {
        this.expressionField.text(calculator.expression);
    },
    updateOutput() {
        this.outputField.text(calculator.output);
    },
    clear() {
        this.updateExpression();
        this.updateOutput();
    }
}

$(".btn").on("click", (event) => {   
    const button = clickHandler(event.target);
    if (button.class == 'number' || button.class == 'operator' || button.id== 'comma') {
        calculator.expression += button.text;
        screen.updateExpression();
    } else {
        switch (button.id) {
            case 'equals':
                calculator.getResult();
                screen.updateOutput();
                calculator.clearExpression();
                break;
            case 'delete':
                calculator.delete();
                screen.updateExpression();
                break;
            case 'clear':
                calculator.clear();
                screen.clear();
                break;
            default:
                break;
        }
    }   
});


// $(window).on("keyup", (event) => {
//     console.log(event.key);
// })
