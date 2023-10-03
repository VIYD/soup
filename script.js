// script.js

// Function to display the message when the button is clicked
function displayMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Hello, soup!';
}

// Add a click event listener to the button
const button = document.getElementById('displayButton');
button.addEventListener('click', displayMessage);
