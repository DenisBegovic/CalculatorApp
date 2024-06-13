import Calculator from "./calculator.js";
import { buttonPressHandler, clickHandler } from "./inputHandler.js";
import Screen from './screen.js';

const calculator = new Calculator(); 
const screen = new Screen($('.expression'), $('.output'));


function handleEvent(button) {
    if (button.class == 'number' || button.class == 'operator' || button.id== 'comma' || button.id == 'bracket') {
        calculator.expression += button.text;
    } else {
        switch (button.id) {
            case 'equals':
                calculator.getResult();
                calculator.clearExpression();
                break;
            case 'delete':
                calculator.delete();
                break;
            case 'clear':
                calculator.clear();
                break;
            case 'equals':
                break;

            default:
                break;
        }
    }
    screen.update(calculator.expression, calculator.output);
}

$(".btn").on("click", (event) => {   
    const button = clickHandler(event.target);
    handleEvent(button);
});

$(window).on("keyup", (event) => {
    const button = buttonPressHandler(event.key);
    handleEvent(button);
});
