import express from 'express';

let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('events', { eventName: 'UFC 100' });
  console.log('GET events');
});

module.exports = router;
