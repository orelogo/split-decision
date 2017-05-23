import express from 'express';
import dbAdapter from '../dbAdapter';
import hbs from 'hbs';
import _ from 'lodash';

let router = express.Router();

router.get('/', (req, res, next) => {

  let eventId = req.query.id;

  dbAdapter.queryMatches(eventId).then((result) => {
    res.render('matches', {
      base_title: req.query.base_title,
      title_tag_line: req.query.title_tag_line,
      matches: result
    });
  });

  console.log('GET matches');
});

module.exports = router;
