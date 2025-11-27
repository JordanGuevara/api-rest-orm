const express = require('express');
const router = express.Router();
const Autor = require("../models/autor"); 

// Obtener todos los autores
exports.getAllAutores = async (req, res) => {
    try {
        const autores = await Autor.find();
        res.status(200).json(autores);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al obtener a los autores" });
    }
};

// Obtener autor por ID
exports.getAutorById = async (req, res) => {
    try {
        const { id } = req.params;
        const autor = await Autor.findById(id);

        if (!autor) {
            return res.status(404).json({ "mensaje": "No se encontró el autor" });
        }
        res.status(200).json(autor);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al obtener el autor" });
    }
};

// Creación del autor
exports.createAutor = async (req, res) => {
    try {
        const autor = await Autor.create(req.body);
        res.status(201).json(autor);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(400).json({ "mensaje": "Error al crear el autor", "details": error.message });
    }
};

// Actualización del autor
exports.updateAutor = async (req, res) => {
    try {
        const { id } = req.params;
        const autor = await Autor.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!autor) {
            return res.status(404).json({ "mensaje": "No se encontró el autor para actualizar" });
        }

        res.status(200).json(autor);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(400).json({ "mensaje": "No se pudo actualizar el autor", "details": error.message });
    }
};

// Eliminación del autor
exports.deleteAutor = async (req, res) => {
    try {
        const { id } = req.params;
        const autor = await Autor.findByIdAndDelete(id);

        if (!autor) {
            return res.status(404).json({ "mensaje": "No se encontró el autor para eliminar" });
        }

        res.status(200).json({ "mensaje": "Autor eliminado correctamente" });
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al eliminar el autor" });
    }
};
router.post('/autores',this.createAutor);
router.get('/autores',this.getAllAutores);
router.get('/autores/:id',this.getAutorById);
router.put('/autores/:id',this.updateAutor);
router.delete('/autores/:id',this.deleteAutor);

module.exports = router;