const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Conexion a la db
const connectionString = 'mongodb+srv://agustinbava:agusbava1234@cluster0.rhcdf.mongodb.net/fifachampionsdb?retryWrites=true&w=majority';
const db = mongoose.connect(connectionString);

try{
const db = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"));
 } catch (e) {
    console.log("could not connect");
 }

// Modelos para interactuar con la db
const Team = require('./models/teamModel');
const Player = require('./models/playerModel');
const Cup = require('./models/cupModel');
const Subscription = require('./models/subscriptionModel');


// Importar enrutadores segun el endpoint o verbo utilizado
const teamRouter = require('./routes/teamRouter')(Team);
const playerRouter = require('./routes/playerRouter')(Player);
const cupRouter = require('./routes/cupRouter')(Cup);
const subscriptionRouter = require('./routes/subscriptionRouter')(Subscription);


app.use('/api', teamRouter);
app.use('/api', cupRouter);
app.use('/api', subscriptionRouter);
app.use('/api', playerRouter);

app.get('/', (req, res) => {
  res.send('Bienvenidos a la API de FIFA Fut Champions');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
