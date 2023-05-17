const express = require('express');
const db = require("../services/db");


const router = express.Router();




router.post("/employee",  async (req, res) => {
    const {  first_name, last_name, email } = req.body;
    const sql = "INSERT INTO users SET first_name = ?, last_name =?, email_address = ?";
    db.query(sql, [  first_name, last_name, email ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Employee not created" });
        }
        res.json({ message: "Employee profile created" });
    });
});



router.put("/employee",  async (req, res) => {
    const {  first_name, last_name, email, id } = req.body;
    const saltRounds = 10;
    const sql = "UPDATE users SET first_name = ?, last_name =?, email_address = ? WHERE id = ?";
    db.query(sql, [ first_name, last_name, email, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee profile updated" });
    });
});


module.exports = router;
