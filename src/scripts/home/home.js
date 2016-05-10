define(function (require) {

  'use strict';

  var Backbone = require('backbone');
  var SubView = require('home/subview');
  var RobotView = require('home/robot');
  var MapView = require('home/map');
  var QuoteView = require('home/quote');

  var QuoteModel = require('home/models/quote');
  var QuoteCollection = require('home/collections/quotes');

  var IP = require('home/models/ip');
  // var Collection = require('home/collections/collection');
  // var Model = require('home/models/model');


  var tpl = require('text!home/templates/home.ejs');
  var template = _.template(tpl);

  return Backbone.View.extend({

    events: {
      'click .new-subview': 'launchNewSubview',
      'click button#play' : 'playQuote'
    },

    initialize: function(options) {
      this.state = options.state;
      this.subViews = [];
      // this.collection = new Collection();
      this.listenTo(this.state, 'change:ip', this.showRobot);
      this.listenTo(this.state, 'robot:loaded', this.showMap);
      window.col = this.collection;
    },

    render: function() {
      this.$el.html(template(this));
      $('body').addClass('home-body');
      // this.start();
      this.getUserIP();
      this.showQuoteView();
      return this;
    },

    getUserIP: function() {
      var ip = new IP({state:this.state});
      // this.listenTo(ip, 'sync', this.onIpSync);
      ip.fetch();
    },

    showRobot: function(){
      var robot = new RobotView({state: this.state});
      this.subViews.push(robot);
      this.$('.robot-map-container').prepend(robot.render().el);
    },

    showMap: function(){
      var map = new MapView({state: this.state});
      this.subViews.push(map);
      this.$('.robot-map-container').prepend(map.render().el);
    },

    showQuoteView: function(){
      var quoteView = new QuoteView({state: this.state});
      this.subViews.push(quoteView);
      this.$('.quote-container').prepend(quoteView.render().el);
    },

    playQuote: function() {
      this.state.trigger('play-quote');
    },

    // ---------------------------------


    // addToCollection: function(model) {
    //   this.collection.add(model);
    //   this.collection.save();
    //   console.log(this.collection.models);
    // },


    // ---------------------------------

    // launchNewSubview: function() {
    //   var view = new SubView({
    //     state: this.state
    //   });
    //   this.subViews.push(view);
    //   this.$('.subview-container').prepend(view.render().el);
    //   this.listenTo(view, 'close', this.onSubviewClose);
    // },

    onSubviewClose: function() {
      //
    },

    // -------------------------------------------

    removeSubViews: function() {
      _.each(this.subviews, function(subview){
        subview.remove();
      })
    },

    remove: function() {
      $('body').removeClass('home-body');
      this.removeSubviews();
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  })

});

