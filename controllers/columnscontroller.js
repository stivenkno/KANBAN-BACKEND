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

const updateColumn = async (req, res) => {
  const columns = req.body; // Array de columnas ordenadas
  const idProject = columns[0]?.id_project;

  if (!idProject) {
    return res.status(400).json({ message: "Falta el id_project" });
  }

  try {
    // Iniciar transacción
    await pool.query("BEGIN");

    // 2. Eliminar columnas del proyecto para ese usuario
    await pool.query(
      "DELETE FROM columns WHERE id_project = $1 AND id_user = $2",
      [idProject, req.user.id]
    );

    // 3. Insertar nuevamente las columnas en el orden recibido
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      await pool.query(
        `INSERT INTO columns (id_column, title_column, id_project, id_user, position, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [col.id_column, col.title_column, idProject, req.user.id, i]
      );
    }

    // Confirmar transacción
    await pool.query("COMMIT");

    res.status(200).json({ message: "Columnas actualizadas correctamente" });
  } catch (err) {
    console.error(err);
    await pool.query("ROLLBACK");
    res.status(500).json({ message: "Error al actualizar columnas" });
  }
};

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
