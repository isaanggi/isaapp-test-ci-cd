const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT $1::text as message', ['Hello world!']);
        res.send(result.rows[0].message);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
