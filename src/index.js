import Calculator from "./calculator.js";

const calculator = new Calculator();  // All it it's sopposed to do is getResult and to add to expression

const clickHandler = (target) => {    // Return a object holding properties of text, class, id
    return {
        text: target.innerText,
        class: target.classList[1],
        id: target.id
    }
}

const buttonPressHandler = key => {   // Return a object holding properties of text, class, id
    const validInputs = {
        number: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],    
        operator: {
            add: '+',
            subtract: '-',
            divide: '/',
            multiply: '*',
            openParenthasis: '[',
            closeParenthasis: ']'
        },
        functions: {
            'Backspace': {
                text: '',
                class: 'function',
                id: 'delete'
            },
            'c': {
                text: '',
                class: 'function',
                id: 'clear'
            },
            'Enter': {
                text: '',
                class: 'function',
                id: 'equals'
            },
            'Backspace': {
                text: '',
                class: 'function',
                id: 'delete'
            },
        }
    }
    let text, type, id;
    if (validInputs.number.includes(key)) {
        text = key;
        type = 'number';
        id = '';
    } else if (Object.values(validInputs.operator).includes(key)) {
        type = "operator";
        switch (key) {
            case validInputs.operator.multiply:
                text = calculator.operator.multiply;
                id = 'multiply';
                break;
            case validInputs.operator.divide:
                text = calculator.operator.divide;
                id = 'divide';
                break;
            case validInputs.operator.add:
                text = calculator.operator.plus;
                id = 'add';
                break;
            case validInputs.operator.subtract:
                text = calculator.operator.minus;
                id = 'subract';
                break;
            case validInputs.operator.openParenthasis:
                text = calculator.operator.openParenthasis;
                break;
            case validInputs.operator.closeParenthasis:
                text = calculator.operator.closeParenthasis;
                break;
            default:
                break;
        }
    } else if (Object.keys(validInputs.functions).includes(key)){
        return validInputs.functions[key];
    }
    return {
        text,
        class: type,
        id
    } 
}

function handleEvent(button) {
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
}

const screen = {                      // Object containing methods needed to update the screen
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
    handleEvent(button);
});


$(window).on("keyup", (event) => {
    console.log(event.key);
    const button = buttonPressHandler(event.key);
    handleEvent(button);
})
