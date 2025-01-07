require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app); // Integrasi HTTP server dengan Express
const io = new Server(server, {
    cors: {
        origin: '*', // Ganti dengan domain frontend Anda jika menggunakan domain tertentu
        methods: ['GET', 'POST'],
    },
});

// Koneksi ke database PostgreSQL
const pool = new Pool({
    user: 'advent',
    host: 'localhost',
    database: 'my_database',
    password: 'advent123',
    port: 5432,
});

// Secret key untuk JWT
const SECRET_KEY = 'your_secret_key'; // JWT secret
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint Registrasi
app.post('/api/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    try {
        // Cek apakah username sudah ada
        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan data user ke database
        const result = await pool.query(
            'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, email]
        );

        res.status(201).json({
            message: 'User registered successfully',
            userId: result.rows[0].id,
        });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Cek user di database
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Middleware untuk verifikasi token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user; // Menyimpan data user yang ada di token
        next();
    });
};

// Protected route sebagai contoh
app.get('/api/protected', authenticateToken, (req, res) => {
    res.status(200).json({
        message: 'Welcome to the protected route!',
        user: req.user, // Data user yang sudah diverifikasi dari token
    });
});



// Endpoint Chat
// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in your .env file
// });

// app.post('/api/chat', authenticateToken, async (req, res) => {
//     const { message } = req.body;

//     if (!message) {
//         return res.status(400).json({ error: 'Message is required' });
//     }

//     try {
//         // Send the message to OpenAI using the SDK
//         const response = await openai.chat.completions.create({
//             model: "gpt-4o", // Ensure you're using the correct model
//             messages: [
//                 { role: "user", content: message },
//             ],
//             response_format: {
//                 "type": "text"
//               },
//             temperature: 1,
//             max_tokens: 2048,
//             top_p: 1,
//             frequency_penalty: 0,
//             presence_penalty: 0,
//         });
        
//         console.log('OpenAI API Response:', JSON.stringify(response, null, 2));

//         // Extract the assistant's reply
//         const reply = response.choices[0]?.message?.content || "No response received";
//         res.status(200).json({ reply });

//     } catch (error) {
//         console.error("OpenAI API error:", error);
//         res.status(500).json({ error: "Failed to process chat request" });
//     }
// });


// Jalankan server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

