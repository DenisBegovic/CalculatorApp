
class Screen {
    constructor(expressionDOM, outputDOM) {
        this.expressionDOM = expressionDOM;
        this.outputDOM = outputDOM;
        this.expression = '';
        this.output = '0';
        this.display();
    }

    display() {
        this.expressionDOM.text(this.expression);
        this.outputDOM.text(this.output);
    }

    update(expression, output) {
        this.expression = expression;
        this.output = output;
        this.display();
    }
}

export default Screen;