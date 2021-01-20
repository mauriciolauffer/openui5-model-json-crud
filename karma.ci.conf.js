module.exports = function(config) {
  'use strict';

  require('./karma.conf')(config);
  config.set({
    browsers: ['ChromeHeadless'],
    reporters: [...config.reporters, 'coveralls'],
    singleRun: true
  });
};
