define(function (require) {

  'use strict';

  var Backbone = require('backbone');

  var tpl = require('text!home/templates/map.ejs');
  var template = _.template(tpl);

  return Backbone.View.extend({

    // RENDER ------------------------------------------------

    render: function() {
      this.$el.html(template());
      this.$el.addClass('map');
      return this;
    },

    remove: function() {
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  })

});

