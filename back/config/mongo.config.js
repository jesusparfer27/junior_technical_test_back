import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

if (process.env.NODE_ENV !== 'production') {
    const result = dotenv.config();
    if (result.error) {
        throw new Error("Error al cargar las variables de entorno " + result.error);
    }
}

export const _dirname = path.dirname(_filename);
export const HOST = process.env.HOST || "http://localhost";
export const PORT = process.env.PORT || 3001


export const mongodbUri = process.env.MONGODB_URI