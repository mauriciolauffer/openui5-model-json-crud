module.exports = function(config) {
  'use strict';

  config.set({
    frameworks: ['openui5', 'qunit', 'sinon'],
    openui5: {
      path: 'http://localhost:8080/resources/sap-ui-core.js',
      useMockServer: false
    },
    client: {
      openui5: {
        config: {
          theme: 'sap_belize',
          language: 'EN',
          bindingSyntax: 'complex',
          preload: 'async',
          logLevel: 'ERROR',
          libs: 'openui5.model.json.crud',
          resourceroots: {
            'openui5.model.json.crud': 'base/src/openui5/model/json/crud',
            'test.unit': 'base/test/openui5/model/json/crud/unit'
          }
        },
        tests: ['test/unit/allTests']
      },
      clearContext: false,
      qunit: {
        showUI: true,
        testTimeout: 20000, //20 secs
        autostart: false,
        noglobals: false
      }
    },
    files: [
      {
        pattern: 'src/**',
        included: false,
        served: true,
        watched: true
      },
      {
        pattern: 'test/openui5/model/json/crud/unit/**',
        included: false,
        served: true,
        watched: true
      }
    ],
    preprocessors: {
      'src/**/!(thirdparty)/*.js': ['coverage']
    },
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/',
      check: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        }
      }
    },
    autoWatch: true,
    useIframe: false,
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    reportSlowerThan: 200,
    singleRun: false
  });
};
