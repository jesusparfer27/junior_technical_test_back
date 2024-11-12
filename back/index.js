import express from 'express'
import cors from 'cors'
import { HOST, PORT } from './config/mongo.config.js'
import mongoRoutes from './lib/routes.js'
import path from 'path'
import { connectDB } from './data/mongodb.js';
import { __dirname } from './config.js';


const app = express()

connectDB();

// comment


const corsOptions = {
    origin: 'https://junior-technical-test-front.vercel.app', // Cambia esto al dominio de tu frontend
    optionsSuccessStatus: 200 // Para navegadores antiguos que requieren esta opción
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")))

app.get('/', ( req , res ) => {

    res.setHeader("Content-Type", "text/html")

    const landingHTML = `
        <h1>Bienvenidos a nuestra REST-API</h1>
        <p>Servidor uniciado en ${HOST}:${PORT}</p>
    `;

    res.status(200).send(landingHTML)
})


// Rutas para mongoDB
app.use('/API/v1/mongo', mongoRoutes)

app.listen(PORT, () => {
    console.log(`Iniciando API en ${HOST}:${PORT}`)
})