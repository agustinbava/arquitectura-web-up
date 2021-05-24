const mongoose = require('mongoose');

const {Schema} = mongoose;

const subscriptionModel = new Schema(
  {
    subscribed_id: {type:String},
    cup_id: {type:String},
    team_id: {type:String},
    valor_entrada: {type:Number}
  }
);

module.exports = mongoose.model('Subscription', subscriptionModel);