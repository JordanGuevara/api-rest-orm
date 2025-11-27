const express = require('express');
const connectDB = require('./db');
const autorRoutes = require('./routes/autor');
const generoRoutes = require('./routes/genero');
const libroRoutes = require('./routes/libro');

connectDB(); 

const app = express();

app.use(express.json());

app.use('/api', autorRoutes);
app.use('/api', generoRoutes);
app.use('/api', libroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});