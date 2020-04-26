var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  parameters = {
    title: 'NotePad Editor'
  }
  res.render('index', parameters);
});

router.get('/notepad/:notename', function(req, res, next) {
  parameters = {
    title: 'NotePad Editor'
  }
  res.render('notepad', parameters);
});

module.exports = router;
