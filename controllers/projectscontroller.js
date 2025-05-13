import pool from "../config.js";

const getprojects = async (req, res) => {
  try {
    console.log(req.user);
    const result = await pool.query(
      "SELECT * FROM projects WHERE id_user = $1",
      [req.user.id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProject = async (req, res) => {
  const { title_project } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO projects (title_project, id_user) VALUES ($1, $2) RETURNING *",
      [title_project, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProject = async (req, res) => {
  const { id_project } = req.body;
  try {
    await pool.query("DELETE FROM columns WHERE id_project = $1", [id_project]);

    const result = await pool.query(
      "DELETE FROM projects WHERE id_project = $1",
      [id_project]
    );

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id_project, title_project } = req.body;

    const result = await pool.query(
      "UPDATE projects SET title_project = $1 WHERE id_project = $2",
      [title_project, id_project]
    );

    res.status(200).json({ message: "Project updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getprojects, createProject, updateProject, deleteProject };
