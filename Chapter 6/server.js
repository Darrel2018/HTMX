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

// Handle GET request for profile edit
app.get('/user/:id/edit', (req, res) => {
    // send an HTML form for editing
    res.send(`
        <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name" value="">
            </div>
            <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>
                <textarea type="text" class="form-control" id="bio" name="bio"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
                Save Changes
            </button>
            <button type="submit" hx-get="/index.html"
                class="btn btn-secondary">
                Cancel
            </button>
        </form>
    `);
});

// Handle PUT request for editing
app.put('/user/:id', (req, res) => {
    const name = req.body.name;
    const bio = req.body.bio;

    // Send the updated profile back
    res.send(`
        <div class="card" style="width: 18rem;"
            hx-target="this"
            hx-swap="outerHTML"
        >
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">
                    ${bio}
                </p>
                <button class="btn btn-primary"
                    hx-get="/user/1/edit">
                    Click To Edit
                </button>
            </div>
        </div>
    `);
});

app.delete("/user/:id", (req, res) => {
    const userId = req.params.id;

    console.log(`Deleting user with id %{userId}`);

    res.send("");
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});


// This Node/Express server provides backend routes that support an HTMX-powered user profile editor. It serves static files, parses form and JSON data, and defines three main routes:

// GET /user/:id/edit – Returns an HTML form for editing a user’s name and bio. The form uses HTMX (hx-put) to submit updates and replace itself with the server’s response.

// PUT /user/:id – Receives the updated user data, then responds with an updated Bootstrap-styled profile card that HTMX swaps into the page.

// DELETE /user/:id – Logs the deletion and returns an empty response, allowing HTMX to remove the card on the client side.

// Finally, the server listens on port 3000.