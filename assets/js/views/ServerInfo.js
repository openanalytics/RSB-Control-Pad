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

app.views.ServerInfo = Ext.extend(Ext.form.FormPanel, {
  dockedItems: [{
    xtype: 'toolbar',
    title: 'Server Info',
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
      {xtype:'spacer'}
    ]
  }],
  scroll: 'vertical',
  submitOnAction: false,
  styleHtmlContent:true,
  items: [
    // TODO add content
  ],
  initComponent: function() {
    // TODO fetch server info over HTTP
    app.views.ServerInfo.superclass.initComponent.apply(this, arguments);
  },
  updateWithRecord: function(record) {
    var toolbar = this.getDockedItems()[0];
    toolbar.setTitle(record.get('name'));
    toolbar.getComponent('back').record = record;
  }
});