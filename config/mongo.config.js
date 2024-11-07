import dotenv from 'dotenv'

import path from 'path';
export const __dirname = path.resolve()

const result = dotenv.config();
if (result.error) {
    throw new Error("Error al cargar las variables de entorno " + result.error)
}

export const HOST = process.env.HOST || "http://localhost";
export const PORT = process.env.PORT || 3001


export const mongodbUri = process.env.MONGODB_URI