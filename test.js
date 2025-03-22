require('dotenv').config();
const sql = require('mssql');

const connectionString = process.env.DB_CONNECTION;

const testConnection = async () => {
    try {
        await sql.connect(connectionString);
        console.log('✅ connection successful');
    } catch (err) {
        console.error('❌ connection error:', err);
    } finally {
        await sql.close();
    }
};

const getOrders = async () => {
    try {
        await sql.connect(connectionString);
        const result = await sql.query('SELECT * FROM customers');
        console.log('📜 Orders:', result.recordset);
    } catch (err) {
        console.error('❌ Error fetching orders:', err);
    } finally {
        await sql.close();
    }
};

// Run tests
(async () => {

    await testConnection();
    await getOrders();
})();
