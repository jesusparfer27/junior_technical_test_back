import { Furniture, FurnitureNav } from "../data/mongodb.js";
import { connectDB } from "../data/mongodb.js";

connectDB();

export const getInfo = async (req, res, next) => {
    try {
        const furniture = await Furniture.find();
        if (furniture.length === 0) {
            return res.status(404).json({ message: "No se encontraron muebles." });
        }
        res.status(200).json(furniture);
    } catch (e) {
        console.error("Error al obtener los muebles:", e.message);
        res.status(500).json({ message: e.message });
    }
};

export const getInfoNav = async (req, res, next) => {
    try {
        const furnitureNav = await FurnitureNav.find();
        if (furnitureNav.length === 0) {
            return res.status(404).json({ message: "No se encontraron muebles." });
        }
        res.status(200).json(furnitureNav);
    } catch (e) {
        console.error("Error al obtener los muebles:", e.message);
        res.status(500).json({ message: e.message });
    }
};
