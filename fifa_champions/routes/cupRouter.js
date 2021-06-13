/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Cup){
  const cupRouter = express.Router();
  cupRouter.route('/cups')
  .post((req, res) => {
    const cup = new Cup(req.body);
    cup.save();
    return res.status(201).json(cup);
  })
  .get((req, res) => {
    const query = {};
    if (req.query.cup_id){
      query.cup_id = req.query.cup_id;
    }
    if (req.query.fecha_comienzo){
      query.fecha_comienzo = req.query.fecha_comienzo;
    }
    if (req.query.recaudacion){
      query.recaudacion = req.query.recaudacion;
    }
    if (req.query.premio){
      query.premio = req.query.premio;
    }
    if (req.query.consola){
      query.consola = req.query.consola;
    }
    Cup.find(query , (err, cups) => {
      if(err){
        return res.send(err);
      }
      return res.json(cups);
    }
    );
  });
  cupRouter.use('/cups/:cupId', (req, res, next)  => {
    Cup.findById(req.params.cupId , (err, cup) => {
      if(err){
        return res.send(err);
      }
      if (cup){
        req.cup = cup;
        return next();
      }
      return res.sendStatus(404);
    }
    );
  })
  cupRouter.route('/cups/:cupId')
    .get((req, res) => { res.json(req.cup); })
    .put((req, res) => {
      const {cup} = req;
      cup.cup_id = req.body.cup_id;
      cup.capitan = req.body.capitan;
      cup.save();
      return res.json(cup);
      })
    .delete((req, res) => {
      req.cup.remove((err) => {
        if(err){
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    })
    return cupRouter;
}

module.exports = routes;