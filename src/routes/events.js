import express from 'express';
import ufcapi from '../ufcapi';
import hbs from 'hbs';
import _ from 'lodash';

let router = express.Router();

router.get('/', (req, res, next) => {
  ufcapi.getEvents((err, apiRes, body) => {
    res.render('events', getFilteredEvents(body));
  });
  console.log('GET events');
});

/**
 * Filter events from ufc api to include only those that have occured within
 * the past 60 days
 *
 * @param  {Object[]} events unfiltered events from UFC API
 * @return {Object}          filtered, trimmed events
 */
function getFilteredEvents(events) {
  const msRange = 1000 * 60 * 60 * 24 * 60; // 60 days
  let currentTime = Date.now();

  let filteredEvents = events.filter((event) => {
      let difference = currentTime - new Date(event.event_date).getTime();
      return difference > 0 && difference <= msRange;
    })
    .map((event) => {
      return _.pick(event, [
        'id',
        'event_date',
        'base_title',
        'title_tag_line',
        'feature_image'
      ]);
    });

    return { events: filteredEvents };
}

module.exports = router;
