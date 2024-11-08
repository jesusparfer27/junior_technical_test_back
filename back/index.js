import express from 'express'
import cors from 'cors'
import { HOST, PORT } from './config/mongo.config.js'
import mongoRoutes from './lib/routes.js'
import path from 'path'
import { connectDB } from './data/mongodb.js'

connectDB();

const app = express()

app.use(cors({
    origin: 'https://junior-technical-test-front.vercel.app', // dominio de frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json())
app.use(express.urlencoded({extended:true}))

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")))

app.get('/', ( req , res ) => {

    res.setHeader("Content-Type", "text/html")

    const landingHTML = `
        <h1>Bienvenidos a nuestra REST-API</h1>
        <p>Servidor uniciado en ${HOST}:${PORT}</p>
    `;

    res.status(200).send(landingHTML)
})

app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.error('Error en el servidor:', error);
    res.status(error.status || 500).json({
        message: error.message || 'Ocurrió un error en el servidor',
        status: error.status || 500
    });
});

// Rutas para mongoDB
app.use('/API/v1/mongo', mongoRoutes)

app.listen(PORT, () => {
    console.log(`Iniciando API en ${HOST}:${PORT}`)
})