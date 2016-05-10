define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Collection.extend({

      initialize: function() {
        this.load();
        this.model = require('home/models/quote');
      },

      // Proof-of-concept store data to localstorage.
      // TODO: save to mongo

      save: function() {
        var toSave = JSON.stringify(this.models);
        localStorage.setItem('myQuotes', toSave);
      },

      load: function() {
        var toLoad = localStorage.getItem('myQuotes') || [];
        if (toLoad.length) {
          toLoad = JSON.parse(toLoad);
        }
        this.reset(toLoad);
      }

    });

});