import express from 'express';

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('/public/index.html', { title: 'SplitDecision' });
  console.log('GET index');
});

module.exports = router;
