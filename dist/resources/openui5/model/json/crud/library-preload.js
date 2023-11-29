//@ui5-bundle openui5/model/json/crud/library-preload.js
sap.ui.require.preload({
	"openui5/model/json/crud/CRUDModel.js":function(){
"use strict";
/*
 * openui5-model-json-crud
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */sap.ui.define(["sap/base/Log","sap/ui/model/json/JSONModel"],function(t,e){const s=t.getLogger("openui5.model.json.crud.CRUDModel");const r={create:"POST",read:"GET",update:"PUT",delete:"DELETE"};const n={body:null,headers:{}};const o=e.extend("openui5.model.json.crud.CRUDModel",{metadata:{library:"openui5.model.json.crud",publicMethods:["create","read","update","delete","getHttpMethods","setHttpMethods","getFetchParameters","setFetchParameters"]},constructor:function(t){e.apply(this,[]);this._serviceUrl=t;this._fetchParameters=Object.assign({},n);this._httpMethods=Object.assign({},r)}});o.prototype.getFetchParameters=function(){return Object.assign({},this._fetchParameters)};o.prototype.setFetchParameters=function(t){this._fetchParameters=Object.assign(this.getFetchParameters(),t)};o.prototype.getHttpMethods=function(){return Object.assign({},this._httpMethods)};o.prototype.setHttpMethods=function(t){this._httpMethods=Object.assign(this.getHttpMethods(),t)};o.prototype.create=function(t,e,s){const r=this._mergeParameters(s,this.getHttpMethods().create);return this._callService(t,r).then(function(t){if(e){this.setProperty(e,t.data)}return t.response}.bind(this))};o.prototype.read=function(t,e){const s=this._mergeParameters(null,this.getHttpMethods().read);return this._callService(t,s).then(function(t){if(e){this.setProperty(e,t.data)}return t.response}.bind(this))};o.prototype.update=function(t,e,s){const r=this._mergeParameters(s,this.getHttpMethods().update);return this._callService(t,r).then(function(t){if(e){this.setProperty(e,Object.assign(this.getProperty(e),t.data))}return t.response}.bind(this))};o.prototype.delete=function(t,e){const r=this._mergeParameters(null,this.getHttpMethods().delete);return this._callService(t,r).then(function(t){if(e){const t=e.lastIndexOf("/");const r=e.substring(0,t||1);const n=e.substr(t+1);const o=this.getProperty(r);if(Array.isArray(o[n])){o[n].splice(n,1)}else if(Array.isArray(o)){o.splice(n,1)}else if(this.getProperty(e)&&typeof o==="object"){delete o[n]}else{s.warning(e+" was not found in the local model")}}return t.response}.bind(this))};o.prototype._mergeParameters=function(t,e){const s=this.getFetchParameters();s.body=t;s.method=e;return s};o.prototype._callService=function(t,e){const s=t||"";const r=this._serviceUrl+s;const n={data:null,response:{}};return fetch(r,e).then(function(t){if(t.ok){n.response=t.clone();return t.json()}else{throw t}}).then(function(t){n.data=t;return n})};return o});
},
	"openui5/model/json/crud/library.js":function(){
"use strict";
/*
 * openui5-model-json-crud
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */sap.ui.define(["sap/ui/core/Core","sap/ui/core/library"],function(e){e.initLibrary({name:"openui5.model.json.crud",dependencies:["sap.ui.core"],controls:["openui5.model.json.crud.CRUDModel"],noLibraryCSS:true,version:"0.0.15"});return openui5.model.json.crud});
},
	"openui5/model/json/crud/manifest.json":'{"sap.app":{"id":"openui5.model.json.crud","type":"library","applicationVersion":{"version":"0.0.15"},"title":"An OpenUI5 library which extends JSONModel to support CRUD (Create, Read, Update, Delete) operations using fetch."},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"dependencies":{"minUI5Version":"1.56.0","libs":{"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true}}}'
});
//# sourceMappingURL=library-preload.js.map
