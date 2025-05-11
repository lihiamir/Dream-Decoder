    const express = require('express');
    const app = express();
    // Loads environment variables 
    require('dotenv').config();
    const port = process.env.PORT || 3000;
    // Allow to accept requests from diffrent origins
    const cors = require('cors');

    
    // For using postman.com  
    app.use(cors());
    
    app.use(express.json());
    const authRoutes = require('./routes/auth.js');
    const dreamsRouts = require('./routes/dreams.js');
    app.use('/api/auth', authRoutes);
    app.use('/api/dreams',dreamsRouts);

    app.get('/', (req, res) => {
    res.send('Hello Dream World!');
    });

    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });