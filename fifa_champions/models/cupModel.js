const mongoose = require('mongoose');

const {Schema} = mongoose;

const cupModel = new Schema(
  {
    cup_id: {type:String},
    fecha_comienzo: {type:String},
    estado: {type:String},
    recaudacion: {type:Number},
    premio: {type:Number},
    consola: {type:String}
  }
);

module.exports = mongoose.model('Cup', cupModel);