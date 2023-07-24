// const colorScheme = prefers

const keypad = document.querySelector('.keypad');
const keypadButtons = keypad.querySelectorAll('button');
const display = document.getElementById('display');

let calculation = '';
let answer = '';

function calculate() {
  const operators = ['+', '-', 'x', '/'];

  let currentOperator = '';

  for (let i = 0; i < operators.length; i++) {
    if (calculation.includes(operators[i])) {
      console.log(operators[i]);
      currentOperator = operators[i];
    }
  }

  const [first, second] = calculation.split(currentOperator);
  const firstNumber = Number(first);
  const secondNumber = Number(second);

  switch(currentOperator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case 'x':
      return firstNumber * secondNumber;
    case '/':
      return firstNumber / secondNumber;
  }
}

// add event listeners to all keypad buttons
for (let i = 0; i < keypadButtons.length; i++) {
  keypadButtons[i].addEventListener('click', () => {
    

    switch(keypadButtons[i].innerHTML) {
      case '=':
        answer = calculate();
        display.innerHTML = answer;
        calculation = answer;
        return console.log(answer);
      case 'reset':
        calculation = '';
        answer = '';
        return display.innerHTML = '';
      case 'del':
        console.log(calculation);
        calculation = String(calculation).slice(0, -1);
        console.log(calculation);
        display.innerHTML = calculation;
        return console.log('delete');
      default:
        calculation += keypadButtons[i].innerHTML;
        display.innerHTML = calculation;
    }
  })
}