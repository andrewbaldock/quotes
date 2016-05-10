define(function (require) {

  'use strict';

  var Backbone = require('backbone');

  var QuoteModel = require('home/models/quote');
  var QuotesCollection = require('home/collections/quotes');

  var tpl = require('text!home/templates/quote.ejs');
  var template = _.template(tpl);

  var spokenTpl = require('text!home/templates/quote_audio.ejs');
  var spokenTemplate = _.template(spokenTpl);

  return Backbone.View.extend({

    // EVENTS -----------------------------------------------

    events: {
      'click button': 'rateQuote'
    },

    // INITIALIZE -------------------------------------------

    initialize: function(options) {
      this.state = options.state;
      this.model = new QuoteModel({}, {state:this.state});
      this.collection = new QuotesCollection({},{state: this.state});
      this.listenTo(this.model, 'sync', this.showQuote);
      this.listenTo(this.state, 'play-quote', this.playQuote);
    },

    // Actions -------------------------------------------------

    rateQuote: function(e) {
      var rating = e.currentTarget.id;
      this.model.set({rating: rating});
      this.addToCollection(this.model);
      // console.log('rated it!');
      this.showSpinner();
      window.setTimeout(function(){
        this.render();
      }.bind(this), 1200);
    },

    getQuote: function() {
      this.model.fetch();
    },

    showQuote: function(model) {
      this.$('.quote-container').html(this.model.get('content'));
      this.$('.audio-quote-container').html(spokenTemplate());

      // console.log('view/quote.js showQuote');
      // console.log(this.collection);
    },



    // RENDER ------------------------------------------------

    render: function() {
      this.$el.html(template(this.getRenderData()));
      this.$el.addClass('quote');
      this.getQuote();
      return this;
    },

    getRenderData: function() {
      return {}
    },

    playQuote: function() {
      var html = this.model.get('content');
      var text = $(html).text();
      var encoded = encodeURI(this.model.get('text'));
      var url = 'http://api.voicerss.org/?key=224866d5892a49c4bb768f6f1679b8d4&src=' + encoded + '&hl=en-us'
      this.$('.audio-quote-container iframe').attr('src', url);
    },


    // UTILS -------------------------------------------------

    addToCollection: function(model) {
      this.collection.load();
      this.collection.add(model);
      this.collection.save();
      // console.log(this.collection.models);
    },

    showSpinner: function() {
      this.$('.spinner').show();
    },

    hideSpinner: function() {
      this.$('.spinner').hide();
    },

    remove: function() {
      this.trigger('close');
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  })

});

