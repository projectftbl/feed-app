var gulp = require('gulp')
  , sequence = require('run-sequence');

var config = {
  sourceDirectory: './lib/'
, distDirectory: './dist/'
, publicDirectory: './public/**'
, distFile: 'app.js'
};

var options = { 
  files: config
, html: config
, serve: config
, webpack: config
, test: { coverage: 0 }
};

require('@ftbl/gulp')(gulp, options);

gulp.task('dist', function() {
  sequence('webpack', 'files', 'html');
});

gulp.task('default', [ 'serve', 'watch' ]);
