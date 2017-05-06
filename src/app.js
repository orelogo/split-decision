import express from 'express';
import index from './routes/index';
import loadData from './loadData';

loadData();

let app = express();
let port = 8000;



app.use(express.static('public'));
app.use('/', index);

app.listen(port);
console.log('Server listening on port ' + port);
