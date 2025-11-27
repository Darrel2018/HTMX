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

// Handle POST request for email validation
app.post('/email', (req, res) => {
    const submittedEmail = req.body.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(submittedEmail)) {
        return res.send(
            `<div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                />
                    <div class="alert alert-success" role="alert">
                        That email is valid
                    </div>
            </div>`
        )
    }
    else {
        return res.send(
            `<div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                    <div class="alert alert-danger" role="alert">
                        Please enter a valid email address
                    </div>
            </div>`
        )
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

/*
CODE SUMMARY:
This Express.js server handles email validation with real-time feedback using HTMX.

Server Setup:
Initializes Express application
Serves static files from 'public' folder (images, CSS, fonts)
Parses form data (express.urlencoded) to handle special characters
Parses JSON data for API requests

Email Validation Route (/email):
Receives POST requests when user types in email field
Uses regex pattern to validate email format (checks for @ symbol, domain, etc.)
Returns HTML with Bootstrap styling showing:
Green success alert if email is valid
Red error alert if email is invalid
Preserves user's input in the field
Uses HTMX attributes to swap content without page reload

Server Startup:
Listens on port 3000 (access at http://localhost:3000/)
Logs confirmation message when server starts
*/
