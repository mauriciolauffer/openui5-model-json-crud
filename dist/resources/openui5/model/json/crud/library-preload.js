//@ui5-bundle openui5/model/json/crud/library-preload.js
sap.ui.require.preload({
	"openui5/model/json/crud/CRUDModel.js":function(){
"use strict";
/*
 * openui5-model-json-crud
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */sap.ui.define(["sap/base/Log","sap/ui/model/json/JSONModel"],function(t,e){const s=t.getLogger("openui5.model.json.crud.CRUDModel");const r={create:"POST",read:"GET",update:"PUT",delete:"DELETE"};const o={body:null,headers:{}};const a=e.extend("openui5.model.json.crud.CRUDModel",{metadata:{library:"openui5.model.json.crud",publicMethods:["create","read","update","delete","getHttpMethods","setHttpMethods","getFetchParameters","setFetchParameters"]},constructor:function(t,s){e.apply(this,[]);this._serviceUrl=t;this._fetchParameters=Object.assign({},o);this._httpMethods=Object.assign({},r);this.setFetchParameters(s)}});a.prototype.getFetchParameters=function(){return Object.assign({},this._fetchParameters)};a.prototype.setFetchParameters=function(t){this._fetchParameters=Object.assign(this.getFetchParameters(),t)};a.prototype.getHttpMethods=function(){return Object.assign({},this._httpMethods)};a.prototype.setHttpMethods=function(t){this._httpMethods=Object.assign(this.getHttpMethods(),t)};a.prototype.create=async function(t,e,s){const r=this._mergeParameters(s,this.getHttpMethods().create);const o=await this._callService(t,r);if(e){this.setProperty(e,o.data)}return o.response};a.prototype.read=async function(t,e){const s=this._mergeParameters(null,this.getHttpMethods().read);const r=await this._callService(t,s);if(e){this.setProperty(e,r.data)}return r.response};a.prototype.update=async function(t,e,s){const r=this._mergeParameters(s,this.getHttpMethods().update);const o=await this._callService(t,r);if(e){this.setProperty(e,Object.assign(this.getProperty(e),o.data))}return o.response};a.prototype.delete=async function(t,e){const r=this._mergeParameters(null,this.getHttpMethods().delete);const o=await this._callService(t,r);if(e){const t=e.lastIndexOf("/");const r=e.substring(0,t||1);const o=e.substring(t+1);const a=this.getProperty(r);if(Array.isArray(a[o])){a[o].splice(o,1)}else if(Array.isArray(a)){a.splice(parseInt(o),1)}else if(this.getProperty(e)&&typeof a==="object"){delete a[o]}else{s.warning(e+" was not found in the local model")}}return o.response};a.prototype._mergeParameters=function(t,e){const s=this.getFetchParameters();s.body=t;s.method=e;return s};a.prototype._callService=async function(t,e){const s=t||"";const r=this._serviceUrl+s;const o={data:null,response:{}};const a=await fetch(r,e);if(!a.ok){throw a}o.response=a.clone();o.data=await a.json();return o};return a});
},
	"openui5/model/json/crud/library.js":function(){
"use strict";
/*
 * openui5-model-json-crud
 * (c) Copyright 2018-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */sap.ui.define(["sap/ui/core/Lib","sap/ui/core/library"],function(e){return e.init({name:"openui5.model.json.crud",dependencies:["sap.ui.core"],controls:["openui5.model.json.crud.CRUDModel"],noLibraryCSS:true,version:"1.0.0"})});
},
	"openui5/model/json/crud/manifest.json":'{"sap.app":{"id":"openui5.model.json.crud","type":"library","applicationVersion":{"version":"1.0.0"},"title":"An OpenUI5 library which extends JSONModel to support CRUD (Create, Read, Update, Delete) operations using fetch."},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"dependencies":{"minUI5Version":"1.120.0","libs":{"sap.ui.core":{}}},"contentDensities":{"compact":true,"cozy":true}}}'
});
//# sourceMappingURL=library-preload.js.map
