import pool from "../config.js";

const gettasks = async (req, res) => {
  try {
    console.log(req.user);
    const result = await pool.query("SELECT * FROM tasks WHERE id_user = $1", [
      req.user.id,
    ]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  const { title_task, id_project } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title_task, id_project, id_user) VALUES ($1, $2, $3) RETURNING *",
      [title_task, id_project, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id_task } = req.body;

    const result = await pool.query("DELETE FROM tasks WHERE id_task = $1", [
      id_task,
    ]);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id_task, title_task } = req.body;

    const result = await pool.query(
      "UPDATE tasks SET title_task = $1 WHERE id_task = $2",
      [title_task, id_task]
    );

    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { gettasks, createTask, deleteTask, updateTask };
