/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Team){
  const teamRouter = express.Router();
  teamRouter.route('/teams')
  .post((req, res) => {
    const team = new Team(req.body);
    team.save();
    return res.status(201).json(team);
  })
  .get((req, res) => {
    const query = {};
    if (req.query.team_id){
      query.team_id = req.query.team_id;
    }
    if (req.query.capitan){
      query.capitan = req.query.capitan;
    }
    Team.find(query , (err, teams) => {
      if(err){
        return res.send(err);
      }
      return res.json(teams);
    }
    );
  });
  teamRouter.use('/teams/:teamId', (req, res, next)  => {
    Team.findById(req.params.teamId , (err, team) => {
      if(err){
        return res.send(err);
      }
      if (team){
        req.team = team;
        return next();
      }
      return res.sendStatus(404);
    }
    );
  })
  teamRouter.route('/teams/:teamId')
    .get((req, res) => { res.json(req.team); })
    .put((req, res) => {
      const {team} = req;
      team.team_id = req.body.team_id;
      team.capitan = req.body.capitan;
      team.save();
      return res.json(team);
      })
    .delete((req, res) => {
      req.team.remove((err) => {
        if(err){
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    })
    return teamRouter;
}

module.exports = routes;