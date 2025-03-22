require('dotenv').config();
const express = require('express');
const sql = require('mssql');

const app = express();
const PORT = 3000;

const connectionString =process.env.DB_CONNECTION;

app.use(express.json()); 
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


const getOrders = async () => {
    try {

        pool = await sql.connect(connectionString); 
        const result = await pool.request().query('SELECT * FROM customers');
        return result.recordset; 
        
    } catch (err) {
        console.error('Error fetching orders:', err);
        throw err;
    } finally {
        await sql.close();
    }
};



app.post('/api/order', async (req, res) => {
    const { nom,prenom, quantity, phone_number,wilaya, address } = req.body;

    console.log('zbi',nom,prenom, quantity, phone_number,wilaya, address);
    try {
        await sql.connect(connectionString);
        await sql.query`INSERT INTO customers (nom, prenom,quantity, phone_number, wilaya , adresse )
            VALUES (${nom},${prenom},${quantity}, ${phone_number},${wilaya}, ${address})` 
            
        ;
        res.json({ message: 'order added. well contact you' });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'Error ' });
    } finally {
        await sql.close();
    }
});

 



app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}` );
    //test();
    await getOrders();
    try {
        const orders = await getOrders(); 
        console.log('Orders fetched at server start:', orders);
    } catch (err) {
        console.error('Error fetching orders at server start:', err);
    }
    
    
});