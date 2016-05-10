define(function (require) {

  'use strict';

  var Backbone = require('backbone');

  var homeView = require('home/home');

  var tpl = require('text!app/templates/container.ejs');
  var template = _.template(tpl);

  return Backbone.View.extend({

    el: '.app-content',

    initialize: function(options) {
      this.state = options.state;
      this.listenTo(this.state, 'change:view', this.handleViewChange);
      this.view;
    },

    render: function() {
      this.$el.html(template(this));
    },

    handleViewChange: function(state) {
      if (this.view) {
        this.removeSubViews();
      }

      // default
      if (!state.get('view')) {
        state.set('view', 'home');
      }

      if(state.get('view') === 'home') {
        this.view = new homeView({state: this.state});
        window.app = this.view;
      }

      this.$('.container').html(this.view.render().el);
      this.updateNav();
    },

    removeSubViews: function() {
      this.view.remove();
    },

    updateNav: function() {
      this.$('.global-nav a').removeClass('clicked');
      this.$('.global-nav #' + this.state.get('view')).addClass('clicked');
    },

    remove: function() {
      this.removeSubViews();
      Backbone.View.prototype.remove.apply(this,arguments);
    }

  })

});

