/*
 *   R Service Bus Control Pad
 *   
 *   Copyright (c) Copyright of OpenAnalytics BVBA, 2010-2011
 *
 *   ===========================================================================
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Affero General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Affero General Public License for more details.
 *
 *   You should have received a copy of the GNU Affero General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *   @author rsb.development@openanalytics.eu
 */

const SERVER_STORE = new Lawnchair({name:'servers', record:'server'}, function() {});
//SERVER_STORE.nuke(); // TODO remove :) 
 
const BASE64 = new Base64();

function fetchServerInfo(url, username, password, successCallback) {
  var authHeader = '';
  if (!Ext.isEmpty(username) && !Ext.isEmpty(password)) {
    authHeader = 'Basic ' + BASE64.encode(username + ':' + password);
  }
            
  // TODO show busy cursor
  Ext.Ajax.request({
    url:url + '/api/rest/system/info',
    method: 'GET',
    headers: {'Accept': 'application/vnd.rsb+json',
              'Authorization': authHeader},
    success: function (result, request) {                 
      var nodeInformation = JSON.parse(result.responseText).nodeInformation;
      var status = nodeInformation.healthy? 'good' : 'bad';
      successCallback(nodeInformation, status);
    },
    failure: function (result, request) {
      Ext.Msg.alert('Error', 'Failed to contact RSB server at the provided URL', Ext.emptyFn);
    } 
  });  
}

Ext.regApplication({
  name: 'app',
  
  launch: function() {
    this.launched = true;
    this.mainLaunch();
  },
  
  mainLaunch: function() {
    // TODO handle Android back and menu buttons
    var devMode = (navigator.userAgent.indexOf('Chrome') > -1);
    if (!this.launched) return;
    if (!devMode && !device) {
      return;
    }
    
    this.views.viewport = new this.views.Viewport();
  }
});