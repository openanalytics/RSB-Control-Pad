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

Ext.data.ProxyMgr.registerType("serverstorage",
  Ext.extend(Ext.data.Proxy, {
    create: function(operation, callback, scope) {
      operation.setStarted();
      var server = operation.records[0].data;
      var thisProxy = this;
      var serverUrl = server.url;
      
      SERVER_STORE.save({serverUrl: server}, function() {
          operation.setCompleted();
          operation.setSuccessful();
          if (typeof callback == 'function') {
              callback.call(scope || thisProxy, operation);
          }
      });
    },
    
    read: function(operation, callback, scope) {
      operation.setStarted();
      var thisProxy = this;
      
      SERVER_STORE.all(function(stored_servers) {
        var servers = [];
          
        for (var i = 0; i < stored_servers.length; i++) {
          var stored_server = stored_servers[i];
          var server = new thisProxy.model({
            url: stored_server.url,
            username: stored_server.username,
            password: stored_server.password,
            name: stored_server.name,
            status: stored_server.status
          });
          servers.push(server);
        }
          
        operation.resultSet = new Ext.data.ResultSet({
          records: servers,
          total  : servers.length,
          loaded : true
        });
        operation.setSuccessful();
        operation.setCompleted();
        if (typeof callback == "function") {
          callback.call(scope || thisProxy, operation);
        }
      });
    },
    
    update: function(operation, callback, scope) {
      // TODO implement
    },
    
    destroy: function(operation, callback, scope) {
      // TODO implement
    }
  })
);
 
app.models.Server = Ext.regModel("app.models.Server", {
  fields: [
    {name: "url", type: "string"},
    {name: "username", type: "string"},
    {name: "password", type: "string"},
    {name: "name", type: "string"},
    {name: "status", type: "string"} // good | bad | unknown
  ],
  proxy: {
      type: "serverstorage"
  }  
});

app.stores.servers = new Ext.data.Store({
  model: "app.models.Server"
});