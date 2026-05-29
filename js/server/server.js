const express = require("express");
const cors = require("cors");
const db = require("./js/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
});