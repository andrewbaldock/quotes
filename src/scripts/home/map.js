define(function (require) {

  'use strict';

  var Backbone = require('backbone');

  var tpl = require('text!home/templates/map.ejs');
  var template = _.template(tpl);

  return Backbone.View.extend({

    // EVENTS -----------------------------------------------

    events: {
      //
    },

    // INITIALIZE -------------------------------------------

    initialize: function(options) {
      this.state = options.state;
    },


    // RENDER ------------------------------------------------

    render: function() {
      this.$el.html(template(this.getRenderData()));
      this.$el.addClass('map');
      return this;
    },

    getRenderData: function() {
      // var url = 'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=300x100&markers=37.7758,-122.4128&key=AIzaSyB7AjTQhkSyetbfqGi704_hmKb-x1MeFJM'

      return {
        // url: url
      }
    },

    remove: function() {
      this.trigger('close');
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  })

});

