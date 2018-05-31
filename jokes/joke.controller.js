const https = require('https');

exports.getDadJoke = (req, res) => {
    getJoke().then((output) => {
        res.json({ 'fulfillmentText': output }); // Return the results of the weather API to Dialogflow
    }).catch(() => {
        res.json({ 'fulfillmentText': `I don't know the weather but I hope it's good!` });
    });
};



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