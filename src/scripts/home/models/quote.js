define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

      initialize: function() {
        this.collection = require('home/collections/quotes');
      },

      url: function() {
        return 'http://quotesondesign.com/wp-json/posts?filter%5Borderby%5D=rand&filter%5Bposts_per_page%5D=1&cb=' + this.cacheBust();
      },

      cacheBust: function() {
        var date = new Date();
        return date.getTime();
      },

      parse: function(response, options){
        response = response[0];
        response.id = response.ID;
        response.text = $(response.content).text();
        return response;
      },

    });
});
