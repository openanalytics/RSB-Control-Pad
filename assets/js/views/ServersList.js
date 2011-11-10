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

app.views.ServersList = Ext.extend(Ext.Panel, {
  dockedItems: [{
    xtype: 'toolbar',
    title: 'RSB Servers',
    items: [
      {xtype:'spacer'},
      {xtype:'spacer'},
      {
        id: 'add',
        text: 'Add',
        ui: 'action',
        listeners: {
          'tap': function () {
            console.log('Add listener started'); // FIXME remove
            Ext.dispatch({
              controller: app.controllers.servers,
              action: 'add'
            });
            console.log('Add listener finished'); // FIXME remove
          }
        }
      }
    ]
  }],
  layout: 'fit',
  items: [
    {
      xtype: 'list',
      cls: 'server-list',
      store: app.stores.servers,
      // TODO if name is blank display url
      itemTpl: "<div class='server'><div class='status_{status}'></div><div class='name'>{name}</div></div>",
      onItemDisclosure: function (record) {
        // TODO activate
        //Ext.dispatch({
        //  controller: app.controllers.servers,
        //  action: 'show',
        //  id: record.getId()
        //});
      }
    }    
  ],
  initComponent: function() {
    app.stores.servers.load();
    app.views.ServersList.superclass.initComponent.apply(this, arguments);
  }
});