sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'openui5/model/json/crud/CRUDModel'
], function(Controller, CRUDModel) {
  'use strict';

  return Controller.extend('mlauffer.demo.openui5.model.json.crud.controller.App', {
    onInit: function() {
      const serviceUrl = 'https://api.jikan.moe/v3/';
      this.getView().setModel(new CRUDModel(serviceUrl), 'CRUDModel');
      this.getView().getModel('CRUDModel').read('search/anime?q=DBZ', '/DBZ')
        .then(function() {
          console.log('Data selected from API');
        })
        .catch(function(err) {
          console.error(err);
          console.error(err.toString());
        });
    }
  });
});
