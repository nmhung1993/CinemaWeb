var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cinema Project' });
});

// đường dẫn tạo ở đây
router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Upload' });
});

module.exports = router;
