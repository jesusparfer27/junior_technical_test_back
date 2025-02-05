    import dotenv from 'dotenv'
    import path from 'path';
    import { fileURLToPath } from 'url';

    dotenv.config(); // Carga las variables de entorno desde el archivo .env a process.env.

    const __filename = fileURLToPath(import.meta.url);
    export const __dirname = path.dirname(__filename);  // Calculamos __dirname

    export const HOST = process.env.HOST || "http://localhost:4001";
    export const PORT = process.env.PORT || 4001

    export const mongodbUri = process.env.MONGODB_URI
