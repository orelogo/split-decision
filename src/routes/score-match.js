import express from 'express';
import dbAdapter from '../dbAdapter';
import hbs from 'hbs';
import _ from 'lodash';

let router = express.Router();

router.get('/', (req, res, next) => {

  let matchId = req.query.match_id;

  dbAdapter.getMatch(matchId).then((result) => {
    res.render('score-match', result);
  });

  console.log('GET score-match');
});

module.exports = router;
