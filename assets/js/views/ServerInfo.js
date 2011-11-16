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

app.views.ServerInfo = Ext.extend(Ext.TabPanel, {
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      title: 'RSB Server',
      items: [
        {
          id: 'back',
          text: 'Back',
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
          id: 'edit',
          text: 'Edit',
          ui: 'edit',
          listeners: {
            'tap': function () {
              // TODO implement editing + deleting existing server
              Ext.Msg.alert('Sorry!', 'Editing is not yet implemented.', Ext.emptyFn);
            }
          }
        }
      ]
    }
  ],
  tabBar: {
    dock: 'bottom',
    layout: {
      pack: 'center'
    },
    items: [
      {xtype:'spacer'},
      {
        id: 'refresh',
        dock: 'right',
        iconCls: 'refresh',
        text: 'Refresh',
        listeners: {
          'tap': function () {
            var record = this.record;
            
            fetchServerInfo(record.data.url, record.data.username, record.data.password,
              function(nodeInformation, status) {
                record.set({status: status,
                            node_information: nodeInformation,
                            last_updated: new Date()});
                record.save();
                app.views.serverInfo.updateWithRecord(record);
              }
            );
          }
        }
      },
      {
        id: 'settings',
        dock: 'right',
        iconCls: 'settings',
        text: 'Settings',
        listeners: {
          'tap': function () {
            // TODO implement settings panel
            Ext.Msg.alert('Sorry!', 'Settings is not yet implemented.', Ext.emptyFn);
          }
        }
      }
    ]
  },
  layout: 'fit',
  items: [
    {
      iconCls: 'info',
      title: 'Info',
      items: {
        xtype: 'formpanel',
        scroll: 'vertical',
        styleHtmlContent:true,
        submitOnAction: false,
        items: [ 
          {tpl:[
            '<h4>Connection</h4>',
            '<div class="field"><span class="label">URL: </span>{url}</div>',
            '<tpl if="username.length"><div class="field"><span class="label"><div class="lock_icon"></div></span>Password protected</div></tpl>'
          ]},
          {tpl:[
            '<h4>Information</h4>',
            '<div class="field"><span class="label">Name:</span>{node_information.name}</div>',
            '<div class="field"><span class="label">Healthy:</span>{node_information.healthy}</div>',
            '<div class="field"><span class="label">Uptime:</span>{node_information.uptimeText}</div>',
            '<div class="field"><span class="label">Container:</span>{node_information.servletContainerInfo}</div>',
          ]},
          {tpl:[
            '<h4>JVM Memory</h4>',
            '<div class="field"><span class="label">Free:</span>{node_information.jvmFreeMemory}</div>',
            '<div class="field"><span class="label">Max:</span>{node_information.jvmMaxMemory}</div>',
          ]},
          {tpl:[
            '<h4>OS</h4>',
            '<div class="field"><span class="label">Load avg:</span>{node_information.osLoadAverage}</div>',
          ]},
          {tpl:[
            '<div class="footnote">Last updated: {last_updated}</div>'
          ]}
        ]
      }
    },
    {
      iconCls: 'chart2',
      title: 'Statistics',
      items: {
        xtype: 'formpanel',
        scroll: 'vertical',
        styleHtmlContent:true,
        submitOnAction: false,
        items: [ 
          {tpl:[
            '<h4>Applications</h4>',
            '<div class="field">TBD...</div>'
          ]},
          {tpl:[
            '<div class="footnote">Last updated: {last_updated}</div>'
          ]}
        ]
      }
    },
    {
      iconCls: 'magic',
      title: 'Control',
      items: {
        xtype: 'formpanel',
        scroll: 'vertical',
        styleHtmlContent:true,
        submitOnAction: false,
        items: [ 
          {tpl:[
            '<h4>Control</h4>',
            '<div class="field">TBD...</div>'
          ]}
        ]
      }
    }
  ],
  initComponent: function() {
    // TODO add automatic refresh
    app.views.ServerInfo.superclass.initComponent.apply(this, arguments);
  },
  updateWithRecord: function(record) {
    // take a deep items dive :)
    Ext.each(this.items.items, function(item) {
      item.items.each(function(item2) {
        item2.items.each(function(item3) {
          item3.update(record.data);
        });
      });
    });
    var toolbar = this.getDockedItems()[0];
    toolbar.getComponent('edit').record = record;
    toolbar = this.getDockedItems()[1];
    toolbar.getComponent('refresh').record = record;
  }
});