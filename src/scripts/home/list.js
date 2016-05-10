define(function (require) {

  'use strict';

  var Backbone = require('backbone');

  var tpl = require('text!home/templates/list.ejs');
  var template = _.template(tpl);

  return Backbone.View.extend({

    // EVENTS -----------------------------------------------

    events: {
      'click button.close-list': 'remove'
    },

    // INITIALIZE -------------------------------------------

    initialize: function(options) {
      this.state = options.state;
      this.collection = options.collection;
      this.listenTo(this.state, 'change:search', this.render);
    },

    // RENDER ------------------------------------------------

    render: function() {
      this.$el.html(template());
      this.$el.addClass('list');
      this.renderRows();
      return this;
    },

    getCurrentModels: function() {
      var searchVal = this.state.get('search');
      if (searchVal) {
        var match = [];
        _.each(this.collection.models, function(model){
          if (model.get('content') && model.get('content').toLowerCase().indexOf(searchVal.toLowerCase()) > -1) {
            match.push(model);
          }
        })
        return match;
      } else {
        return this.collection.models;
      }
    },

    renderRows: function() {
      this.collection.load();
      var models = this.getCurrentModels();
      _.each(models, function(model) {
        var id = model.get('id');
        var quote = $(model.get('content')).text();
        var rating = model.get('rating');
        if(id && rating) {
          var row = '<tr><td>' + id + '</td><td class="quote-td">' + quote + '</td><td>' + rating + '</td></tr>';
          this.$('table.quotes-table').append(row);
        }
      }.bind(this))
    },

    // UTILS ------------------------------------------------

    remove: function() {
      this.$el.html('');
      this.state.trigger('close-list-view');
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  })

});

