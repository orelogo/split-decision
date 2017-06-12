import Event from './models/event';
import User from './models/user';
import Match from './models/match';
import RatedMatch from './models/ratedmatch';

export default {

  /**
   * Insert events into database.
   *
   * @param  {Object[]} events events to be inserted
   * @return {Promise}         promise with inserted objects
   */
  insertEvents(events) {
    return Event.insertMany(events, (err, docs) => {
      if (err)
        console.log('Error inserting events: ' + err);
      else
        console.log(docs.length + ' events inserted successfully');
    });
  },

  /**
   * Return promise with event that happened in the last msRange amount
   * of time.
   *
   * @return {Promise} promise with array of events
   */
  getLatestEvents() {
    const msRange = 99999 * 1000 * 60 * 60 * 24 * 60; // 60 days
    let min = new Date(Date.now() - msRange);
    let max = new Date();

    return Event.find({
      $and: [{
        event_date: {
          $gte: min
        }
      }, {
        event_date: {
          $lte: max
        }
      }]
    }).exec();
  },

  /**
   * Update or insert given matches into database.
   *
   * @param  {Object[]} matches matches to be upserted
   * @return {Promise}         promise with no data
   */
  upsertMatches(matches) {
    return new Promise((resolve, reject) => {
      matches.forEach((match, i) => {
        Match.update({
          match_id: match.match_id
        }, match, {
          upsert: true
        }, (err, raw) => {
          if (err)
            reject(err);
          else if (i === matches.length - 1) {
            console.log((i + 1) + ' matches upserted for event ' + match.event_id);
            resolve();
          }
        });
      });
    });
  },

  /**
   * Get match based on match id.
   *
   * @param  {number} matchId match id
   * @return {Promise}        promise with match object
   */
  getMatch(matchId) {
    return Match.findOne({
      match_id: matchId
    }).exec();
  },

  /**
   * Get the last updated time or the given event id's first match.
   *
   * @param  {number} eventId event id
   * @return {Promise}        promise with an object containing last updated
   *                          time
   */
  getFirstMatch(eventId) {
    return Match.findOne({
      event_id: eventId
    }).select('updated').exec();
  },

  /**
   * Get matches based on event id.
   *
   * @param  {number} eventId event id
   * @return {Promise}        promise with array of match objects
   */
  getMatches(eventId) {
    return Match.find({
      event_id: eventId
    }).exec();
  }
};
