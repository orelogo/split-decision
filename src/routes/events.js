import express from 'express';
import dbAdapter from '../dbAdapter';
import hbs from 'hbs';
import _ from 'lodash';

let router = express.Router();

router.get('/', (req, res, next) => {
  dbAdapter.queryLatestEvents().then((result) => {
      res.render('events', { events: result });
    });
  console.log('GET events');
});


module.exports = router;
