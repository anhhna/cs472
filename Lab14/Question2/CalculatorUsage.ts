import { Calculator } from "./Calculator";

const calculator = new Calculator();

const num1 = 10;
const num2 = 5;

console.log(`Addition: ${num1} + ${num2} = ${calculator.add(num1, num2)}`);
console.log(`Subtraction: ${num1} - ${num2} = ${calculator.subtract(num1, num2)}`);
console.log(`Multiplication: ${num1} * ${num2} = ${calculator.multiply(num1, num2)}`);

try {
    console.log(`Division: ${num1} / ${num2} = ${calculator.divide(num1, num2)}`);
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error("Unknown error occurred.");
    }
}