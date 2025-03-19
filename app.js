const { createServer } = require('node:http');
const sql = require('mssql');

const hostname = '127.0.0.1';
const port = 3000;

// Database configuration
const config = {
  server: 'db15879.databaseasp.net',
  database: 'db15879',
  user: 'db15879',
  password: '7p=RZ!3owG@6',
  options: {
    encrypt: false, // Disable encryption as per your connection string
    trustServerCertificate: true, // Needed if you're not using a valid certificate
    enableArithAbort: true
  },
  connectionTimeout: 30000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Create a connection pool
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

const server = createServer(async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT 1 AS testResult');
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      message: 'Hello World',
      databaseTest: result.recordset
    }));
  } catch (err) {
    console.error('Error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});