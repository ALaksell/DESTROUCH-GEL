require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');


const app = express();
const PORT = 3000;

const connectionString =process.env.DB_CONNECTION;

app.use(express.json()); 
app.use(cors()); 
app.use(express.static('public')); 

const test = async () => {
  try {
      await sql.connect(connectionString);
      console.log('success');
      await sql.close();
  } catch (err) {
      console.error('errr:', err);
  }
};


app.post('/api/order', async (req, res) => {
    const { fullName, email, phone, address, quantity } = req.body;

    try {
        await sql.connect(connectionString);
        await sql.query`
            INSERT INTO orders (full_name, email, phone, address, quantity)
            VALUES (${fullName}, ${email}, ${phone}, ${address}, ${quantity})
        `;
        res.json({ message: 'order added. well contact you' });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'Error ' });
    } finally {
        await sql.close();
    }
});

app.listen(PORT,async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  test();
});
