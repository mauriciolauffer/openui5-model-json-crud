sap.ui.define([
  'sap/base/Log',
  'sap/ui/core/mvc/Controller'
], function(Log, Controller) {
  'use strict';

  return Controller.extend('mlauffer.demo.openui5.model.json.crud.controller.App', {
    onInit: function() {
      // 'search/anime?q=DBZ' is the path to the service to be called, it'll be concatenated to serviceUrl
      // '/DBZ' is the path to the property into the model, in case you want to updated the model with the response;
      // empty value does not update the local model, it only returns the response
      this.getView().getModel('CRUDModel').read('search/anime?q=DBZ', '/DBZ')
          .then(function() {
            Log.info('Data selected from API');
          })
          .catch(function(err) {
            Log.error(err.toString());
          });
    }
  });
});
