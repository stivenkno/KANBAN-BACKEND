import pool from "../config.js";

const createColumn = async (req, res) => {
  const { title_column, id_project } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO columns (title_column, id_project, id_user) VALUES ($1, $2, $3) RETURNING *",
      [title_column, id_project, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getcolumns = async (req, res) => {
  try {
    console.log(req.user);
    const result = await pool.query(
      "SELECT * FROM columns WHERE id_user = $1",
      [req.user.id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateColumn = async (req, res) => {};

const deleteColumn = async (req, res) => {
  const { id_column } = req.body;
  try {
    await pool.query("DELETE FROM tasks WHERE id_column = $1", [id_column]);

    const result = await pool.query(
      "DELETE FROM columns WHERE id_column = $1",
      [id_column]
    );

    res.status(200).json({ message: "Column deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getcolumns, createColumn, updateColumn, deleteColumn };
