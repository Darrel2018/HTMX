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

app.post('/calculate', (req, res) => {
    const height = parseFloat(req.body.height);
    console.log("height: " + height);
    const weight = parseFloat(req.body.weight);
    console.log("weight: " + weight);

    const bmi = weight / (height * height);
    console.log("bmi: " + bmi)

    res.send(
        `<p>Height of ${height} & Weight of ${weight} gives you BMI of ${bmi.toFixed(2)}</p>`
    );
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// Summary

// This Node.js script sets up a basic Express server that serves static files from a public folder and can parse both URL-encoded form data 
// and JSON. It defines a POST route at /calculate, which reads height and weight from the request body, calculates the user’s BMI, and 
// responds with an HTML snippet displaying the result. The server listens on port 3000.

