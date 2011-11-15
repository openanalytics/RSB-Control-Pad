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
      var record = operation.records[0];
      record.setId(Ext.id({},'server-'));
      var server = record.data;
      server.key = record.getId();
      
      var thisProxy = this;
      
      SERVER_STORE.save(server, function() {
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
            id: stored_server.key,
            url: stored_server.url,
            username: stored_server.username,
            password: stored_server.password,
            status: stored_server.status,
            node_information: stored_server.node_information,
            last_updated: stored_server.last_updated
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
      operation.setStarted();
      var record = operation.records[0];
      var server = record.data;
      server.key = record.getId();

      var thisProxy = this;
      
      SERVER_STORE.save(server, function() {
        operation.setCompleted();
        operation.setSuccessful();
        if (typeof callback == 'function') {
            callback.call(scope || thisProxy, operation);
        }
      });
    },
    
    destroy: function(operation, callback, scope) {
      // TODO implement
      console.log("destroy server not implemented!");
    }
  })
);
 
app.models.Server = Ext.regModel("app.models.Server", {
  fields: [
    {name: "id", type: "string"},
    {name: "url", type: "string"},
    {name: "username", type: "string"},
    {name: "password", type: "string"},
    {name: "status", type: "string"}, // good | bad | unknown
    {name: "node_information", type: "object"},
    {name: "last_updated", type: "date"}
  ],
  proxy: {
      type: "serverstorage"
  }  
});

app.stores.servers = new Ext.data.Store({
  model: "app.models.Server"
});