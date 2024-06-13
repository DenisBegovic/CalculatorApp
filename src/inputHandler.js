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
    if (validInputs.number.includes(key)) { // Check if the input is a number 
        text = key;
        type = 'number';
        id = '';
    } else if (Object.values(validInputs.operator).includes(key)) {  // Check if the input is an operator
        type = "operator";
        switch (key) {
            case validInputs.operator.multiply:
                text = 'x';
                id = 'multiply';
                break;
            case validInputs.operator.divide:
                text = '÷';
                id = 'divide';
                break;
            case validInputs.operator.add:
                text = '+';
                id = 'add';
                break;
            case validInputs.operator.subtract:
                text = '-';
                id = 'subract';
                break;
            case validInputs.operator.openParenthasis:
                text = '(';
                break;
            case validInputs.operator.closeParenthasis:
                text = ')';
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

const clickHandler = (target) => {    // Return a object holding properties of text, class, id

    return {
        text: target.innerText,
        class: target.classList[1],
        id: target.id
    }
}

export {buttonPressHandler, clickHandler};