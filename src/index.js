import Calculator from "./calculator";

const calculator = new Calculator();


$(".btn").on("click", (event) => {
    const data = mouse.extractRelevantData(event.target);
    calculator.handle(data);
});

$(window).on("keyup", (event) => {
    if (keyboard.acceptableKeys.includes(event.key)) {
        const data = keyboard.extractRelevantData(event.key);
        calculator.handle(data);
    }
})
