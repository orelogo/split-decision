import ufcApi from './ufcApi';
import dbAdapter from './dbAdapter';
import Event from './models/event';
import User from './models/user';
import Match from './models/match';
import RatedMatch from './models/ratedmatch';
import _ from 'lodash';

// Loads database with users, matches, and rated matches
export default function() {
  // clearCollections();
  ufcApi.getEvents()
    .then(updateApiData)
    .catch((error) => {
      console.log(error);
    });
}

function updateApiData(events) {
  Event.collection.drop();

  let date = new Date().toJSON();

  let trimmedEvents = events.map((event) => {
    let trimmedEvent = _.pick(event, [
      'id',
      'event_date',
      'base_title',
      'title_tag_line',
      'feature_image'
    ]);

    trimmedEvent.updated = date;

    return trimmedEvent;
  });

  dbAdapter.insertEvents(trimmedEvents);
  getMatches(trimmedEvents);
}

function getMatches(events) {
  events.forEach((event) => {

    dbAdapter.getFirstMatch(event.id).then((result) => {
        if (result === null || (Date.parse(result.updated) < Date.parse(event.event_date))) {
          console.log('API call for ' + event.id + ": " + event.base_title + ' on ' + event.event_date.toString());
          ufcApi.getMatches(event.id)
          .then(insertMatches)
          .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  });
}

function insertMatches(matches) {
  if (matches.length === 0) {
    console.log('No matches received from API call');
    return;
  }

  let date = new Date().toJSON();

  let trimmedMatches = matches.map((match) => {

    let trimmedMatch = _.pick(match, [
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

    trimmedMatch.updated = date;
    return trimmedMatch;
  });

  return dbAdapter.upsertMatches(trimmedMatches);
}

// Clear the database
function clearCollections() {
  User.collection.drop();
  Match.collection.drop();
  RatedMatch.collection.drop();
}

// Add users to users collection
function addUsers() {
  return User.insertMany([{
      user_name: 'janedoe',
      password: '1234'
    },
    {
      user_name: 'tomselek',
      password: '1234'
    }
  ]);
}

// Add rated matches to rated matches collection
function addRatedMatches(res) {
  addRatedMatch('janedoe', 'UFC 210', 1);
  addRatedMatch('tomselek', 'UFC 209', 2);
  addRatedMatch('tomselek', 'UFC 209', 5); // should not add
  addRatedMatch('jimmy', 'UFC 209', 1); // should not add
}

// Add a single rated match
function addRatedMatch(userName, eventName, matchOrder) {
  let userId, matchId;
  User.findOne({
      user_name: userName
    }, '_id', function(err, user) {
      if (err) return console.log(err);
      if (!user) return console.log('User not found: ' + userName);
      userId = user.id;
    })
    .then(function(res) {
      return Match.findOne({
        event: eventName,
        order: matchOrder
      }, '_id', function(err, match) {
        if (err) return console.log(err);
        if (!match) return console.log('Match not found: ' + eventName + ' match ' + matchOrder);
        matchId = match.id;
      });
    })
    .then(function(res) {
      if (userId && matchId) {
        let ratedMatch = new RatedMatch({
          user: userId,
          match: matchId,
          round1: [1000, 55555, 700000]
        });
        ratedMatch.save();
      }
    });
}
