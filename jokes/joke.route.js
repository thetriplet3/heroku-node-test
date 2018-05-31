var express = require('express')
var router = express.Router()

var JokeController = require('../jokes/joke.controller');
router.get('/', JokeController.getDadJoke);
router.post('/', JokeController.getDadJoke);

module.exports = router;