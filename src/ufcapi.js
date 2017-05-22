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
  getEvents() {
    return new Promise((resolve, reject) => {
      ufcReq.get('events', (error, response, body) => {
        if (error || !(/^2/.test('' + response.statusCode)))
          reject({ error: error, reponse: response });
        else resolve(body);
      });
    });
  },

  /**
   * UFC API call to get a json with event details
   * @param  {number}   eventId  UFC API event id
   * @param  {Function} callback function with (error, reponse, body)
   */
  getMatches(eventId) {
    return new Promise((resolve, reject) => {
      ufcReq.get('events/' + eventId + '/fights', (error, response, body) => {
        if (error || !(/^2/.test('' + response.statusCode)))
          reject({ error: error, reponse: response });
        else resolve(body);
      });
    });
  }

};
