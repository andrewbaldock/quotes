define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

      url: 'http://ip-api.com/json',

      initialize: function(options) {
        this.state = options.state;
        this.listenTo(this, 'sync', this.onSync)
      },

      onSync: function() {
        var ip = this.get('query');
        this.state.set({ip: ip});
      }

    });
});
