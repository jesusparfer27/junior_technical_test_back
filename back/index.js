import express from 'express'
import cors from 'cors'
import { HOST, PORT } from './config/mongo.config.js'
import mongoRoutes from './lib/routes.js'
import path from 'path'
import { connectDB } from './data/mongodb.js';


const app = express()

connectDB();

// comment


app.use(cors());
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


// Rutas para mongoDB
app.use('/API/v1/mongo', mongoRoutes)

app.listen(PORT, () => {
    console.log(`Iniciando API en ${HOST}:${PORT}`)
})