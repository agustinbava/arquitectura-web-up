/* eslint-disable no-param-reassign */
const express = require('express');

function routes(Subscription){
  const subscriptionRouter = express.Router();
  subscriptionRouter.route('/subscriptions')
  .post((req, res) => {
    const subscription = new Subscription(req.body);
    subscription.save();
    return res.status(201).json(subscription);
  })
  .get((req, res) => {
    const query = {};
    if (req.query.subscription_id){
      query.subscription_id = req.query.subscription_id;
    }
    if (req.query.capitan){
      query.capitan = req.query.capitan;
    }
    Subscription.find(query , (err, subscriptions) => {
      if(err){
        return res.send(err);
      }
      return res.json(subscriptions);
    }
    );
  });
  subscriptionRouter.use('/subscriptions/:subscriptionId', (req, res, next)  => {
    Subscription.findById(req.params.subscriptionId , (err, subscription) => {
      if(err){
        return res.send(err);
      }
      if (subscription){
        req.subscription = subscription;
        return next();
      }
      return res.sendStatus(404);
    }
    );
  })
  subscriptionRouter.route('/subscriptions/:subscriptionId')
    .get((req, res) => { res.json(req.subscription); })
    .put((req, res) => {
      const {subscription} = req;
      subscription.subscription_id = req.body.subscription_id;
      subscription.capitan = req.body.capitan;
      subscription.save();
      return res.json(subscription);
      })
    .delete((req, res) => {
      req.subscription.remove((err) => {
        if(err){
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    })
    return subscriptionRouter;
}

module.exports = routes;