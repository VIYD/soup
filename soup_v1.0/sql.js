const mysql = require("mysql");
//import mysql from mysql;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'soup-site',
    password: 'soup-123-098',
    database: 'soupdb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

const loadButton = document.getElementById("load-button");
const saveButton = document.getElementById("save-button");
const cardTitle = document.querySelector(".card-title");
const cardDescription = document.querySelector(".card-description");

loadButton.addEventListener("click", () => {
    db.query('SELECT * FROM card_1', (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        
        console.log('Data received from the database');
        if (results.length > 0) {
            const data = results[0];
            cardTitle.value = data.title;
            cardDescription.value = data.description;
        }
    });
});

saveButton.addEventListener("click", () => {
    const title = cardTitle.value;
    const description = cardDescription.valu6e;
    
    db.query('INSERT INTO card_1 (title, description) VALUES (?, ?)', [title, description], (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Data saved successfully');
    });
});

process.on('SIGINT', () => {
    db.end();
    process.exit();
});