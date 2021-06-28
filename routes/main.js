var express = require('express');
var router = express.Router();
var fs = require('fs')
var findForder = 'post'
var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'post/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
});
var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session); // session 정보
  fs.readdir(findForder, function(err, content) {
    if (err) {
      console.log(err);
      throw err;
    }
    if (content.length>=1) {
      
      res.render('index', { title : 'Home', posts: content, isLogin : req.session.is_login, user_name : req.session.user_name });
    }
    else {
      console.log("No file")
      res.render('index', { title : 'Home'});
    }
    
  })

});

router.post('/', function(req, res) {
  req.session.destroy();
  res.redirect('/main');
});


router.get('/postwrite', function(req, res, next) {
  res.render('createpost', { title: '파일 업로드', isLogin : req.session.is_login});
});

router.post('/postwrite', upload.single('postFile'), function (req, res) {
  res.redirect('/main');
});

router.get('/:fileName', function(req, res) {

  var fileName = 'post/'+req.params.fileName;
  fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) throw err;
    data.toString

    var md = require('markdown-it')('commonmark');
    var mdData = md.render(data);
    console.log(typeof(mdData))
    res.render('post', {postContent:mdData});
  });
  
});


module.exports = router;
