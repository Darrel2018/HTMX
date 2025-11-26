import express from 'express';

// Initialize an express app and store it in the varible 'app'
const app = express();

// MIDDLEWARE
// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

let currentPrice = 60;

app.get('/get-price', (req, res) =>{
    currentPrice = currentPrice + ( (Math.random() * 2) - 1);
    console.log("New price: " + currentPrice)
    res.send('$' + currentPrice.toFixed(1))
})

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// Summary
// This Node.js script creates a simple Express server that serves static files and handles JSON and form data. It keeps track of a 
// mock Bitcoin price, updating it slightly on each request. When the client hits the /get-price endpoint, the server adjusts the price 
// by a small random amount, logs the new value, and returns it formatted as a dollar amount. The server listens for connections 
// on port 3000.
