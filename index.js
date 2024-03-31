const calculator = {
    expression: '',
    answer: 0,
    operations: {
        functions: {
            getResult(num1, num2, operator) {
                switch (operator) {
                    case '+':
                        return this.add(num1, num2);
        
                    case '-':
                        return this.subtract(num1, num2);
        
                    case 'x':
                        return this.multiply(num1, num2);
        
                    case '÷':
                        return this.divide(num1, num2);
        
                    default:
                        break;
                }
            },
            add(num1, num2) {
                return num1 + num2;
            },
            subtract(num1, num2) {
                return num1 - num2;
            },
            multiply(num1, num2) {
                return num1 * num2;
            },
            divide(num1, num2) {
                return num1 / num2;
            }
        }
    },
    parseExpression() {
        let number = '';
        let separated = [];
        let lastOperator = 0;
    
    
        for (let i = 0; i < this.expression.length; i++) {
            if (['+', '-', 'x', '÷', '&'].includes(this.expression[i])) {
                for (let j = lastOperator; j < i; j++) {
                    number += this.expression[j]; 
                }
                if (number == 'Ans') {
                    number = this.answer;
                }
                if (this.expression[i] == "&") {
                    separated.push(parseFloat(number));
                } else {
                    separated.push(parseFloat(number), this.expression[i]);
                }
                number = '';
                lastOperator = i + 1;
            }
        }
        console.log(separated);
        return separated;
    },
    updateExpression(char) {
        this.expression += char;
    },
    showAnswer() {
        $(".result")[0].innerText = this.answer;
    },
    showExpression() {
        $(".expression")[0].innerText = this.expression;
    },
    takeInput(char) {
        this.updateExpression(char);
        this.showExpression();
    },
    clearEverything() {
        this.expression = "";
        this.showExpression();
        this.answer = '';
        this.showAnswer();
    },
    clear() {
        this.expression = '';
        this.showExpression();
    },
    delete() {
        let new_expression = this.expression.split('');
        new_expression.pop();
        this.expression = new_expression.join('');
        this.showExpression();
    },
    calculate() {
        let expression = this.parseExpression();
        
        console.log(`The current expression is ${expression}`);
        // if (expression.includes('Ans')) {
        //     const index = expression.findIndex(value => value == 'Ans');
        //     expression[index] = this.answer;
        // }

        let num1, num2, operator, result;
        const orderOfOperations = [['x', '÷'], ['+', '-']];
        console.log(`Evaluationg: ${expression}`);

        orderOfOperations.forEach(order => {
            console.log(`Checking for operations: [${order}]`);
            for (let i = 0; i < expression.length; i++) {
                if (expression.length == 1) {
                    break;
                } else if (order.includes(expression[i])) {
                    num1 = expression[i - 1];
                    num2 = expression[i + 1];
                    operator = expression[i];

                    result = this.operations.functions.getResult(num1, num2, operator);
    
                    expression.splice(i - 1, 3, result);
                    console.log(`Calculated this: ${num1} ${operator} ${num2} = ${result}`);
                    console.log(`Expression after slicing: [${expression}]`);
                    i = -1;
                }
            }
        });

        this.answer = expression[0];
        console.log(`Result: ${this.expression} = ${this.answer}`);
    },
    handler(data) {
        if (data.type == 'number' || data.type == 'operation' || data.type == 'comma') {
            this.takeInput(data.text);
        } else {
            switch (data.id) {
                case 'clear-everything':
                    this.clearEverything();
                    break;
    
                case 'clear':
                    this.clear();
                    break;
    
                case 'delete':
                    this.delete();
                    break;
    
                case 'equals':
                    this.expression += "&";
                    this.calculate();
                    this.showAnswer();
                    this.expression = 'Ans';
                    break;
    
                default:
                    break;
            }
        }
    }

}

const mouse = {
    extractRelevantData(data) {
        const text = data.innerText;
        const type = data.classList[1];
        const id = data.id;

        return {
            text,
            type,
            id
        }
    }  
}

const keyboard = {
    acceptableKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '*', '-', '+', 'Enter', '.', 'c', 'Backspace', 'Delete'],
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    operations: ['/', '*', '-', '+'],
    functions: {
        list: ['Enter', 'Backspace', 'Delete', 'c'],
        'Enter': {
            text: '=',
            id: 'equals'
        },
        'Backspace': {
            text: '<=',
            id: 'delete'
        },
        'Delete': {
            text: 'CE',
            id: 'clear-everything'
        },
        'c': {
            text: 'C',
            id: 'clear'
        }
    },
    extractRelevantData(key) {
        let text, type, id;
        if (this.numbers.includes(key)) {
            text = key;
            type = 'number';
        } else if (this.operations.includes(key)) {
            switch (key) {
                case '/':
                    text = '÷'
                    id = 'divide';
                    break;
                
                case '+':
                    text = key;
                    id = 'add';
                    break;

                case '*':
                    text = 'x';
                    id = 'multiply';
                    break;

                case '-':
                    text = key;
                    id = 'subtract';
                    break;
                default:
                    break;
            }
            type = 'operation';
        } else if (this.functions.list.includes(key)) {
            text = this.functions[key].text;
            type = 'function';
            id = this.functions[key].id;
        } else {
            text = key;
            type = 'comma';
        }
        return {
            text,
            type,
            id
        }
    }
}

$(".btn").on("click", (event) => {
    const data = mouse.extractRelevantData(event.target);
    calculator.handler(data);
});

$(window).on("keyup", (event) => {
    if (keyboard.acceptableKeys.includes(event.key)) {
        const data = keyboard.extractRelevantData(event.key);
        calculator.handler(data);
    }
})