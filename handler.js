'use strict';

module.exports.source = (event, context, callback) => {
  let url = event.queryStringParameters && event.queryStringParameters['url'];
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Where is my source code?',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
