const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://destrouch-gel.vercel.app/'
}));

const connectionString = process.env.DB_CONNECTION;

app.post('/order', async (req, res) => {
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
    } finally {
        await sql.close();
    }
});

app.listen(3000, () => console.log("Server ready on port 3000."));
module.exports = app; 
