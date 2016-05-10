define(function (require) {

  'use strict';

  var Backbone = require('backbone');

  var tpl = require('text!home/templates/subview.ejs');
  var template = _.template(tpl);

  return Backbone.View.extend({

    // EVENTS -----------------------------------------------

    events: {
      //
    },

    // INITIALIZE -------------------------------------------

    initialize: function(options) {
      //
    },


    // RENDER ------------------------------------------------

    render: function() {
      this.$el.html(template(this.getRenderData()));
      this.$el.addClass('subview');
      return this;
    },

    getRenderData: function() {
      return {
        //
      }
    },

    remove: function() {
      this.trigger('close');
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  })

});

