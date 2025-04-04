const express = require('express');
const sql = require('mssql');


const app = express();
app.use(express.json());


const connectionString = process.env.DB_CONNECTION;

app.post('/order', async (req, res) => {
    const { nom, prenom, quantity, phone_number, wilaya, address } = req.body;

    try {
        await sql.connect(connectionString);
        await sql.query`
            INSERT INTO customers (nom, prenom, quantity, phone_number, wilaya, adresse)
            VALUES (N${nom}, N${prenom}, ${quantity}, ${phone_number}, N${wilaya}, N${address})
        `;

        res.json({ message: 'Order added. We will contact you.' });
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sql.close();
    }
});

app.listen(3000, () => console.log("Server ready on port 3000."));
module.exports = app; 
