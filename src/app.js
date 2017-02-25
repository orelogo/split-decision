import express from 'express';

let app = express();
let port = 8000;

var index = require('./routes/index');

app.use(express.static('public'));
app.use('/', index);

app.listen(port);
console.log('server on');
