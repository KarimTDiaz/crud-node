const express = require('express');
const app = express();
const path = require('path');
const usersFile = path.resolve(__dirname, '../data/users.json');
const fs = require('fs');
const userRoutes = require('./routes/users.routes');

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));

app.use('/api/users', userRoutes);
