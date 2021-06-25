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
            res.redirect('/main');
        }
        else console.log("로그인 실패");
    });
});



module.exports = router;