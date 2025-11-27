const express = require('express');
const router = express.Router();
const Libro = require("../models/libro");

// Obtener todos los libros
exports.getAllLibros = async (req, res) => {
    try {
        const libros = await Libro.find()
            .populate('autor_id')
            .populate('genero_id'); 
        res.status(200).json(libros);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al obtener los libros" });
    }
};

// Obtener libro por ID 
exports.getLibroById = async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findById(id)
            .populate('autor_id')
            .populate('genero_id');

        if (!libro) {
            return res.status(404).json({ "mensaje": "No se encontró el libro" });
        }
        res.status(200).json(libro);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al obtener el libro" });
    }
};
// Obtener libros por ID de Autor
exports.getLibrosByAutorId = async (req, res) => {
    try {
        const { id } = req.params;
        const libros = await Libro.find({ autor_id: id })
            .populate('autor_id')
            .populate('genero_id');

        if (libros.length === 0) {
            return res.status(404).json({ "mensaje": `No se encontraron libros para el autor con ID: ${id}` });
        }
        
        res.status(200).json(libros);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al obtener libros por autor", "details": error.message });
    }
};
// Obtener libros por ID de Género
exports.getLibrosByGeneroId = async (req, res) => {
    try {
        const { id } = req.params;
        const libros = await Libro.find({ genero_id: id })
            .populate('autor_id')
            .populate('genero_id');

        if (libros.length === 0) {
            return res.status(404).json({ "mensaje": `No se encontraron libros para el género con ID: ${id}` });
        }
        
        res.status(200).json(libros);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al obtener libros por género", "details": error.message });
    }
};

// Creación del libro
exports.createLibro = async (req, res) => {
    try {
        const libro = await Libro.create(req.body);
        res.status(201).json(libro);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(400).json({ "mensaje": "Error al crear el libro", "details": error.message });
    }
};

// Actualización del libro 
exports.updateLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!libro) {
            return res.status(404).json({ "mensaje": "No se encontró el libro para actualizar" });
        }

        res.status(200).json(libro);
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(400).json({ "mensaje": "No se pudo actualizar el libro", "details": error.message });
    }
};

// Eliminación del libro 
exports.deleteLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findByIdAndDelete(id);

        if (!libro) {
            return res.status(404).json({ "mensaje": "No se encontró el libro para eliminar" });
        }

        res.status(200).json({ "mensaje": "Libro eliminado correctamente" });
    } catch (error) {
        console.log("ERROR: " + error);
        res.status(500).json({ "mensaje": "Error al eliminar el libro" });
    }
};

router.post('/libros', this.createLibro);
router.get('/libros', this.getAllLibros);
router.get('/libros/:id', this.getLibroById);
router.get('/libros/autor/:id', this.getLibrosByAutorId);
router.get('/libros/genero/:id', this.getLibrosByGeneroId);
router.put('/libros/:id', this.updateLibro);
router.delete('/libros/:id', this.deleteLibro);

module.exports = router;