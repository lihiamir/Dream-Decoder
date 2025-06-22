const app = require('./app');
const port = process.env.PORT || 3000;

// Loads environment variables 
require('dotenv').config();

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
