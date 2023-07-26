const mysql = require("mysql")
const db_manager = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Aryan16@29",
    database: "mysql",
    connectionLimit: 10,
  });
  
  db_manager.query(
    `CREATE TABLE IF NOT EXISTS tasksx(
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_name TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`,
    (err, result) => {
      if (err) {
        console.log("Error executing query:", err);
      } else {
        console.log("Query result:", result);
      }
    }
  );
  
  db_manager.getConnection((err, connection) => {
    if (err) {
      console.log("Error connecting to the database:", err);
    } else {
      console.log("Connected successfully");
      // You can release the connection when done using it.
      connection.release();
    }
  });
module.exports = db_manager;
