# Source as a Service

The following is offered as a solution if you are needing to get source HTML from a site as though you were visiting it (generally after javascript and other basic elements of the DOM have loaded).

# To load it
1. Clone this repository
1. Install and setup [serverless](https://github.com/serverless/serverless)
1. Follow the instructions to obtain selenium to run on lambda at the following [github repository](https://github.com/blackboard/lambda-selenium) (sadly there is no npm for this package at the time of this writing)
1. Unzip the selenium libraries in the same folder as your clone
1. Deploy using `serverless deploy`
