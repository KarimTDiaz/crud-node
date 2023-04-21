const fs = require('fs');
const path = require('path');
const usersFile = path.resolve(__dirname, '../../data/users.json');
const { v4 } = require('uuid');
const controller = {};

controller.allUsers = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res
        .status(500)
        .send('Error al leer el archivo de usuarios, sorry');
    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
};

controller.userId = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res
        .status(500)
        .send('Error al leer el archivo de usuarios, sorry');
    const jsonData = JSON.parse(data);
    const user = jsonData.find(user => req.params.id === user.userId);
    res.send(user);
  });
};

controller.createUser = (req, res) => {
  const newData = req.body;
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res
        .status(500)
        .send('Error al leer el archivo de usuarios, sorry');
    const jsonData = JSON.parse(data);
    const userError = jsonData.some(user => user.email === newData.email);
    if (userError) {
      return res.status(409).send('El correo ya ha sido utilizado');
    }
    const dataWithId = { userId: v4(), ...newData };
    jsonData.push(dataWithId);
    fs.writeFile(usersFile, JSON.stringify(jsonData), err => {
      if (err)
        return res
          .status(500)
          .send('Error al escribir el archivo de usuarios, sorry');
    });
  });
};

controller.deleteUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res
        .status(500)
        .send('Error al leer el archivo de usuarios, sorry');
    const jsonData = JSON.parse(data);
    const user = jsonData.findIndex(user => req.params.id === user.userId);
    if (user === -1) {
      return res
        .status(404)
        .send('No se encuentra el usuario que desea eliminar');
    }
    jsonData.splice(user, 1);
    fs.writeFile(usersFile, JSON.stringify(jsonData), err => {
      if (err) throw err;
      return res.staus(201).send('Usuario borrado correctamnte');
    });
  });
};

controller.updateUser = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err)
      return res
        .status(500)
        .send({ message: 'Error al leer el archivo de usuarios, sorry' });
    const jsonData = JSON.parse(data);
    console.log(req.body.email);
    if (req.body.email) {
      const userError = jsonData.some(user => user.email === req.body.email);
      if (userError) {
        return res
          .status(409)
          .send({ message: 'El correo ya ha sido utilizado' });
      }
    }
    const userIndex = jsonData.findIndex(user => req.params.id === user.userId);
    if (userIndex === -1) {
      return res
        .status(404)
        .send({ message: 'No se encuentra el usuario que desea eliminar' });
    }
    const user = jsonData[userIndex];
    const newData = { ...user, ...req.body };
    jsonData.splice(userIndex, 1, newData);
    fs.writeFile(usersFile, JSON.stringify(jsonData), err => {
      if (err) throw err;
    });
  });
};
module.exports = controller;
