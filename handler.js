'use strict';

const sourceCodeReader = require('./source-code-reader');

module.exports.source = async (event, context, callback) => {
  let url = event.queryStringParameters && event.queryStringParameters['url'];
  let waitForElement = event.queryStringParameters && event.queryStringParameters['waitForElement'];
  if (!url) {
    const response = {
      statusCode: 400,
      body: 'url query string is required',
      'Content-Type': 'text/plain',
    };
    console.log(`request made with no url: ${JSON.stringify(event, null, 2)}`)
    callback(null, response);
    return;
  }
    try {
      var source = await sourceCodeReader.getSource(url, waitForElement);
      const response = {
        statusCode: 200,
        body: source,
      };
      callback(null, response);
    } catch (error) {
      const response = {
        statusCode: 500,
        body: error,
        'Content-Type': 'text/plain',
      };
      console.error(error);
      callback(null, response);
    }
};