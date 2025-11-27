const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  nacionalidad: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('autor', AutorSchema);