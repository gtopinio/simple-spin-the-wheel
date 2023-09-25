let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let value = Math.floor(Math.random() * 3600);

// Array of numbers for the wheel
let numbers = [
    { value: 101, color: '#db7093' },
    { value: 1, color: '#20b2aa' },
    { value: 50, color: '#d63e92' },
    { value: 0, color: '#daa520' },
    { value: 1000, color: '#ff340f' },
    { value: 10, color: '#ff7f50' },
    { value: 5, color: '#3cb371' },
    { value: 20, color: '#4169e1' },
];

// Function to create a number element
function createNumberElement(number, index) {
    let numberElement = document.createElement('div');
    numberElement.classList.add('number');
    numberElement.style.setProperty('--i', index + 1);
    numberElement.style.setProperty('--clr', number.color);
    numberElement.innerHTML = `<span>${number.value}</span>`;
    return numberElement;
}

// Dynamically create and append number elements to the wheel
numbers.forEach((number, index) => {
    let numberElement = createNumberElement(number, index);
    wheel.appendChild(numberElement);
});

spinBtn.addEventListener('click', () => {
    wheel.style.transform = `rotate(${value}deg)`;
    value += Math.floor(Math.random() * 3600);
});
