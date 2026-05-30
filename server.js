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


// GET PRODUCTS FROM DATABASE
app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(results);
    });
});


// SAVE REGISTRATION TO DATABASE
app.post("/api/register", (req, res) => {
    const { fullname, email, phone, auctionType } = req.body;

    const sql = `
        INSERT INTO registrations
        (fullname, email, phone, auctionType)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [fullname, email, phone, auctionType], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Registration saved successfully"
        });
    });
});


// SAVE ORDER TO DATABASE
app.post("/api/orders", (req, res) => {
    const { fullname, email, address, total } = req.body;

    const sql = `
        INSERT INTO orders
        (fullname, email, address, total)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [fullname, email, address, total], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Order saved successfully"
        });
    });
});


// START SERVER
app.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
});