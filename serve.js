var app = require('@ftbl/client')(__dirname + '/dist')
  , log = require('@ftbl/log')
  , port = process.env.PORT || 4200;

app.listen(port, function() {
  log.info('%d listening on port %d', process.pid, port);
});
