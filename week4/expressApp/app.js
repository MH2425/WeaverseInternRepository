require('dotenv').config();
import express, { json } from 'express';
import { createConnection } from 'mysql2';

const app = express();
const port = 3000;

app.use(json());

const db = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.get('/', (req, res) => {
    return res.json({message: 'Hello World'});
});

// List all users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

// Get single user by id
app.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        } else if (results.length === 0) {
            return res.status(404).json({error: 'User not found'});
        } else {
            return res.json(results);
        }
    });
});

// Update entire user
app.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

    db.query(query, [name, email, id], (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({message: 'Update success'});
    });
});

// Partial update
app.patch('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const fields = req.body;

    if (Object.keys(fields).length === 0) {
        return res.status(400).json({message: 'Update is empty'});
    }

    const setClause = Object.keys(fields).map(key => `${key} = ?`).join(', ');
    const values = Object.values(fields);
    const query = `UPDATE users SET ${setClause} WHERE id = ?`;
    db.query(query, [...values, id], (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({message: 'Update partially success'});
    });

});

// Delete user
app.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json('Delete success');
    });
});

// Create users
app.post('/api/users', (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({message: 'Missing email or name'});
    }

    const checkEmailQuery = 'SELECT users.id FROM users WHERE email = ?';

    db.execute(checkEmailQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }

        if (results.length > 0) {
            return res.status(400).json({message: 'Email registered'});
        }
        const query = 'INSERT INTO users (name, email) VALUES (?, ?)';

        db.execute(query, [name, email], (err, results) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            res.json({id: results.insertId, name, email});
        });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});