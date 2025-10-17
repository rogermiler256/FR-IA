// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Necesario para usar __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir los archivos del build (React o Vite)
app.use(express.static(path.join(__dirname, "dist"))); // cambia "dist" por "build" si usas CRA

// Todas las rutas apuntan al index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html")); // o "build"
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});
