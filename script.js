let wheel = document.querySelector('.wheel');
let spinBtn = document.querySelector('.spinBtn');
let value = 0; // Start at 0 degrees

// Array of numbers and questions for the wheel
let numbers = [
    { value: 'A', question: 'What is the capital of France?', color: '#db7093' },
    { value: 'B', question: 'Who wrote the play "Romeo and Juliet"?', color: '#20b2aa' },
    { value: 'C', question: 'What is the chemical symbol for gold?', color: '#d63e92' },
    { value: 'D', question: 'What is the largest planet in our solar system?', color: '#daa520' },
    { value: 'E', question: 'What is the tallest mountain on Earth?', color: '#ff340f' },
    { value: 'F', question: 'Who painted the Mona Lisa?', color: '#ff7f50' },
    { value: 'G', question: 'What is the symbol for the element oxygen?', color: '#3cb371' },
    { value: 'H', question: 'What is the largest mammal on Earth?', color: '#4169e1' },
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
    wheel.style.transition = 'transform 2s ease-in-out';
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
            let resultQuestionElement = document.getElementById('resultQuestion'); // Added this line
            resultNumberElement.textContent = "Question " +  resultNumber.value + ": ";
            resultQuestionElement.textContent = resultNumber.question; // Display the question
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