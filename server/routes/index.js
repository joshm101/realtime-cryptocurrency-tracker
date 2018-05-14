const express = require('express');
const router = express.Router();
const path = require('path');

const api = require('./api');


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  // return client-side react index.html file
  res.sendFile(
    path.resolve(
      __dirname + '../../client/build/index.html'
    )
  );
});

// All API requests are handled by api router module
router.use('/api', api)

module.exports = router;
