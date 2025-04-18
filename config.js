import pkg from "pg";
const { Pool } = pkg;
import { DB_URL } from "./varsconfig.js";

import query from "./database/db.js";

// Configuración de la base de datos
const pool = new Pool({
  connectionString: DB_URL, //URL de la base de datos
  ssl: {
    rejectUnauthorized: false,
  },
});

// Prueba de conexión
(async () => {
  try {
    const client = await pool.connect();
    console.log("Conexión exitosa a PostgreSQL");

    // Realizar una consulta de prueba
    const res = await client.query("SELECT NOW() AS current_time");
    console.log("Hora actual en la base de datos:", res.rows[0].current_time);

    client.release(); // Liberar el cliente
  } catch (err) {
    console.error("Error al conectar a PostgreSQL:", err);
  }
})();

const createTables = async () => {
  try {
    await pool.query(query);
    console.log("Initial tables created.");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

createTables();

export default pool;
