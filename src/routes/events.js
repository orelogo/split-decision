import express from 'express';
import ufcapi from '../ufcapi';
import hbs from 'hbs';

let router = express.Router();

router.get('/', (req, res, next) => {
  ufcapi.getEvents((err, apires, body) => {
    console.log(getEvents(body));
    res.render('events', getEvents(body));
  });
  console.log('GET events');
});

hbs.registerHelper('list', (items, options) => {
  let out = '<ul>';

  for(let i = 0; i < items.length; i++) {
    out = out + '<li>' + options.fn(items[i]) + '</li>';
  }

  return out + '<ul>';
});

/**
 * Filter events from ufc api to include only those that have occured within
 * the past 60 days
 *
 * @param  {Object[]} events unfiltered events from ufi api
 * @return {Object[]}        filtered events with id and name
 */
function getEvents(events) {
  const msRange = 1000 * 60 * 60 * 24 * 60; // 60 days
  let currentTime = Date.now();

  let filteredEvents = events.filter((event) => {
      let difference = currentTime - new Date(event.event_date).getTime();
      return difference > 0 && difference <= msRange;
    })
    .map((event) => {
      return {
        id: event.id,
        name: event.base_title + ': ' + event.title_tag_line
      };
    });

    return { events: filteredEvents };
}

module.exports = router;
