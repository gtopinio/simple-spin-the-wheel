let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let value = 0; // Start at 0 degrees

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
    // Disable the spin button during animation
    spinBtn.disabled = true;

    // Simulate spinning animation
    let randomRotation = Math.floor(Math.random() * 3600) + 360; // At least one full rotation
    value += randomRotation;
    wheel.style.transition = 'transform 5s ease-in-out';
    wheel.style.transform = `rotate(${value}deg)`;

    // Add an event listener to check when the animation ends
    wheel.addEventListener('transitionend', () => {
        // Enable the spin button
        spinBtn.disabled = false;

        // Calculate the angle where the pointer is pointing
        let pointerAngle = (360 - (value % 360) - 90) % 360; // Adjust for the pointer at the top
        if (pointerAngle < 0) pointerAngle += 360;

        // Find the corresponding number
        let resultNumber = numbers.find((number, index) => {
            let startAngle = (index * 45);
            let endAngle = ((index + 1) * 45);
            return pointerAngle >= startAngle && pointerAngle < endAngle;
        });

        if (resultNumber) {
            // Display the result in the modal
            let modal = document.getElementById('myModal');
            let resultNumberElement = document.getElementById('resultNumber');
            resultNumberElement.textContent = resultNumber.value;
            modal.style.display = 'block';
        }
    });
});

// Function to make the modal draggable
function dragModal(modal) {
    let isDragging = false;
    let offsetX, offsetY;

    // Handle the mouse down event on the modal header
    modal.querySelector('.modal-content').addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - modal.offsetLeft;
        offsetY = e.clientY - modal.offsetTop;
        modal.style.cursor = 'grabbing';
    });

    // Handle the mouse up event
    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            modal.style.cursor = 'grab';
        }
    });

    // Handle the mouse move event
    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            modal.style.left = e.clientX - offsetX + 'px';
            modal.style.top = e.clientY - offsetY + 'px';
        }
    });
}

// Close the modal when the close button is clicked
let closeModal = document.getElementById('closeModal');
closeModal.addEventListener('click', () => {
    let modal = document.getElementById('myModal');
    modal.style.display = 'none';
});

// Initialize modal drag-and-drop
let modal = document.getElementById('myModal');
dragModal(modal);