const express = require('express');
const router = express.Router();

// Contoh route untuk mengirim pesan
router.post('/send', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    res.status(200).json({ message: 'Message received' });
});

module.exports = router;