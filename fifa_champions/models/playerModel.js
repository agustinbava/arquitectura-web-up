const mongoose = require('mongoose');

const {Schema} = mongoose;

const playerModel = new Schema(
  {
    dni: {type:String},
    nya: {type:String},
    tel_contacto: {type:String},
    esCapitan: {type:String}
  }
);

module.exports = mongoose.model('Player', playerModel);