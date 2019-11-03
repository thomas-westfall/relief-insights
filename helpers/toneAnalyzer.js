const { IamAuthenticator } = require('ibm-watson/auth');
var ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');

const getTone = (statement) => {
    console.log("running get tone for");
    console.log(statement);
    var tone_analyzer = new ToneAnalyzerV3({
            version: '2017-09-21',
            authenticator: new IamAuthenticator({
                    apikey:  process.env.KEY,
                }),
	});

    var params = {
        toneInput: {'text': statement.text},
        contentType: 'application/json',
        sentences: true
    };

    return new Promise((resolve, reject) => {
	    tone_analyzer.tone(params, function (error, response) {
		    if (error) {
			reject(Error(error));
		    } else {
			resolve(response);
		    }
		});

	});

};

module.exports = getTone;