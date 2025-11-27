const mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  editorial: String,
  autor_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'autor',
    required: true 
  },
  genero_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'genero',
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('libro', LibroSchema);