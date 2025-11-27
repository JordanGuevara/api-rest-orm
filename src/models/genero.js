const mongoose = require('mongoose');

const GeneroSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('genero', GeneroSchema);