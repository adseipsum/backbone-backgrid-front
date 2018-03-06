/*
 Backgrid html-cell extension
 http://github.com/clementmouchet/backgrid-html-cell

 Copyright (c) 2017 clementmouchet.com
 Written by Clement Mouchet
 Licensed under the MIT @license
 */
(function () {
  var HtmlCell = Backgrid.HtmlCell = Backgrid.Cell.extend({

    /** @property */
    className: 'html-cell',

    initialize: function () {
      Backgrid.Cell.prototype.initialize.apply(this, arguments);
    },

    render: function () {
      this.$el.empty();
      var rawValue = this.model.get(this.column.get('name'));
      var formattedValue = this.formatter.fromRaw(rawValue, this.model);
      this.$el.append(formattedValue);
      this.delegateEvents();
      return this;
    }
  })
}).call(this);
