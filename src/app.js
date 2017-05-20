import express from 'express';
import index from './routes/index';
import events from './routes/events';
import matches from './routes/matches';
import loadData from './loadData';

loadData();

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
