'use strict';

const sourceCodeReader = require('./source-code-reader');

module.exports.source = (event, context, callback) => {
  let url = event.queryStringParameters && event.queryStringParameters['url'];
  if (!url) {
    const response = {
      statusCode: 400,
      body: 'url query string is required',
    };

    callback(null, response);
    return;
  }
  sourceCodeReader.getSource(url)
    .then(source => {
      const response = {
        statusCode: 200,
        body: source,
      };

      callback(null, response);
    })
    .catch(error => {
      const response = {
        statusCode: 500,
        body: error,
      };

      callback(null, response);
      console.error(error);
    });
};