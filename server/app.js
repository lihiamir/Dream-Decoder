    const express = require('express');
    const app = express();
    // Loads environment variables 
    require('dotenv').config();
    const port = process.env.PORT || 3000;
    // Allow to accept requests from diffrent origins
    const cors = require('cors');
    const downloadTagEmbeddings = require('./scripts/downloadTagEmbeddings.js');

    // For using postman.com  
    app.use(cors());
    
    app.use(express.json());
    const authRoutes = require('./routes/auth.js');
    const dreamsRouts = require('./routes/dreams.js');
    const profileRoutes = require('./routes/profile.js')
    app.use('/api/auth', authRoutes);
    app.use('/api/dreams',dreamsRouts);
    app.use('/api/profile',profileRoutes);


    const { admin } = require('./config/firebase');

    // קריאה של חלום לפי UID ו־DreamID
    const printDreamById = async (uid, dreamId) => {
    try {
        const db = admin.firestore();
        const dreamRef = db.collection('users').doc(uid).collection('dreams').doc(dreamId);
        const dreamDoc = await dreamRef.get();

        if (!dreamDoc.exists) {
        console.log(`❌ Dream not found for user ${uid} with ID ${dreamId}`);
        return;
        }

        const dreamData = dreamDoc.data();
        console.log(`✅ Dream data for user ${uid}, dream ${dreamId}:\n`);
        console.dir(dreamData, { depth: null });

    } catch (error) {
        console.error('❌ Error fetching dream:', error.message);
    }
    };

    // הפעלת הפונקציה
    const uid = '94ixwXPd9EggX2gpznwfeE61FQs1';
    const dreamId = 'Yo0Z0Mqda5S1VIv7grDG';
    printDreamById(uid, dreamId);


    downloadTagEmbeddings().then(() => {
    app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
    });
    });

    // app.listen(port, () => {
    // console.log(`Server running on port ${port}`);
    // });