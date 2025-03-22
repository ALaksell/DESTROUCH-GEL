const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://destrouch-gel.vercel.app/'
}));

const connectionString = process.env.DB_CONNECTION;

app.post('api/order', async (req, res) => {
    const { nom, prenom, quantity, phone_number, wilaya, address } = req.body;

    try {
        await sql.connect(connectionString);
        await sql.query`
            INSERT INTO customers (nom, prenom, quantity, phone_number, wilaya, adresse)
            VALUES (${nom}, ${prenom}, ${quantity}, ${phone_number}, ${wilaya}, ${address})
        `;
        res.json({ message: 'Order added. We will contact you.' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error inserting order' });
    } finally {
        await sql.close();
    }
});

app.get('api/orders', async (req, res) => {
    try {
        await sql.connect(connectionString);
        const result = await sql.query('SELECT * FROM customers');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Error fetching orders' });
    } finally {
        await sql.close();
    }
});
app.listen(3000, () => console.log("Server ready on port 3000."));
module.exports = app; 
