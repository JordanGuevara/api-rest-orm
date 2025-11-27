const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/biblioteca_db'; 
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI); 
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;