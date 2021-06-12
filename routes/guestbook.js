var express = require('express');
var router = express.Router();
var Board = require('../models/board');
/* GET home page. */


router.get('/', function(req, res, next) {
  Board.find({}, function (err, board) {
    res.render('guestbook', { title: '방명록', board : board });
  });
});
/* Write board page */
router.get('/write', function(req, res, next) {
  res.render('createguestbook', { title: '글쓰기' });
});

/* board insert mongo */
router.post('/write', function (req, res) {
  var board = new Board();
  board.title = req.body.title;
  board.contents = req.body.contents;
  board.author = req.body.author;

  board.save(function (err) {
    if(err){
      console.log(err);
      res.redirect('/guestbook');
    }
    res.redirect('/guestbook');
  });
});

router.get('/:id', function(req, res) {
  var post_id = req.params.id
  Board.deleteOne({_id:post_id}, function(err) {
    if (err) {
      console.log(err);
      res.redirect('/guestbook');
    }
    else {
      res.redirect('/guestbook');
    }


  });
});



module.exports = router;
