const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Variables inyectadas desde ConfigMap y Secret
const port = process.env.APP_PORT || 3000;
const dbHost = process.env.DB_HOST || 'mongo-service';
const dbName = process.env.DB_NAME || 'practica_db';
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// Cadena de conexión autenticada hacia MongoDB (ClusterIP)
const mongoURI = `mongodb://${dbUser}:${dbPass}@${dbHost}:27017/${dbName}?authSource=admin`;

let dbStatus = 'Desconectado ❌';

mongoose.connect(mongoURI)
  .then(() => {
    dbStatus = 'Conectado exitosamente a MongoDB ✅';
    console.log(dbStatus);
  })
  .catch((err) => {
    dbStatus = `Error de conexión: ${err.message}`;
    console.error(dbStatus);
  });

// Ruta principal para validar en el navegador (Captura 3)
app.get('/', (req, res) => {
  res.json({
    proyecto: 'Práctica S08 - AP6 Kubernetes',
    estado_backend: 'Activo 🚀',
    estado_base_datos: dbStatus,
    configuracion_cargada: {
      DB_HOST: dbHost,
      DB_NAME: dbName,
      APP_PORT: port,
      DB_USER: dbUser ? '***CONFIGURADO***' : 'NO DEFINIDO'
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});