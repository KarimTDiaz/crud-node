const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const usersFile = path.resolve(__dirname, '../data/users.json');
const fs = require('fs');
const userRoutes = require('./routes/users.routes');
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));
