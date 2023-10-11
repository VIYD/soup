var mysql = require("mysql");

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

db.query('SELECT * FROM card_1;', (err, results, fields) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Query results:', results);
});


process.on('SIGINT', () => {
    db.end();
    process.exit();
});
