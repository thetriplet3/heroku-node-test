'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    // // Uncomment and edit to make your own intent handler
    // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    function getDadJoke(agent) {
        agent.add(`This message is from Dialogflow's Cloud Functions for Firebase inline editor!`);
        agent.add(new Card({
            title: `Title: this is a card title`,
            imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
            text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
            buttonText: 'This is a button',
            buttonUrl: 'https://docs.dialogflow.com/'
        })
        );
        agent.add(new Suggestion(`Quick Reply`));
        agent.add(new Suggestion(`Suggestion`));
        //agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' } });
    }

    // // Uncomment and edit to make your own Google Assistant intent handler
    // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function googleAssistantHandler(agent) {
    //   let conv = agent.conv(); // Get Actions on Google library conv instance
    //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    //   agent.add(conv); // Add Actions on Google library responses to your agent's response
    // }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Dad Joke', getDadJoke);
    // intentMap.set('<INTENT_NAME_HERE>', googleAssistantHandler);
    agent.handleRequest(intentMap);
});


function getJoke() {
    return new Promise((resolve, reject) => {
        // Create the path for the HTTP request to get the weather
        var options = {
            host: 'icanhazdadjoke.com',
            headers: {
                "Accept": "application/json",
                "User-Agent": "My Library (https://github.com/thetriplet3/heroku-node-test)"
            }
        };

        // Make the HTTP request to get the weather
        https.get(options, (res) => {
            let body = ''; // var to store the response chunks
            res.on('data', (d) => { body += d; }); // store each response chunk
            res.on('end', () => {
                // After all the data has been received parse the JSON for desired data
                let response = JSON.parse(body);

                // Resolve the promise with the output text
                console.log(response.joke);
                resolve(response.joke);
            });
            res.on('error', (error) => {
                console.log(`Error calling the weather API: ${error}`)
                reject();
            });
        });
    });
}