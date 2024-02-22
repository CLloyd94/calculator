// Create variables for the first number, the operator and the second number
let firstNum;
let operator;
let secondNum;
let result;
let expression = [];
let startNewCalculation = false;
let displayValue = '';

// Functions for each operator (add, plus, divide, multiply), evaluating only one pair of numbers at once
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Create a function, operate, that takes an operator and 2 numbers, then calls an 
// operator function (add, subtract, etc.) depending on the operator used
function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "*":
            return multiply(firstNum, secondNum);
        case "/":
            if (secondNum === 0) return 'Cannot divide by zero.';
            return divide(firstNum, secondNum);
        default:
            return 'Invalid operation';
    }
}
// Create functions that populate the display when you click the number buttons
// Create a node list of all digits and select them
const digits = document.querySelectorAll('.digit');
// Select the display
const display = document.querySelector('.display');

// Iterate through each digit; when each one clicked, show it in the display
digits.forEach((digit) => {
    digit.addEventListener('click', () => {
        if (startNewCalculation) {
            displayValue = '';
            startNewCalculation = false;
        }
        // Add all numbers inputted to the display value
        displayValue += digit.textContent;
        // Then we need to show the displayValue in the display div's textContent.
        display.textContent = displayValue;
        // If there's no operator
        if (!operator) {
            // Convert what's in the display to a number and assign to the first number
            firstNum = Number(displayValue); 
            // Put the first number in the first argument of the expression array
            expression[0] = firstNum;
        // If there is an operator
        } else {
            // Then add the input to the second number
            secondNum = Number(displayValue);
            // Then we add the second number to the expression array
            expression[2] = secondNum;
        }
    });
});

// Get the user's chosen operator when they press an operator button
const operators = document.querySelectorAll('.operator');
operators.forEach((op) => {
    op.addEventListener('click', () => {
        if (startNewCalculation) {
            // If starting a new calculation after a result, keep the result as firstNum
            expression = [firstNum]; // Start with the previous result
            startNewCalculation = false;
        } else if (expression.length === 3) {
            // If an operation is already in progress, calculate it before starting the next
            result = operate(...expression);
            display.textContent = String(result);
            expression = [result]; // Use the result as the starting point for the next operation
            firstNum = result;
        }
        operator = op.textContent; // Set the new operator
        expression[1] = operator; // Update the expression with the new operator
        displayValue = ''; // Reset displayValue for new number input
    });
});

// The clear button should clear all data and the display
const clearButton = document.querySelector('.btn-clear');
clearButton.addEventListener('click', () => {
    clear();
});

const clear = function() {
    display.textContent = '';
    displayValue = '';
    expression = [];
    firstNum = '';
    operator = '';
    secondNum = '';
    result = '';
}

// Create the equals button
const equalsButton = document.querySelector('.btn-equals');
equalsButton.addEventListener('click', () => {
    if (expression.length === 3) {
        result = Math.round(operate(...expression) * 100) / 100;
        if (result === 'Cannot divide by zero.') {
            display.textContent = result;
        } else {
            displayValue = String(result);
            display.textContent = displayValue;
            expression = [result];
            firstNum = result;
            secondNum = '';
            startNewCalculation = true;
        }
    } 
});