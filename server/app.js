    const express = require('express');
    const app = express();
    require('dotenv').config();
    const port = process.env.PORT || 3000;
    const cors = require('cors');

    // For using postman.com  
    app.use(cors());

    app.use(express.json());
    const authRoutes = require('./routes/auth.js');
    app.use('/api/auth', authRoutes);

    app.get('/', (req, res) => {
    res.send('Hello Dream World!');
    });

    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });