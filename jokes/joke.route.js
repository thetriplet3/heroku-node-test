var express = require('express')
var router = express.Router()

var JokeController = require('../jokes/joke.controller');
var JokeAgentController = require('../jokes/joke.agent.controller');

router.get('/', JokeController.getDadJoke);
router.post('/', JokeController.getDadJoke);
//router.post('/agent/', JokeAgentController.dialogflowFirebaseFulfillment);

module.exports = router;