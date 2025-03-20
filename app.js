const express = require('express');
const sql = require('mssql');
const path = require('path');

const app = express();
const PORT = 3000;

const connectionString = "Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true;TrustServerCertificate=true";

app.use(express.json()); 
app.use(express.static('public')); 

// Connect to database and fetch data
app.get('/api/data', async (req, res) => {
    try {
        await sql.connect(connectionString);
        const result = await sql.query`SELECT * FROM cosutmers`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Database query failed:', err);
        res.status(500).send('Error fetching data');
    } finally {
        await sql.close();
    }
});

// Insert data into database
app.post('/api/insert', async (req, res) => {
    const { value1, value2 } = req.body;
    try {
        await sql.connect(connectionString);
        await sql.query`INSERT INTO mytable (column1, column2) VALUES (${value1}, ${value2})`;
        res.send('Data inserted successfully');
    } catch (err) {
        console.error('Insert failed:', err);
        res.status(500).send('Error inserting data');
    } finally {
        await sql.close();
    }
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
