class Calculator {
    constructor() {
        this._expression = '((48/2+6)+20)*2';
        this._answer = 0;
        this._operations = ['*', '/', '+', '-', '(', ')'];
        this._operationPriority = [['*', '/'], ['+', '-']];
    }

    get expression() {
        let expression = `${this._expression}&`
        return expression;
    }

    get answer() {
        return this._answer;
    }

    set answer(output) {
        this._answer = output; 
    }

    get operations() {
        return this._operations;
    }

    get operationPriority() {
        return this._operationPriority;
    }


    //Simple operation functions
    add(num1, num2) {
        return num1 + num2;
    }

    subtract(num1, num2) {
        return num1 - num2;
    }

    multiply (num1, num2) {
        return num1 * num2;
    }

    divide(num1, num2) {
        return num1 / num2;
    }

    //
    chooseOperation(char) {
        switch (char) {
            case '*':
                return this.multiply;
                
            case '/':
                return this.divide;
            
            case '+':
                return this.add;
            
            case '-':
                return this.subtract;

            default:
                break;
        }
    }

    performOperation(num1, num2, operation) {
        return operation(num1, num2);
    }

    parseExpression() {
        const expression = this.expression;
        let number = '';
        let operator = '';
        let lastOperatorIndex = 0;
        let parsedExpression = [];

        for (let i = 0; i < expression.length; i++) {
            if (this.operations.includes(expression[i]) || expression[i] == '&') {
                for (let j = lastOperatorIndex; j < i; j++) {
                    number += expression[j];
                }
                operator = expression[i];
                number = parseFloat(number);
                // console.log(`Checking NaN status for ${number}: ${Number.isNaN(number)}`);
                // console.log(`Values for current itaration: Number=>${number}, Operation=>${operator}\n`);

                if (Number.isNaN(number)) {
                    parsedExpression.push(operator);
                } else {
                    parsedExpression.push(number, operator);
                }

                operator = '';
                number = '';
                lastOperatorIndex = i + 1;
            }
        }
        parsedExpression.pop();
        return parsedExpression;
    }


    returnExpressionFromParenthasis(expression) {
        let openIndex;
        let closeIndex;
        for(let i = 0; i <= expression.length; i++) {
            if (expression[i] == '('){
                openIndex = i;
            } else if (expression[i] == ')') {
                closeIndex = i;
                break;
            }
        }
        
        return {
            openIndex,
            closeIndex,
            inParenthasis: expression.slice(openIndex + 1, closeIndex)
        }
    }


    calculate(currentExpression) {
        console.log(`Currently checking sub-expression: ${currentExpression.join('')}`)
        let num1, num2, result, operation;
        this.operationPriority.forEach(order => {
            for (let i = 0; i < currentExpression.length; i++) {
                if (order.includes(currentExpression[i])) {
                    num1 = currentExpression[i - 1];
                    num2 = currentExpression[i + 1];
                    operation = this.chooseOperation(currentExpression[i]);
                    result = this.performOperation(num1, num2, operation);

                    currentExpression.splice(i - 1, 3, result);
                    this.calculate(currentExpression);
                }
            }
        });
        return currentExpression[0];
    }

    calculateSubExpressions(expression) {
        console.log(`Calculating this expression: ${expression.join('')}`);
        let subExpression= this.returnExpressionFromParenthasis(expression);
        let currentExpression = subExpression.inParenthasis;
        let result = this.calculate(currentExpression);

        expression.splice(subExpression.openIndex, subExpression.closeIndex - subExpression.openIndex + 1, result);

        if (expression.includes('(')) {
            this.calculateSubExpressions(expression);
        }   
        return expression;
    }

    getResult() {
        let expression = this.parseExpression();

        if (expression.includes('(')) {
            expression = this.calculateSubExpressions(expression);
        } 
        this.answer = this.calculate(expression);
        console.log(`Final output is: ${this.answer}`);
    }

}


export default Calculator;