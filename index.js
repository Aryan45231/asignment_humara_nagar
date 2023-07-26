const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 9090;
const taskQueries = require("./services/tasks");
app.get("/tasks", (req, res) => {
  try {
    taskQueries.getTask((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: err.message });
  }
});
app.post("/tasks", async (req, res) => {
  try {
    const { task_name } = req.body;
    console.log(task_name);
    taskQueries.addTask(task_name, (result) => {
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: err.message });
  }
});
app.patch("/tasks/:id", (req, res) => {
  try {
    const { id } = req.params;
    taskQueries.updataStatus(id, (result) => {
      res.status(200).json(result[0]);
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: err.message });
  }
});
app.delete("/tasks/:id", (req, res) => {
  try {
    const { id } = req.params;
    taskQueries.deleteTask(id, (result) => {
      res.status(200).json({ message: "SuccessFully Deleted" });
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ err: err.message });
  }
});
app.listen(port, () => {
  console.log(` server is at ${port}`);
});
