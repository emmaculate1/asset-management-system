const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const assetRoutes = require('./routes/assetRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Test DB connection on startup
const pool = require('./models/Asset').pool;
pool.getConnection()
  .then(conn => {
    console.log('✅  MySQL (XAMPP) connected successfully');
    conn.release();
  })
  .catch(err => console.error('❌  MySQL connection error:', err.message));

app.use('/api/assets', assetRoutes);

app.listen(PORT, () => console.log(`🚀  Server running on http://localhost:${PORT}`));