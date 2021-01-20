module.exports = function(config) {
  'use strict';

  config.set({
    frameworks: ['ui5'],
    ui5: {
      type: 'library'
    },
    junitReporter: {
      outputDir: 'reports',
      outputFile: undefined,
      useBrowserName: false,
      xmlVersion: 1
    },
    preprocessors: {
      'src/**/!(thirdparty)/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'reports',
      subdir: 'coverage',
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },
    browsers: ['Chrome'],
    browserConsoleLogOptions: {
      level: 'error'
    },
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    useIframe: false,
    reporters: ['progress', 'coverage', 'junit'],
    reportSlowerThan: 200,
    singleRun: false
  });
};
