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
 
app.controllers.servers = new Ext.Controller({
  list: function(options) {
    app.views.viewport.setActiveItem(app.views.serversList, options.animation);
  },
  
  info: function(options) {
    var server = app.stores.servers.getByUrl(options.url);
    if (server) {
      app.views.serverInfo.updateWithRecord(server);
      app.views.viewport.setActiveItem(app.views.serverInfo, options.animation);
    }
  },
      
  add: function(options) {
    app.views.viewport.setActiveItem(app.views.newServer, options.animation);
  }
});
