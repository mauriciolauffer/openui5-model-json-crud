'use strict';

/*
 * openui5-model-json-crud
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([
  'sap/base/Log',
  'sap/ui/model/json/JSONModel'
],
/**
 * Module Dependencies
 * @param {sap.base.Log} Log UI5 logger
 * @param {sap.ui.model.json.JSONModel} JSONModel UI5 JSONModel
 * @returns {object} CRUDModel object, an extended UI5 JSONModel
 */
function(Log, JSONModel) {
  const logger = Log.getLogger('openui5.model.json.crud.CRUDModel');
  const defaultHttpMethods = {
    create: 'POST',
    read: 'GET',
    update: 'PUT',
    delete: 'DELETE'
  };
  const defaultFetchParameters = {
    body: null,
    headers: {}
  };

  /**
   * OpenUI5 CRUDModel extends JSONModel to support CRUD operations.
   * @author Mauricio Lauffer
   * @version 0.0.15
   * @class
   * @namespace
   * @name openui5.model.json.crud
   * @public
   * @alias openui5.model.json.crud.CRUDModel
   */
  const CRUDModel = JSONModel.extend('openui5.model.json.crud.CRUDModel', {
    metadata: {
      library: 'openui5.model.json.crud',
      publicMethods: ['create', 'read', 'update', 'delete',
        'getHttpMethods', 'setHttpMethods', 'getFetchParameters', 'setFetchParameters']
    },

    /**
     * Constructor for a new Validator.
     * @class
     * @augments sap.ui.model.json.JSONModel
     * @function Object() { [native code] }
     * @param {string} serviceUrl Base URI of the service to request data from;
     *                            additional URL parameters appended here will be appended to every request.
     * @param {Request} options Fetch request options
     * @public
     */
    constructor: function(serviceUrl, options) {
      JSONModel.apply(this, []);
      this._serviceUrl = serviceUrl;
      this._fetchParameters = Object.assign({}, defaultFetchParameters);
      this._httpMethods = Object.assign({}, defaultHttpMethods);
      this.setFetchParameters(options);
    }
  });

  /**
   * Get Fetch parameters to be used.
   * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
   * @returns {object} Fetch parameters object
   * @public
   */
  CRUDModel.prototype.getFetchParameters = function() {
    return Object.assign({}, this._fetchParameters);
  };

  /**
   * Set Fetch parameters to be used.
   * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
   * @param {object} parameters Fetch parameters object
   * @public
   */
  CRUDModel.prototype.setFetchParameters = function(parameters) {
    this._fetchParameters = Object.assign(this.getFetchParameters(), parameters);
  };

  /**
   * Get HTTP methods for CRUD operations.
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
   * @returns {object} HTTP Methods to be used by the CRUD operations
   * @public
   */
  CRUDModel.prototype.getHttpMethods = function() {
    return Object.assign({}, this._httpMethods);
  };

  /**
   * Set HTTP methods for CRUD operations.
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
   * @param {object} httpMethods HTTP Methods to be used by the CRUD operations
   * @public
   */
  CRUDModel.prototype.setHttpMethods = function(httpMethods) {
    this._httpMethods = Object.assign(this.getHttpMethods(), httpMethods);
  };

  /**
   * Creates entry in the backend and into the local model
   * It returns a Response Object from Fetch - https://developer.mozilla.org/en-US/docs/Web/API/Response
   * @param {string} urlPath The path to the service
   * @param {string} propertyPath The path to the property into the model; empty value does not update local model
   * @param {any} payload The payload to be sent to the service
   * @returns {Promise<Response>} Returns a Promise, if resolved, resolves with a Response Object returned from Fetch
   * @public
   */
  CRUDModel.prototype.create = async function(urlPath, propertyPath, payload) {
    const parameters = this._mergeParameters(payload, this.getHttpMethods().create);
    const result = await this._callService(urlPath, parameters);
    if (propertyPath) {
      this.setProperty(propertyPath, result.data);
    }
    return result.response;
  };

  /**
   * Reads entry from the backend and save it into the local model
   * It returns a Response Object from Fetch - https://developer.mozilla.org/en-US/docs/Web/API/Response
   * @param {string} urlPath The path to the service
   * @param {string} propertyPath The path to the property into the model; empty value does not update local model
   * @returns {Promise<Response>} Returns a Promise, if resolved, resolves with a Response Object returned from Fetch
   * @public
   */
  CRUDModel.prototype.read = async function(urlPath, propertyPath) {
    const parameters = this._mergeParameters(null, this.getHttpMethods().read);
    const result = await this._callService(urlPath, parameters);
    if (propertyPath) {
      this.setProperty(propertyPath, result.data);
    }
    return result.response;
  };

  /**
   * Updates entry in the backend and into the local model
   * It returns a Response Object from Fetch - https://developer.mozilla.org/en-US/docs/Web/API/Response
   * @param {string} urlPath The path to the service
   * @param {string} propertyPath The path to the property into the model; empty value does not update local model
   * @param {any} payload The payload to be sent to the service
   * @returns {Promise<Response>} Returns a Promise, if resolved, resolves with a Response Object returned from Fetch
   * @public
   */
  CRUDModel.prototype.update = async function(urlPath, propertyPath, payload) {
    const parameters = this._mergeParameters(payload, this.getHttpMethods().update);
    const result = await this._callService(urlPath, parameters);
    if (propertyPath) {
      this.setProperty(propertyPath, Object.assign(this.getProperty(propertyPath), result.data));
    }
    return result.response;
  };

  /**
   * Deletes entry from the backend and from the local model
   * It returns a Response Object from Fetch - https://developer.mozilla.org/en-US/docs/Web/API/Response
   * @param {string} urlPath The path to the service
   * @param {string} propertyPath The path to the property into the model; empty value does not update local model
   * @returns {Promise<Response>} Returns a Promise, if resolved, resolves with a Response Object returned from Fetch
   * @public
   */
  CRUDModel.prototype.delete = async function(urlPath, propertyPath) {
    const parameters = this._mergeParameters(null, this.getHttpMethods().delete);
    const result = await this._callService(urlPath, parameters);
    if (propertyPath) {
      const lastSlash = propertyPath.lastIndexOf('/');
      const objectOnlyPath = propertyPath.substring(0, lastSlash || 1);
      const propertyOnlyPath = propertyPath.substring(lastSlash + 1);
      const modelEntry = this.getProperty(objectOnlyPath);
      if (Array.isArray(modelEntry[propertyOnlyPath])) {
        modelEntry[propertyOnlyPath].splice(propertyOnlyPath, 1);
      } else if (Array.isArray(modelEntry)) {
        modelEntry.splice(parseInt(propertyOnlyPath), 1);
      } else if (this.getProperty(propertyPath) && typeof modelEntry === 'object') {
        delete modelEntry[propertyOnlyPath];
      } else {
        logger.warning(propertyPath + ' was not found in the local model');
      }
    }
    return result.response;
  };

  /**
   * Set Fetch parameters to be used.
   * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
   * @param {any} body The payload to be sent to the service
   * @param {string} httpMethod The HTTP Method to be used in the operation
   * @returns {object} Fetch parameters
   * @private
   */
  CRUDModel.prototype._mergeParameters = function(body, httpMethod) {
    const parameters = this.getFetchParameters();
    parameters.body = body;
    parameters.method = httpMethod;
    return parameters;
  };

  /**
   * Calls Fetch API
   * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
   * @param {string} urlPath The path to the service
   * @param {object} parameters Fetch parameters to be used
   * @returns {Promise<object>} Returns a Promise with the Fetch results
   * @private
   */
  CRUDModel.prototype._callService = async function(urlPath, parameters) {
    const path = urlPath || '';
    const url = this._serviceUrl + path;
    const result = {
      data: null,
      response: {}
    };
    const response = await fetch(url, parameters);
    if (!response.ok) {
      throw response;
    }
    result.response = response.clone();
    result.data = await response.json();
    return result;
  };

  return CRUDModel;
});
