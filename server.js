const express = require('express');
const { Client } = require('pg');
const cors = require('cors'); // Add this line at the top

const app = express();
const port = 8000;

// Add CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "12345",
    database: 'postgres',
});

client.connect();

app.use(express.json());
app.set('json spaces', 2);

app.get('/', (req, res) => {
    client.query('SELECT * FROM public.user', (err, result) => {
        if (!err) {
            res.json(result.rows);
        } else {
            res.status(500).send(err.message);
        }
    });
});

app.get('/cameras', (req, res) => {
    client.query('SELECT * FROM public.cameras', (err, result) => {
        if (!err) {
            res.json(result.rows);
        } else {
            res.status(500).send(err.message);
        }
    });
});

app.get('/ai', (req, res) => {
    client.query('SELECT * FROM public.boxai', (err, result) => {
        if (!err) {
            res.json(result.rows);
        } else {
            res.status(500).send(err.message);
        }
    });
});

app.post('/cameras', (req, res) => {
    const { id, name, ip, address, coordinates, status, onoff } = req.body;
    client.query(
        'INSERT INTO public.cameras (id, name, ip, address, coordinates, status, onoff) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [id, name, ip, address, coordinates, status, onoff],
        (err, result) => {
            if (!err) {
                res.json(result.rows[0]);
            } else {
                res.status(500).send(err.message);
            }
        }
    );
});


app.post('/ai', (req, res) => {
    const { id, name, ip, address, coordinates, status, onoff } = req.body;
    client.query(
        'INSERT INTO public.boxai (name, ip,address, coordinates,status, onoff)) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id, name, ip, address, coordinates, status, onoff],
        (err, result) => {
            if (!err) {
                res.json(result.rows[0]);
            } else {
                res.status(500).send(err.message);
            }
        }
    );
});

app.put('/cameras/:id', (req, res) => {
    const id = req.params.id;
    const { onoff } = req.body;
    client.query(
        'UPDATE public.cameras SET onoff = $1 WHERE id = $2 RETURNING *',
        [onoff, id],
        (err, result) => {
            if (!err) {
                res.json(result.rows[0]);
            } else {
                res.status(500).send(err.message);
            }
        }
    );
});

app.put('/ai/:id', (req, res) => {
    const id = req.params.id;
    const { onoff } = req.body;
    client.query(
        'UPDATE public.boxai SET onoff = $1 WHERE id = $2 RETURNING *',
        [onoff, id],
        (err, result) => {
            if (!err) {
                res.json(result.rows[0]);
            } else {
                res.status(500).send(err.message);
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
