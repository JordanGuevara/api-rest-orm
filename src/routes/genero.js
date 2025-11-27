const express = require('express');
const router = express.Router();
const Genero = require("../models/genero");

// Obtener todos los géneros 
exports.getAllGeneros = async (req, res) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al obtener los géneros" });
    }
};

// Obtener género por ID
exports.getGeneroById = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findById(id);

        if (!genero) {
            return res.status(404).json({ "mensaje": "No se encontró el género" });
        }
        res.status(200).json(genero);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al obtener el género" });
    }
};

// Creación del género
exports.createGenero = async (req, res) => {
    try {
        const genero = await Genero.create(req.body);
        res.status(201).json(genero);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(400).json({ "mensaje": "Error al crear el género", "details": error.message });
    }
};

// Actualización del género
exports.updateGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!genero) {
            return res.status(404).json({ "mensaje": "No se encontró el género para actualizar" });
        }

        res.status(200).json(genero);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(400).json({ "mensaje": "No se pudo actualizar el género", "details": error.message });
    }
};

// Eliminación del género
exports.deleteGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByIdAndDelete(id);

        if (!genero) {
            return res.status(404).json({ "mensaje": "No se encontró el género para eliminar" });
        }

        res.status(200).json({ "mensaje": "Género eliminado correctamente" });
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al eliminar el género" });
    }
};

router.post('/generos',this.createGenero);
router.get('/generos',this.getAllGeneros);
router.get('/generos/:id',this.getGeneroById);
router.put('/generos/:id',this.updateGenero);
router.delete('/generos/:id',this.deleteGenero);

module.exports = router;