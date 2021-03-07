/*
 * openui5-model-json-crud
 * (c) Copyright 2018-2021 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([
  'sap/ui/core/library'
], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.model.json.crud
   *
   * @namespace
   * @name openui5.model.json.crud
   * @author Mauricio Lauffer
   * @version 0.0.14
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
    version: '0.0.14'
  });
});
