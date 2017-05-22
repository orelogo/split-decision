import express from 'express';
import mongoose from 'mongoose';
import index from './routes/index';
import events from './routes/events';
import matches from './routes/matches';
// import loadData from './loadData';
import loadApiData from './loadApiData';

mongoose.connect('mongodb://localhost/splitdecision');

// loadData();
loadApiData();

let app = express();
let port = 8000;

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use('/', index);
app.use('/events', events);
app.use('/matches', matches);

app.listen(port);
console.log('Server listening on port ' + port);

// close mongoose connection on exit
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
