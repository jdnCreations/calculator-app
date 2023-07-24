// const colorScheme = prefers

const keypad = document.querySelector('.keypad');
const keypadButtons = keypad.querySelectorAll('button');
const display = document.getElementById('display');
const wrapper = document.querySelector('.wrapper');

const toggle = document.querySelector('.indicator');

let togglePosition = 1;

let calculation = '';
let answer = '';

const storeTheme = function(theme) {
  localStorage.setItem("theme", theme);
}

const setTheme = () => {
  if (localStorage.getItem("theme")) {
    const activeTheme = localStorage.getItem("theme");
    console.log(activeTheme);
    switch(activeTheme) {
      case 'light':
        togglePosition = 2;
        toggle.style.transform = "translateX(20px)";
        break;
      case 'dark':
        togglePosition = 1;
        toggle.style.transform = "translateX(0)";
        break;
      case 'other':
        togglePosition = 3;
        toggle.style.transform = "translateX(40px)";
        break;
    }
    wrapper.className = `wrapper ${activeTheme}`;
  } else {
    let theme = '';
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark').matches) {
        storeTheme('dark');
        togglePosition = 1;
        toggle.style.transform = "translateX(0)";
        theme = 'dark';
      } else {
        storeTheme('light');
        togglePosition = 2;
        toggle.style.transform = "translateX(20px)";
        theme = 'light';
      }
      wrapper.className = `wrapper ${theme}`;
    }
  }
}

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
        calculation = String(calculation).slice(0, -1);
        display.innerHTML = calculation;
        return console.log('delete');
      default:
        calculation += keypadButtons[i].innerHTML;
        display.innerHTML = calculation;
    }
  })
}

// toggle functionality
toggle.addEventListener('click', () => {
  if (togglePosition === 1) {
    togglePosition++;
    toggle.style.transform = "translateX(20px)";
    storeTheme("light");
    setTheme();
  } else if (togglePosition === 2) {
    togglePosition++;
    toggle.style.transform = "translateX(40px)";
    storeTheme("other");
    setTheme();
  } else if (togglePosition === 3) {
    togglePosition = 1;
    toggle.style.transform = "translateX(0)";
    storeTheme("dark");
    setTheme();
  }
})

document.onload = setTheme();