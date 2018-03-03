/*jshint esversion: 6 */

/**
   HtmlCell renders any html code
   
   use
   
   {
        name: "Model parameter name",
        label: "Column name",
        formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
            fromRaw: function (rawValue) {
                return 'HTML CONTENT';
                //You can use rawValue to custom your html, you can change this value using the name parameter.
            }
        }),
        cell: "html"
    }
   
   
   @class Backgrid.HtmlCell
   @extends Backgrid.Cell
*/
var HtmlCell = Backgrid.HtmlCell = Backgrid.Cell.extend({

    /** @property */
    className: "html-cell",
    
    initialize: function () {
        Backgrid.Cell.prototype.initialize.apply(this, arguments);
    },

    render: function () {
        this.$el.empty();
        var rawValue = this.model.get(this.column.get("name"));
        var formattedValue = this.formatter.fromRaw(rawValue, this.model);
        this.$el.append(formattedValue);
        this.delegateEvents();
        return this;
    }
});
