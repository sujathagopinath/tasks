var Logger = require('bunyan');

var log = new Logger({
  name: 'hellolog',
  streams: [
    {
      stream: process.stdout,
      level: 'debug'
    },
    {
      level: 'trace'
    }
  ],
  serializers: {
    req: Logger.stdSerializers.req,
    // res: restify.bunyan.serializers.response,
  },
});


module.exports = log