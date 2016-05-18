var client = require('@ftbl/client');

module.exports = function(done) {
  client(__dirname + '/dist', done);
};