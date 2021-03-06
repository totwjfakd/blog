const express = require('express');
const router = express.Router();

const main = require('./main.js');
const about_me = require('./aboutme.js');
const guestBook = require('./guestbook.js');
const auth = require('./auth.js');


router.use('/main', main);
router.use('/aboutme', about_me);
router.use('/guestbook', guestBook);
router.use('/auth', auth);


module.exports = router;