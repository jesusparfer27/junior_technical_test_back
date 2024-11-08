import { connectDB, Furniture, FurnitureNav } from "../data/mongodb.js";

connectDB();

export const getInfo = async (req, res, next) => {
    try {
        console.log("Intentando obtener los muebles...");
        const furniture = await Furniture.find();
        console.log("Resultados obtenidos:", furniture);
        if (furniture.length === 0) {
            console.log("No se encontraron muebles.");
            return res.status(404).json({ message: "No se encontraron muebles." });
        }
        res.status(200).json(furniture)
    } catch (e) {
        console.error("Error al obtener los muebles:", e.message);
        res.status(500).json({ message: e.message });
    }
};

export const getInfoNav = async (req, res, next) => {
    try {
        console.log("Intentando obtener los muebles...");
        const furnitureNav = await FurnitureNav.find();
        console.log("Resultados obtenidos:", furnitureNav);
        if (furnitureNav.length === 0) {
            console.log("No se encontraron muebles.");
            return res.status(404).json({ message: "No se encontraron muebles." });
        }
        res.status(200).json(furnitureNav)
    } catch (e) {
        console.error("Error al obtener los muebles:", e.message);
        res.status(500).json({ message: e.message });
    }
};

