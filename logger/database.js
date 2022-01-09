const mysql = require('mysql2');
const config = require('../config/pool');

module.exports = mysql.createPool(config);
