const db_manager = require("./connection");

exports.getTask = (collback) => {
  try {
    const query = `SELECT * FROM TASKS;`;
    db_manager.query(query, (err, result) => {
      if (err) {
        console.log(err)
      }
      collback(result);
    });
  } catch (err) {
    console.log(err)
  }
};

exports.addTask = (task_name, collback) => {
  try {
    const query = `INSERT INTO TASKS (task_name) VALUES ('${task_name}');`;
    db_manager.query(query, (err) => {
      if (err) {
        console.log(err)
      }
      const subQuery = `SELECT * FROM TASKS ORDER BY ID DESC LIMIT 1;`;
      db_manager.query(subQuery, (err, result) => {
        if (err) {
          console.log(err)
        }
        collback(result);
      });
    });
  } catch (err) {
    console.log(err)
  }
};
exports.updataStatus = (id, collback) => {
  try {
    const query = `UPDATE TASKS SET COMPLETED = TRUE WHERE ID = ${id};`;
    db_manager.query(query, (err) => {
      if (err) {
        console.log(err)
      }
      const subQuery = `SELECT * FROM TASKS WHERE ID = ${id}`;
      db_manager.query(subQuery, (err, result) => {
        if (err) {
          console.log(err)
        }
        if (result.length < 0) throw new Error("No record fount with given Id");
        else collback(result);
      });
    });
  } catch (err) {
    console.log(err)
  }
};
exports.deleteTask = (id, collback) => {
  try {
    const query = `DELETE FROM TASKS WHERE ID = ${id};`;
    db_manager.query(query, (err, result) => {
      if (err) {
        console.log(err)
      }
      collback(result);
    });
  } catch (err) {
    console.log(err)
  }
};
