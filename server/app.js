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

    // This block is for internal testing only, using a local audio file
    const { processVoiceDream } = require('./services/dreams.js');
    (async () => {
        const result = await processVoiceDream('../server/audio.mp3');
        console.log(result);
      })();

      
    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });