const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns'); // Importar módulo DNS
const connectDB = require('./config/db');

// Configuración de variables de entorno
dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Conectar a la Base de Datos
connectDB();

const app = express();

// Middlewares Globales
app.use(express.json()); // Permite recibir JSON en los POST
app.use(cors()); // Permite peticiones desde otro dominio (Front)

// Ruta de prueba inicial (para verificar que anda)
app.get('/', (req, res) => {
    res.send('API de Recetas funcionando');
});

// Configuración del Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});