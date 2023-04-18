const express = require('express');
const app = express();
const path = require('path');
const usersFile = path.resolve(__dirname, '../data/users.json');

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));
