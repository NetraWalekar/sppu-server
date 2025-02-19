const express = require('express');
const app = express();
const fs = require('fs');
const path = require("path");

app.get('/', function (req, res) {
    res.send('<b>Welcome to Sppu Online</b>');
});

const users = [{
    username: "Netra",
    motherName: "Savita",
    result: "netra.pdf"
}, {
    username: "Vishakha",
    motherName: "Sangeeta",
    result: "vishakha.pdf"
}, {
    username: "Namrata",
    motherName: "Meena",
    result: "namrata.pdf"
}];

app.get('/result', function (req, res) {
    const { username, motherName } = req.query;
    console.log(req.query);

    const user = users.find(u => u.username === username && u.motherName === motherName);

    if (!user) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    // Correct variable name here
    const filePath = path.join(__dirname, 'results', user.result);
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("File access error:", err);
            return res.status(404).send('Error: File not found');
        }
        
        // If file exists, proceed with download
        res.download(filePath, user.result, (err) => {
            if (err) {
                console.error("Download Error:", err);
                res.status(400).send('Error: File cannot be downloaded');
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});