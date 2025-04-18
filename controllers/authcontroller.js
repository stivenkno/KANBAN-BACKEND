import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config.js";
import { JWT_SECRET, JWT_TIMEOUT } from "../varsconfig.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash de la contraseña
    const hashedPassword = await bycrpt.hash(password, 10);

    // Insertar nuevo usuario
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id_user, username, email",
      [username, email, hashedPassword]
    );

    const user = newUser.rows[0];

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result.rows[0];

    if (await bycrpt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id_user }, JWT_SECRET, {
        expiresIn: JWT_TIMEOUT,
      });

      res.status(200).json({ message: "Login successful", user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { register, login };
