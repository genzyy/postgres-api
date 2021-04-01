const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/queries');
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  res.json({ info: 'Nodejs, Express and Postgres API' });
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserbyId);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(3000, () => {
  console.log('Server started running...');
});
