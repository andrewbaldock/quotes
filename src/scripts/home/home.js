define(function (require) {

  'use strict';

  var Backbone =         require('backbone');
  var RobotView =        require('home/robot');
  var MapView =          require('home/map');
  var QuoteView =        require('home/quote');
  var QuoteListView =    require('home/list');
  var IpModel =          require('home/models/ip');
  var QuoteModel =       require('home/models/quote');
  var QuotesCollection = require('home/collections/quotes');

  var tpl = require('text!home/templates/home.ejs');
  var template = _.template(tpl);

  return Backbone.View.extend({

    // EVENTS ---------------------------------------------

    events: {
      'click .new-subview':   'launchNewSubview',
      'click button#play':    'playQuote',
      'click button#list':    'showQuoteList',
      'click button#yoda':    'yoda',
      'keyup .search':        'onSearch'
    },

    // INITIALIZE -----------------------------------------

    initialize: function(options) {
      this.state = options.state;
      this.subViews = [];
      this.collection = new QuotesCollection({},{state: this.state});

      this.listenTo(this.state, 'change:ip', this.showRobot);
      this.listenTo(this.state, 'robot:loaded', this.showMap);
      this.listenTo(this.state, 'close-list-view', this.closeListView);
    },

    onSearch: function(e) {
      var val = this.getSearchVal();
      this.state.set({search: val});
    },

    getSearchVal: function() {
      return this.$('input.search').val();
    },

    // RENDER ---------------------------------------------

    render: function() {
      this.$el.html(template(this));
      $('body').addClass('home-body');
      this.getUserIP();
      this.showQuoteView();
      return this;
    },

    getUserIP: function() {
      var ip = new IpModel({
        state:this.state
      });
      ip.fetch();
    },

    showRobot: function(){
      var robot = new RobotView({
        state: this.state
      });
      this.subViews.push(robot);
      this.$('.robot-span').prepend(robot.render().el);
    },

    showMap: function(){
      var map = new MapView({
        state: this.state
      });
      this.subViews.push(map);
      this.$('.map-span').prepend(map.render().el);
    },

    showQuoteView: function(){
      var quoteView = new QuoteView({
        state: this.state,
        collection: this.collection
      });
      this.subViews.push(quoteView);
      this.$('.quote-container').prepend(quoteView.render().el);
    },

    playQuote: function() {
      this.state.trigger('play-quote');
    },

    showQuoteList: function() {
      this.renderQuoteList();
      this.$('.not-list-container').hide();
      this.$('.list-container, .search-div').show();
    },

    renderQuoteList: function() {
      var list = new QuoteListView({
        state: this.state,
        collection: this.collection
      });
      this.subViews.push(list);
      this.$('.list-container').append(list.render().el);
    },

    closeListView: function() {
      this.$('.not-list-container').show();
      this.$('.list-container, .search-div').hide();
    },

    yoda: function() {
      alert('Soon, Yodaspeak coming is.')
    },

    // UTILS ------------------------------------------------

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

