const mysql = require('mysql2');
module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'muaaz',
  password: 'newpassword',
  database: 'sampleApp',
});
