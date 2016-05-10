define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Collection.extend({

      initialize: function() {
        this.load();
        this.model = require('home/models/quote');
      },

      save: function() {
        var toSave = JSON.stringify(this.models);
        localStorage.setItem('owlQuotes', toSave);
      },

      load: function() {
        var toLoad = localStorage.getItem('owlQuotes') || [];
        if (toLoad.length) {
          toLoad = JSON.parse(toLoad);
        }
        this.reset(toLoad);
      }

    });

});