class Calculator {
    constructor() {
        this.expression = '';
        this.output = 0;
        // Changing operator sign or adding new operations go through here (this.operator)
        this.operator = {
            plus: '+',
            minus: '-',
            divide: '÷',
            multiply: 'x',
            openBracket: '(',
            closedBracket: ')'
        }
        this.operationPriority = [[this.operator.multiply, this.operator.divide], [this.operator.plus, this.operator.minus]];
    }


       //         MAIN PART OF THE PROGRAM           //


    // All primitive functions (can be added on in the future) 
    add(num1, num2) {
        return num1 + num2;
    }

    subtract(num1, num2) {
        return num1 - num2;
    }

    divide(num1, num2) {
        return num1 / num2;
    }

    multiply(num1, num2) {
        return num1 * num2;
    }

    // Performs simple operation based on the operator that is passed in as a argument
    performOperation(num1, num2, operator) {
        switch (operator) {
            case this.operator.plus:
                return this.add(num1, num2);
            
            case this.operator.minus:
                return this.subtract(num1, num2);
            
            case this.operator.multiply:
                return this.multiply(num1, num2);

            case this.operator.divide:
                return this.divide(num1, num2);
        }
    }

    // Returns parsed expression from string in form of a list of numbers and chars (operator sign)
    parseExpression() {           // Starting as ==>> "(15+7)*2+1"    Output is ==>>  ['(', 15, '+', 7, ')', '*', 2, '+', 1] // 
        this.expression += '&';   // Symbol for end ==> & //

        let number = '';
        let operator = '';
        let parsedExpression = [];
        let lastIndex = 0;

        for (let i = 0; i < this.expression.length; i++) {
            if (Object.values(this.operator).includes(this.expression[i]) || this.expression[i] == "&") {       // If the char at i position is on of the operators or parenthasis go back and add all numbers to the number variable//
                for (let j = lastIndex; j < i; j++) {                                                           // Go back before i and add all numbers to the number variable //
                    number += this.expression[j];
                }
                operator = this.expression[i];
                if (number != '') {
                    parsedExpression.push(parseFloat(number), operator);
                } else {
                    parsedExpression.push(operator);
                }

                number = '';
                operator = '';
                lastIndex = i + 1;
            }
        }
        parsedExpression.pop() // Removes the end symbol //
        
        console.log(`\n\nPretty expression is: || ${parsedExpression.join('')} ||`);
        return parsedExpression;
    }

    // Calculates the expression passed in //
    calculate(expression) {
        console.log(`\nIn calculate function. Expression is || ${expression.join('')} ||`);
        if (expression.includes('(')) {    // Reduces the expression so it doesn't have anymore parenthasis
            let simplifiedExpression = this.handleParenthasis(expression);
            this.calculate(simplifiedExpression);
        } 
        this.operationPriority.forEach(order => {
            console.log(`Checking for || ${order} ||`);
            let num1, num2, result, operator;
            for (let i = 0; i < expression.length; i++) {
                if(order.includes(expression[i])) {
                    operator = expression[i];
                    num1 = expression[i - 1];
                    num2 = expression[i + 1];

                    result = this.performOperation(num1, num2, operator);
                    expression.splice(i - 1, 3, result);   // Replaces the result with the numbers and operator in the array expression //
                    
                    i = 0;  // Starts loop from begining //

                    console.log(`|| ${num1} ${operator} ${num2} = ${result} ||`);
                    console.log(`Expression after this iteration: || ${expression}\n`);
                }
            }
        });
        console.log(`Result of calculate function is || ${expression}`);  // Returns the only element in the array //
        return expression[0];
    }   



    // Extracts the sub-expression inside the parenthasis and passes it to the calculate function
    // The calculate function returns a number
    // Then replaces the returned value with the expression in the parenthasis
    // Once that is done calls the calculate with the simplified expression
    handleParenthasis(expression) {
        console.log(`\nInside the handleParenthasis function with the value of: ${expression.join('')}`);
        let open, close;  // open and close => variables for storing the opening and closing indexes of parenthasis
        let subExpression = [];
        for (let i = 0; i < expression.length; i++) {   // Get the last position of the open parenthasis
            if (expression[i] == '(') {
                open = i;
            } 
        }
        for (let j = open; j < expression.length; j++) {  // Get the first position of the close parenthasis after the opening
            if (expression[j] == ')') {
                close = j;
                break;
            }
        }
        for (let k = open + 1; k < close; k++) {         // Extract the subexpression    
            subExpression.push(expression[k]);
        }
        console.log(`Extracted sub-expression is || ${subExpression} ||`);
        let result = this.calculate(subExpression);     // Passes that subexpression in tu the calculate function and returns a result
        expression.splice(open, close - open + 1, result);  // Replaces the result with the parenthasis group
        console.log(`Result of sub-expression is || ${result}`);
        console.log(`Simplified expression is || ${expression.join('')}`);
        return expression;
    }
    
    // Helper function that acts as an entry way for all other and sets the this.output to the result of the calculate function
    getResult() {
        let expression = this.parseExpression();
        this.output = this.calculate(expression);
        return this.output;
    }



                                                                                                         //         HELPER FUNCTIONS         //
    clear() {
        this.output = 0;
        this.expression = '';
    } 

    clearExpression() {
        this.expression = '';
    }

    delete() {
        let expression = this.expression.split('');
        expression.pop();
        this.expression = expression.join('');
    }

}   


export default Calculator;