'use strict';

const sourceCodeReader = require('./source-code-reader');

module.exports.source = async (event, context, callback) => {
  let url = event.queryStringParameters && event.queryStringParameters['url'];
  let waitForElement = event.queryStringParameters && event.queryStringParameters['waitForElement'];
  if (!url) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({ error: 'url query string is required'}, null, 2),
      headers: {
        "content-type": "v"
      },
    };
    console.log(`request made with no url: ${JSON.stringify(event, null, 2)}`)
    callback(null, response);
    return;
  }
  url = decodeURI(url);
  try {
      var source = await sourceCodeReader.getSource(url, waitForElement);
      const response = {
        statusCode: 200,
        body: JSON.stringify({body: source}, null, 2),
        headers: {
          "content-type": "application/json"
        },
      };
      callback(null, response);
    } catch (error) {
      const response = {
        statusCode: 500,
        body: JSON.stringify({error}, null, 2),
        headers: {
          "content-type": "application/json"
        },
      };
      console.error(error);
      callback(null, response);
    }
};