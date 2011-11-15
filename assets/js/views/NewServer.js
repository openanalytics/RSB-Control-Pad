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

app.views.NewServer = Ext.extend(Ext.form.FormPanel, {
  dockedItems: [{
    xtype: 'toolbar',
    title: 'New Server',
    items: [
      {
        text: 'Cancel',
        ui: 'back',
        listeners: {
          'tap': function () {
            Ext.dispatch({
              controller: app.controllers.servers,
              action: 'list',
              animation: {type:'slide', direction:'right'}
            });
          }
        }
      },
      {xtype:'spacer'},
      {
        id: 'save',
        text: 'Save',
        ui: 'action',
        listeners: {
          'tap': function () {
            var fields = app.views.newServer.fields;
            var url = fields.get('new_server_url').getValue();
            var username = fields.get('new_server_username').getValue();
            var password = fields.get('new_server_password').getValue();
            
            var authHeader = '';
            if (!Ext.isEmpty(username) && !Ext.isEmpty(password)) {
              authHeader = 'Basic ' + BASE64.encode(username + ':' + password);
            }
            
            // TODO show busy cursor
            // FIXME inject username/password in URL if present
            Ext.Ajax.request({
              url:url + '/api/rest/system/info',
              method: 'GET',
              headers: {'Accept': 'application/vnd.rsb+json',
                        'Authorization': authHeader},
              success: function (result, request) {                 
                var nodeInformation = JSON.parse(result.responseText).nodeInformation;
                var status = nodeInformation.healthy? 'good' : 'bad';
                var newRecords = app.stores.servers.add({url: url,
                                                         username: username,
                                                         password: password,
                                                         status:status,
                                                         node_information: nodeInformation,
                                                         last_updated: new Date()});
                newRecords[0].save();
                Ext.dispatch({
                  controller: app.controllers.servers,
                  action: 'info',
                  url: url
                });
              },
              failure: function (result, request) {
                Ext.Msg.alert('Error', 'Failed to contact RSB server at the provided URL', Ext.emptyFn);
              } 
            });
          }
        }
      }
    ]
  }],
  scroll: 'vertical',
  submitOnAction: false,
  items: [
    {
      xtype: 'fieldset',
      title: 'Connection Info',
      instructions: 'Fields marked * are mandatory.',
      defaults: {
        labelAlign: 'left',
        labelWidth: '30%',
        required: false
      },
      items: [
        {
          id: 'new_server_url',
          xtype: 'textfield',
          name : 'url',
          label: 'URL',
          useClearIcon: true,
          autoCapitalize : false,
          required: true
        },
        {
          id: 'new_server_username',
          xtype: 'textfield',
          name : 'username',
          label: 'Username',
          useClearIcon: true,
          autoCapitalize : false,
        },
        {
          id: 'new_server_password',
          xtype: 'passwordfield',
          name : 'password',
          label: 'Password',
          autoCapitalize : false,
          useClearIcon: false
        }        
      ]
    }
  ]
});
