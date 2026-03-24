const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", contactSchema);

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/save", async (req, res) => {
    try {
        const data = new Contact(req.body);
        await data.save();
        res.send("Message saved successfully!");
    } catch (err) {
        res.send("Error saving data");
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});