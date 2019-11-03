const phq = require('predicthq');
//import Client from 'predicthq';
const nodeFetch = require('node-fetch');

console.log("HEYA");
var token = "D3p2pjZS9uPpRopCpUDUCw6AXsV6BjUMhFLCePBM";
const client = new phq.Client({bearer_token: token, fetch: nodeFetch});


const logEventsToConsole = events => {
    for (const event of events) {
        // See https://developer.predicthq.com/resources/events/#fields for list of all event fields.
        console.log(event);
        console.log();
    }
};

//console.log(client);


const withinParam = '10km@-36.844480,174.768368';

// Event search using `within` parameter.
// See https://developer.predicthq.com/resources/events/#parameters for all available search parameters.
const getDisasters = (hashTag) => { 
    console.log("about to search");
     client.events.Search({within: withinParam})
    .then(logEventsToConsole)
    .catch(err => console.log("here"));
}

/*
const getDisasters = (hashTag) => {
    return new Promise((resolve, reject) => {
	    client.events.search('/v1/events/', {
		}, (error, tweets, response) => {
		    console.log("HERE!");
		    resolve(tweets);

		    if(error) {
			console.log("at error");
			reject(Error(error));
		    }
		});
	});
};
*/