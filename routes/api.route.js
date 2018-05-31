var express = require('express')

var router = express.Router()
var jokes = require('../jokes/joke.route');

router.use('/jokes', jokes);

module.exports = router;