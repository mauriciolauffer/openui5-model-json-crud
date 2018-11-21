sap.ui.define([
  'sap/base/Log',
  'sap/ui/core/mvc/Controller',
  'openui5/model/json/crud/CRUDModel'
], function(Log, Controller, CRUDModel) {
  'use strict';

  return Controller.extend('mlauffer.demo.openui5.model.json.crud.controller.App', {
    onInit: function() {
      const serviceUrl = 'https://api.jikan.moe/v3/'; //root backend URL
      const crudModel = new CRUDModel(serviceUrl);
      this.getView().setModel(crudModel, 'CRUDModel');
      //'search/anime?q=DBZ' is the path to the service to be called, it'll be concatenated to serviceUrl
      //'/DBZ' is the path to the property into the model, in case you want to updated the model with the response;
      // empty value does not update the local model, it only returns the response
      crudModel.read('search/anime?q=DBZ', '/DBZ')
        .then(function() {
          Log.info('Data selected from API');
        })
        .catch(function(err) {
          Log.error(err.toString());
        });
    }
  });
});
