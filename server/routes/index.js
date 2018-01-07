var express = require('express');
var router = express.Router();
var path = require('path');

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

module.exports = router;
