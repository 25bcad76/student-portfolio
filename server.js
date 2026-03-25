const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// ❗ IMPORTANT: MongoDB (Render cannot use localhost)
mongoose.connect("mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.mongodb.net/portfolioDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model("Contact", contactSchema);

// Route
app.post("/save", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.send("Data saved successfully");
    } catch (error) {
        res.send("Error saving data");
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));