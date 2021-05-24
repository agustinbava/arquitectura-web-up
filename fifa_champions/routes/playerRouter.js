/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Player){
  const playerRouter = express.Router();
  playerRouter.route('/players')
  .post((req, res) => {
    const player = new Player(req.body);
    player.save();
    return res.status(201).json(player);
  })
  .get((req, res) => {
    const query = {};
    if (req.query.player_id){
      query.player_id = req.query.player_id;
    }
    if (req.query.capitan){
      query.capitan = req.query.capitan;
    }
    Player.find(query , (err, players) => {
      if(err){
        return res.send(err);
      }
      return res.json(players);
    }
    );
  });
  playerRouter.use('/players/:playerId', (req, res, next)  => {
    Player.findById(req.params.playerId , (err, player) => {
      if(err){
        return res.send(err);
      }
      if (player){
        req.player = player;
        return next();
      }
      return res.sendStatus(404);
    }
    );
  })
  playerRouter.route('/players/:playerId')
    .get((req, res) => { res.json(req.player); })
    .put((req, res) => {
      const {player} = req;
      player.player_id = req.body.player_id;
      player.capitan = req.body.capitan;
      player.save();
      return res.json(player);
      })
    .delete((req, res) => {
      req.player.remove((err) => {
        if(err){
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    })
    return playerRouter;
}

module.exports = routes;