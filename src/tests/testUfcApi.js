import chai from 'chai';
import ufcApi from '../ufcApi';

const assert = chai.assert;

describe('ufcApi module', function() {
  this.timeout(5000);

  it('should get events', function(done) {
    ufcApi.getEvents()
      .then((result) => {
        assert.isAtLeast(result.length, 400);
        done();
      })
      .catch((err) => done(err));
  });

  it('should get matches with correct event id', function(done) {
    const eventId = 538748; // event id for UFC 200
    ufcApi.getMatches(eventId)
      .then((result) => {
        assert.equal(result.event_id, eventId);
        assert.isAtLeast(result.matches.length, 1);
        done();
      })
      .catch((err) => done(err));
  });

  it('should not get matches if event id incorrect', function(done) {
    const eventId = -1;
    ufcApi.getMatches(eventId)
      .then((result) => {
        done(new Error('Returned matches for an invalid event id'));
      })
      .catch((err) => done());
  });


});
