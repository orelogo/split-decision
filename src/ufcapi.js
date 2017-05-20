import request from 'request';

let options = {
  baseUrl: 'http://ufc-data-api.ufc.com/api/v3/us/',
  json: true
};

let ufcReq = request.defaults(options);

export default {

  /**
   * UFC API call to get a json list of all events
   *
   * @param  {Function} callback fuction with (error, response, body)
   */
  getEvents(callback) {
    ufcReq.get('events', callback);
  },

  /**
   * UFC API call to get a json with event details
   * @param  {number}   eventId  UFC API event id
   * @param  {Function} callback function with (error, reponse, body)
   */
  getMatches(eventId, callback) {
    ufcReq.get('events/' + eventId + '/fights', callback);
  }

};
