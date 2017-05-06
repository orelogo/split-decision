import mongoose from 'mongoose';
import User from './models/user';
import Match from './models/match';
import RatedMatch from './models/ratedmatch';

// Loads database with users, matches, and rated matches
export default function() {
  mongoose.connect('mongodb://localhost/splitdecision');

  clearCollections();
  addUsers()
    .then(addMatches)
    .then(addRatedMatches);
}

function clearCollections() {
  User.collection.drop();
  Match.collection.drop();
  RatedMatch.collection.drop();
}

// Add users to users collection
function addUsers() {
  return User.insertMany([
    {user_name: 'janedoe', password: '1234'},
    {user_name: 'tomselek', password: '1234'}
  ]);
}

// Add matches to matches collection
function addMatches(event) {
  return Match.insertMany([
    {event: 'UFC 210', order: 1, competitor1: 'Daniel Cormier', competitor2: 'Anthony Johnson'},
    {event: 'UFC 210', order: 2, competitor1: 'Chris Weidman', competitor2: 'Gegard Mousasi'},
    {event: 'UFC 210', order: 3, competitor1: 'Cynthia Calvillo', competitor2: 'Pearl Gonzalez'},
    {event: 'UFC 209', order: 1, competitor1: 'Tyron Woodley', competitor2: 'Stephen Thompson'},
    {event: 'UFC 209', order: 2, competitor1: 'Lando Vannata', competitor2: 'David Teymur'},
    {event: 'UFC 209', order: 3, competitor1: 'Rashad Evans', competitor2: 'Daniel Kelly'},
    {event: 'UFC 209', order: 4, competitor1: 'Amanda Cooper', competitor2: 'Cynthia Calvillo'},
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
  User.findOne({user_name: userName}, '_id', function (err, user) {
    if (err) return console.log(err);
    if (!user) return console.log('User not found: ' + userName);
    userId = user.id;
  })
  .then(function (res) {
    return Match.findOne({event: eventName, order : matchOrder}, '_id', function (err, match) {
      if (err) return console.log(err);
      if (!match) return console.log('Match not found: ' + eventName + ' match ' + matchOrder);
      matchId = match.id;
    });
  })
  .then(function (res) {
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
