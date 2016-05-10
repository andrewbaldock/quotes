define(function (require) {

  'use strict';

  var Backbone = require('backbone');
  var QuoteModel = require('home/models/quote');

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
      this.collection = options.collection;
      this.model = new QuoteModel({}, {state:this.state});
      this.listenTo(this.model, 'sync', this.showQuote);
      this.listenTo(this.state, 'play-quote', this.playQuote);
    },

    // RENDER ------------------------------------------------

    render: function() {
      this.$el.html(template());
      this.$el.addClass('quote');
      this.getQuote();
      return this;
    },

    getQuote: function() {
      this.model.fetch();
    },

    showQuote: function(model) {
      this.$('.quote-container').html(this.model.get('content'));
      this.$('.audio-quote-container').html(spokenTemplate());
    },

    // Actions -------------------------------------------------

    rateQuote: function(e) {
      this.$('.quote-container').html('');

      var rating = e.currentTarget.id;
      this.model.set({rating: rating});
      this.addToCollection(this.model);
      this.showSpinner();
      window.setTimeout(function(){
        this.render();
      }.bind(this), 1200);
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

