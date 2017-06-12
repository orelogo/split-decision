import chai from 'chai';
import dbAdapter from '../dbAdapter';
import mongoose from 'mongoose';
import Event from '../models/event';
import Match from '../models/match';

mongoose.connect('mongodb://localhost/sd_test');

const assert = chai.assert;

const testEvents = [{
    event_id: 1,
    event_date: Date.now(),
    base_title: 'Test Event 1',
    title_tag_line: 'Best Test',
    feature_image: '',
    updated: Date.now()
  },
  {
    event_id: 2,
    event_date: Date.now(),
    base_title: 'Test Event 2',
    title_tag_line: 'Next Best Test',
    feature_image: '',
    updated: Date.now()
  }
];

const testMatches = [{
    match_id: 1,
    event_id: 3,
    fightcard_order: 1,
    fighter1_id: 123,
    fighter2_id: 234,
    fighter1_first_name: "John",
    fighter1_nickname: "",
    fighter1_last_name: "Doe",
    fighter2_first_name: "Fedor",
    fighter2_nickname: "Dude",
    fighter2_last_name: "Em",
    fighter1_full_body_image: "url",
    fighter2_full_body_image: "url",
    fighter1_weight_class: "Heavyweight",
    fighter2_weight_class: "Heavyweight",
    updated: Date.now()
  },
  {
    match_id: 2,
    event_id: 3,
    fightcard_order: 2,
    fighter1_id: 777,
    fighter2_id: 555,
    fighter1_first_name: "Jane",
    fighter1_nickname: "",
    fighter1_last_name: "Doe",
    fighter2_first_name: "Lisa",
    fighter2_nickname: "Dudette",
    fighter2_last_name: "Em",
    fighter1_full_body_image: "url",
    fighter2_full_body_image: "url",
    fighter1_weight_class: "Lightweight",
    fighter2_weight_class: "Lightweight",
    updated: Date.now()
  }
];

describe('dbAdapter', function() {
  this.timeout(5000);

  beforeEach(function(done) {
    Event.collection.drop(() => {
      Match.collection.drop(() => {
        done();
      });
    });
  });

  it('should insert events', function(done) {
    dbAdapter.insertEvents(testEvents).then(() => {
      Event.count({}, (err, count) => {
        assert.equal(count, 2);
        done();
      });
    });
  });

  it('should upsert matches', function(done) {
    dbAdapter.upsertMatches(testMatches).then(() => {
      Match.count({}, (err, count) => {
        assert.equal(count, 2);
        done();
      });
    });
  });

  it('should get a match by match id', function(done) {
    dbAdapter.upsertMatches(testMatches).then(() => {
      dbAdapter.getMatch(testMatches[0].match_id).then((result) => {
        assert.equal(result.fighter1_id, testMatches[0].fighter1_id);
        done();
      });
    });
  });

});
