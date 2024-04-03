class Calculator {
    constructor() {
        this.expression = "(345.2÷22)+35.5";
        this.output = 0;
        // Changing operator sign or adding new operations go through here (this.operator)
        this.operator = {
            plus: '+',
            minus: '-',
            divide: '÷',
            multiply: 'x',
            openParenthasis: '(',
            closeParenthasis: ')'
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
        
        console.log(`\Begining expression is: || ${this.expression} ||`);
        console.log(`Pretty expression is: || ${parsedExpression.join('')} ||`);
    }

    // Checks for expressions in parenthasis and returns one sub-expression to be calculated
    handleParenthasis() {
        
    }
    
    // Calculates the expression passed in
    calculate(expression) {
        
    }   

    // Helper function that acts as an entry way for all other and sets the this.output to the result of the calculate function
    getResult() {
        let expression = this.parseExpression();
    }




                                                                                                         //         HELPER FUNCTIONS         //

}

const calc = new Calculator();
calc.parseExpression();