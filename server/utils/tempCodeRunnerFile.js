import mysql from 'mysql'

const con = mysql.createConnection({
  host: 'localhost',      // MySQL server host (default is localhost)
  user: 'root',           // MySQL user (default is 'root')
  password: '',           // MySQL password (leave empty if no password)
  database: 'LibTracker' // Your database name
})

// Connect to the database
con.connect(function(err) {
  if (err) {
    console.log('Error connecting to MySQL: ', err.message);
  } else {
    console.log('Connected to MySQL database!');
  }
})

export default con;