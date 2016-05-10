define(function (require) {

  'use strict';

  var Backbone = require('backbone');

  var ContainerView = require('app/views/container');
  var State = require('app/models/state');

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'goTo_homeView'
    },

    initialize: function(){
      if (!this.state) {
          this.state = new State();
      }
      if (!this.container) {
          this.container = new ContainerView({state: this.state});
      }
    },

    goTo_homeView: function() {
      this.container.render();
      this.state.set('view', 'home');
    },

  });

  return new AppRouter();
});
