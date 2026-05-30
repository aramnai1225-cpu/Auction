// Import required packages
const express = require("express");
const cors = require("cors");
const db = require("./js/db");

const app = express();

// Enable CORS
app.use(cors());

// Enable JSON data handling
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));


// ==============================
// GET PRODUCTS FROM DATABASE
// ==============================
app.get("/api/products", (req, res) => {

    // SQL query to get all products
    db.query("SELECT * FROM products", (err, results) => {

        // Return error if query fails
        if (err) {
            return res.status(500).json(err);
        }

        // Send product data as JSON
        res.json(results);
    });
});


// ==============================
// SAVE REGISTRATION TO DATABASE
// ==============================
app.post("/api/register", (req, res) => {

    // Get form data
    const { fullname, email, phone, auctionType } = req.body;

    // SQL insert query
    const sql = `
        INSERT INTO registrations
        (fullname, email, phone, auctionType)
        VALUES (?, ?, ?, ?)
    `;

    // Execute query
    db.query(
        sql,
        [fullname, email, phone, auctionType],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Registration saved successfully"
            });
        }
    );
});


// ==============================
// START SERVER
// ==============================
app.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
});