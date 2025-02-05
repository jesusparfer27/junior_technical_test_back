import express from 'express'; // Framework para crear el servidor.
import cors from 'cors'; // Permite solicitudes de otros dominios.
import { PORT, HOST } from '../config/mongo.config.js'; // Configuración del puerto y dominio.
import mongoRoutes from '../lib/routes.js'; // Rutas de la API para MongoDB.
import path from 'path'; // Manejo de rutas de archivos.
import { fileURLToPath } from 'url'; // Resuelve rutas en ES Modules.
import fs from 'fs'; // Acceso al sistema de archivos.

const app = express();

// Define __dirname para usar rutas absolutas en ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 


// Crea el directorio de imágenes si no existe.
const uploadDir = path.resolve(__dirname, '../public/images'); 
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });  // Crea directorios necesarios.
    console.log("Directorio './public/images' creado");
}

// Configura middlewares para CORS, JSON y datos codificados en URL.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirve archivos estáticos desde '/public/images'.
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Ruta principal de bienvenida.
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <h1>Bienvenidos a nuestra REST-API</h1>
    <p>Servidor iniciado en ${HOST}</p>
  `);
});

// Agrega las rutas de la API en el prefijo '/API/v1'.
app.use('/API/v1', mongoRoutes);

// Inicia el servidor en el puerto configurado.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;