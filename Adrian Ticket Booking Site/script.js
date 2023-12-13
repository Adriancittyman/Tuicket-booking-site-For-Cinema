const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');



// Function to initiate offline payment
function initiateOfflinePayment() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const userName = document.getElementById('name').value;

  // Check if seats are selected
  if (selectedSeats.length === 0) {
    alert('Please select seats before proceeding to payment.');
    return;
  }

  // Calculate total price
  const totalPrice = selectedSeats.length * ticketPrice;

  // Display payment information
  const paymentInfo = `Movie: ${
    document.getElementById('movie').options[document.getElementById('movie').selectedIndex].text
  }\nNumber of Seats: ${selectedSeats.length}\nTotal Price: ₦${totalPrice}\nName: ${userName}`;

  // Show a confirmation alert with payment details
  alert('Initiating offline payment...\n\n' + paymentInfo);
}

// script.js

// Your existing code...

function generateReceipt() {
  // Get selected movie and seat information
  const selectedMovie = document.getElementById("movie").value;
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Calculate total price
  const totalPrice = selectedSeats.length * selectedMovie;

  // Create receipt message
  const receiptMessage = `Movie: ${
    document.getElementById("movie").options[document.getElementById("movie").selectedIndex].text
  }\nNumber of Seats: ${selectedSeats.length}\nTotal Price: ₦${totalPrice}`;

  // Display receipt on the webpage
  const receiptContainer = document.createElement("div");
  receiptContainer.classList.add("receipt");
  receiptContainer.textContent = receiptMessage;

  document.body.appendChild(receiptContainer);
}





// script.js

// ... Your existing code ...

// Function to print the receipt with the user's name
function printReceipt() {
  // Get selected movie, seat information, and user's name
  const selectedMovie = document.getElementById("movie").value;
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const userNameLabel = document.querySelector('label[for="name"]');
  const userName = document.getElementById("name").value;

  // Calculate total price
  const totalPrice = selectedSeats.length * selectedMovie;

  // Create receipt message including user's name
  const receiptMessage = `Movie: ${
    document.getElementById("movie").options[document.getElementById("movie").selectedIndex].text
  }\nNumber of Seats: ${selectedSeats.length}\nTotal Price: ₦${totalPrice}\nName: ${userName}`;

  // Open a new window for printing
  const printWindow = window.open('', '_blank');

  // Write the receipt content to the new window
  printWindow.document.write('<html><head><title>Receipt</title></head><body>');
  printWindow.document.write('<pre>' + receiptMessage + '</pre>');
  printWindow.document.write('</body></html>');

  // Close the document for printing
  printWindow.document.close();

  // Trigger the print dialog
  printWindow.print();
}




// Attach event listener to the Print Receipt button
const printReceiptButton = document.createElement("button");
printReceiptButton.textContent = "Print Receipt";
printReceiptButton.addEventListener("click", printReceipt);

document.body.appendChild(printReceiptButton);



// Attach event listener to the button
const generateReceiptButton = document.createElement("button");
generateReceiptButton.textContent = "Generate Receipt";
generateReceiptButton.addEventListener("click", generateReceipt);

document.body.appendChild(generateReceiptButton);


populateUI();
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});




// Create and append the initiate payment button
const initiatePaymentButton = document.createElement('button');
initiatePaymentButton.textContent = 'Initiate Offline Payment';
initiatePaymentButton.addEventListener('click', initiateOfflinePayment);
document.body.appendChild(initiatePaymentButton);

// Initialize the count and total
updateSelectedCount();

