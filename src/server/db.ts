import * as mysql from 'mysql2';

const connection = mysql.createConnection({
  host: '3.35.149.40',
  port: 3306,
  user: 'jptest',
  password: 'jjamphong1q',
  database: 'jjamphong',
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

export default connection;
