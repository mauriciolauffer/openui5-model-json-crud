/*
 * openui5-model-json-crud
 * (c) Copyright 2018-2020 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.model.json.crud
   *
   * @namespace
   * @name openui5.model.json.crud
   * @author Mauricio Lauffer
   * @version 0.0.13
   * @public
   */
  return sap.ui.getCore().initLibrary({
    name: 'openui5.model.json.crud',
    dependencies: [
      'sap.ui.core'
    ],
    controls: [
      'openui5.model.json.crud.CRUDModel'
    ],
    noLibraryCSS: true,
    version: '0.0.13'
  });
});
