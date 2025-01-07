const express = require('express');
const router = express.Router();

// Contoh route untuk register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validasi sederhana
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    res.status(201).json({ message: 'User registered' });
});

// Contoh route untuk login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi sederhana
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Logika login (dummy)
    if (username === 'user' && password === 'pass') {
        return res.json({ token: 'fake-jwt-token' });
    }

    res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;