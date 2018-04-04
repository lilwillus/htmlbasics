var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET TaskTracker page. */
router.get('/tasks', function(req, res) {
  res.render('tasks', { title: 'Task Tracker !' });
});

module.exports = router;
