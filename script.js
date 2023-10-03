// script.js

// Function to display the message when the button is clicked
function displayMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Hello, soup!';
}

function changeTitle(id) {
    const titleElement = document.getElementById(id);
    titleElement.title = 'інший тултіп!';
}

// Add a click event listener to the button
const button = document.getElementById('displayButton');
button.addEventListener('click', displayMessage);

const paragraph = document.getElementById("p1");
paragraph.addEventListener('click', function() {
    changeTitle("p1");
});

