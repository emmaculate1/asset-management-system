const mysql = require('mysql2');
const fs = require('fs');

// Create connection using standard mysql (not promise-based)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    return;
  }
  
  console.log('✅ Connected to MySQL successfully');
  
  // Read and execute the setup script
  const setupScript = fs.readFileSync('./setup.sql', 'utf8');
  
  connection.query(setupScript, (error, results) => {
    if (error) {
      console.error('❌ Database setup failed:', error.message);
      connection.end();
      return;
    }
    
    console.log('✅ Database setup completed successfully!');
    console.log('📊 Database "assetdb" created with all tables and sample data');
    console.log('👤 Admin user: admin / admin123');
    connection.end();
  });
});
