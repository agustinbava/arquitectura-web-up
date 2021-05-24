const mongoose = require('mongoose');

const {Schema} = mongoose;

const teamModel = new Schema(
  {
    team_id: {type:String},
    capitan: {type:String},
  }
);

module.exports = mongoose.model('Team', teamModel);