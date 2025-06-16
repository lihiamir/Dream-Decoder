    const express = require('express');
    const app = express();
    // Allow to accept requests from diffrent origins
    const cors = require('cors');

    // For using postman.com  
    app.use(cors());
    
    app.use(express.json());
    const authRoutes = require('./routes/auth.js');
    const dreamsRouts = require('./routes/dreams.js');
    const profileRoutes = require('./routes/profile.js')
    app.use('/api/auth', authRoutes);
    app.use('/api/dreams',dreamsRouts);
    app.use('/api/profile',profileRoutes);

    module.exports = app;
