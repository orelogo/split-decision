import Event from './models/event';
import User from './models/user';
import Match from './models/match';
import RatedMatch from './models/ratedmatch';

export default {

  insertEvents(events) {
    return Event.insertMany(events, (err, docs) => {
      if (err)
        console.log('Error inserting events: ' + err);
      else
        console.log(docs.length + ' events inserted successfully');
    });
  },

  upsertMatches(matches) {
    return new Promise((resolve, reject) => {
      matches.forEach((match, i) => {
        Match.update({ id: match.id }, match, { upsert: true }, (err, raw) => {
          if (err)
            reject(err);
          else if (i === matches.length - 1) {
            console.log(i + ' matches upserted for event ' + match.event_id);
            resolve();
          }
        });
      });
    });
  },

  queryLatestEvents() {
    const msRange = 1000 * 60 * 60 * 24 * 60; // 60 days
    let min = new Date(Date.now() - msRange);
    let max = new Date();

    return new Promise((resolve, reject) => {
      Event.find({
          $and: [{
            event_date: {
              $gte: min
            }
          }, {
            event_date: {
              $lte: max
            }
          }]
        },
        (err, docs) => {
          if (err)
            reject(err);
          else
            resolve(docs);
        }
      );
    });
  }

};
