// authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  // Verificar si el token está presente
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Token no proporcionado." });
  } else {
    console.log(token);
  }

  try {
    // Extraer el token sin el prefijo "Bearer"
    const tokenValue = token.split(" ")[1];

    // Verificar el token con la clave secreta
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    // Adjuntar el usuario al request
    req.user = decoded;
    console.log(req.user);
    next(); // Continuar con la siguiente función
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
};

export default authMiddleware;
