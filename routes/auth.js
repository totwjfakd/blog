var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('authLogin');
});
router.get('/signup', function(req, res, next) {
    res.render('authSignUp');
});

router.post('/signup', function(req, res) {
    var new_user = new User();

    new_user.name = req.body.signup_user_name;
    new_user.email = req.body.signup_user_email;
    new_user.password = req.body.signup_user_password;

    new_user.save((err) => {
        if (err) console.log(err);
        else {
            console.log("회원가입 성공");
            res.redirect('/auth/login');
        }
    })
});
router.post('/login', function(req, res) {
    User.findOne({email : req.body.login_user_email, password : req.body.login_user_password}, (err, user) => {
        if (err) console.log(err);
        else if (user) {
            console.log("로그인 성공");
            console.log(user);
            req.session.is_login = true;
            req.session.user_id = req.body.login_user_email;
            req.session.user_name = User.name;
            req.session.save(function() { // 세션을 세션 스토어에 저장이 끝나면 function()이 실행됩니다. save() 부분이 없다면, session store에 저장하는 일보다 redirect가 먼저 실행되어 로그인 상태가 유지가 안되는 버그(?)가 발생할 수 있습니다.
                res.redirect('/main');
            });
            
        }
        else {
            res.redirect('/main');

        }
    });
});



module.exports = router;