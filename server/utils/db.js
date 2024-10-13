import mysql from 'mysql';
function handleDisconnect() {
  const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'lib_tracker'
  });

  con.connect((err) => {
    if (err) {
      console.log('Error when connecting to database:', err);
      setTimeout(handleDisconnect, 2000);  // Try reconnecting after 2 seconds
    } else {
      console.log('Connected to MySQL database');
    }
  });

  con.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();  // Reconnect if the connection is lost
    } else {
      throw err;
    }
  });

  return con;
}

const connection = handleDisconnect();
export default connection;
