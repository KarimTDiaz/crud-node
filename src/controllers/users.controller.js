const fs = require('fs');
const path = require('path');
const usersFile = path.resolve(__dirname, '../../data/users.json');

const controller = {};

controller.allUsers = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    res.send(jsonData);
  });
};

controller.userId = (req, res) => {
  fs.readFile(usersFile, (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    const user = jsonData.find(user => req.params.id === user.userId);
    res.send(user);
  });
};

module.exports = controller;
