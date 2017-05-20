import express from 'express';
import ufcapi from '../ufcapi';
import hbs from 'hbs';
import _ from 'lodash';

let router = express.Router();

router.get('/', (req, res, next) => {

  let eventId = req.query.id;

  ufcapi.getMatches(eventId, (err, apiRes, body) => {
    res.render('matches', getTrimMatches(body, req.query));
  });
  console.log('GET matches for event id: ' + eventId);
});

/**
 * [getTrimMatches description]
 * @param  {Object[]} matches unfiltered matches from UFC API
 * @param  {Object}   event   event object
 * @return {Object}           trimmed matches and event information
 */
function getTrimMatches(matches, event) {
  let filteredMatches = matches.map((match) => {
      return _.pick(match, [
        'id',
        'event_id',
        'fightcard_order',
        'fighter1_id',
        'fighter2_id',
        'fighter1_first_name',
        'fighter1_nickname',
        'fighter1_last_name',
        'fighter2_first_name',
        'fighter2_nickname',
        'fighter2_last_name',
        'fighter1_full_body_image',
        'fighter2_full_body_image',
        'fighter1_weight_class',
        'fighter2_weight_class'
      ]);
    });

    return {
      base_title: event.base_title,
      title_tag_line: event.title_tag_line,
      matches: filteredMatches
    };
}

module.exports = router;
