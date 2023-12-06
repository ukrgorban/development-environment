const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'myuser',
    host: 'postgres',
    database: 'mydatabase',
    password: 'mypassword',
    port: 5432,
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT $1::text as message', [
            'Hello, Docker!!!',
        ]);
        res.send(result.rows[0].message);
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on  port ${port}`);
});
