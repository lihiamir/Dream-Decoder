    const express = require('express');
    const app = express();
    // Loads environment variables 
    require('dotenv').config();
    const port = process.env.PORT || 3000;
    // Allow to accept requests from diffrent origins
    const cors = require('cors');
    const dreamsService = require('./services/dreams.js')
        
    // For using postman.com  
    app.use(cors());
    
    app.use(express.json());
    const authRoutes = require('./routes/auth.js');
    const dreamsRouts = require('./routes/dreams.js');
    app.use('/api/auth', authRoutes);
    app.use('/api/dreams',dreamsRouts);

    // For checking
    // app.get('/api/dreams/test-process', async (req, res) => {..
    // const uid = '5Tps6Rrb88Qau3CxfLEIRfInRT32';
    // const text = "אני רק חולמת לראות שזה מתרגם לי את החלום כמו שצריך אז אני חולמת שאני בשדות של טוטים עם ערנבים ליד מתכנתת ומתקבלת לחברת אינדוליניה.";

    // try {
    //     const result = await dreamsService.processTextDream(uid, text);
    //     res.status(200).json(result);
    // } catch (error) {
    //     console.error('❌ Error during test-process:', error);
    //     res.status(500).json({ error: error.message });
    // }
    // });

    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });