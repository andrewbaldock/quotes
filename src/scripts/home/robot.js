define(function (require) {

  'use strict';

  var Backbone = require('backbone');

  var tpl = require('text!home/templates/robot.ejs');
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
      this.$el.addClass('robot');
      this.state.trigger('robot:loaded');
      return this;
    },

    getRenderData: function() {
      var ip = this.state.get('ip') || '10.10.10.10'
      var url = 'https://robohash.org/' + ip + '.png?bgset=bg1&size=100x100'

      return {
        url: url
      }
    },

    remove: function() {
      this.trigger('close');
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  })

});

