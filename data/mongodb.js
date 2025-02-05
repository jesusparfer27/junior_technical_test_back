import mongoose from 'mongoose';
import { mongodbUri } from '../config/mongo.config.js';

// crear una conexión
const connectDB = async () => {
    try {
        console.log("Iniciando la conexión a MongoDB..."); 

        if (!mongodbUri) {
            throw new Error("❌ Error: La URI de MongoDB no está definida. Verifica tu archivo de configuración.");
        }

        await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ MongoDB conectado correctamente a la base de datos");
    } catch (e) {
        console.error("❌ Error conectando a MongoDB:", e.message);
        console.error("🔍 Verifica que la URI sea correcta y que MongoDB esté en ejecución.");
        process.exit(1); // Detiene la ejecución si no se puede conectar
    }
};

// crear nuestro esquema
const furnitureSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Furniture',
    },
    designer: {
        type: String,
        required: true,
        unique: true  // El diseñador puede ser único
    },
    furniture_type: {
        type: String,
        required: true, // El tipo de mueble no necesita ser único
    },
    furniture_description: {
        type: String,
        required: true, // Tampoco necesitas que la descripción sea única
    },
    image: {
        type: String,
        required: true // Puede no ser necesario que la imagen sea única
    }
}, { timestamps: true,
    strict: false,
    versionKey: false
 }); // timestamps añadirá automáticamente los campos createdAt y updatedAt

 const furnitureNavSchema = new mongoose.Schema ({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FurnitureNav"
    },
    image: {
        type: String,
        required: true // Puede no ser necesario que la imagen sea única
    }
 }, { timestamps: true,
    strict: false,
    versionKey: false
 })

console.log("Esquema de muebles creado")

const Furniture = mongoose.model('Furniture', furnitureSchema, 'furniture_information_home');
const FurnitureNav = mongoose.model('FurnitureNav', furnitureNavSchema, 'furniture-information-menu')

console.log("Modelo Furniture creado y listo para usarse");

export { connectDB, Furniture, FurnitureNav}
