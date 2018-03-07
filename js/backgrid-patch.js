/*jshint esversion: 6 */


/**
 * base on https://github.com/FortesSolutions/backgrid-sizeable-columns/blob/master/backgrid-patch.js 77eba16 on 4 Dec 2014
 *
 * Following functions are meant as override of current Backgrid (0.3.8) functionality.
 *
 * This is because the sizeable, orderable and groupable backgrid extensions need this.
 * Should not be needed anymore once https://github.com/wyuenho/backgrid/pull/546 has been discussed
 */


Backgrid.Column.prototype.sortValue = function () {
    const sortValue = this.get("sortValue");
    if (_.isString(sortValue)) {
        return function (model, colName) {
            return model.get(sortValue);
        };
    } else if (_.isFunction(sortValue)) {
        return sortValue;
    }

    return function (model, colName) {
        return model.get(colName);
    };
};


Backgrid.Body.prototype.makeComparator = function (attr, order, func) {
    return function (left, right) {
        // extract the values from the models
        let l = func(left, attr);
        let r = func(right, attr);

        // if descending order, swap left and right
        if (order === 1) {
            const t = l;
            l = r;
            r = t;
        }

        // compare as usual
        const ret = $.fn.naturalComparator(l, r);
        return ret;
    };
};

Backbone.PageableCollection.prototype._makeComparator = function (sortKey, order, sortValue) {
    const state = this.state;

    sortKey = sortKey || state.sortKey;
    order = order || state.order;

    if (!sortKey || !order) {
        return;
    }

    if (!sortValue) {
        sortValue = function (model, attr) {
            return model.get(attr);
        };
    }

    return Backgrid.Body.prototype.makeComparator(sortKey, order, sortValue);
};

Backgrid.HeaderCell.prototype.render = function () {
    this.$el.empty();
    const column = this.column;
    const sortable = Backgrid.callByNeed(column.sortable(), column, this.collection);
    let label;
    if(sortable){
        label = $("<button>").text(column.get("label")).append("<span class='sort-caret' aria-hidden='true'></span>");
    } else {
        label = document.createTextNode(column.get("label"));
    }

    this.$el.append(label);
    this.$el.addClass(column.get("name"));
    this.$el.attr("data-column-cid", column.cid);        // CHANGE STRING
    this.$el.addClass(column.get("direction"));
    if (column.get("attributes")) {                      // CHANGE STRING
        this.$el.attr(column.get("attributes"));         // CHANGE STRING
    }                                                    // CHANGE STRING
    this.delegateEvents();
    return this;
};

Backgrid.Header.prototype.initialize = function (options) {
    this.columns = options.columns;
    if (!(this.columns instanceof Backbone.Collection)) {
        this.columns = new Backgrid.Columns(this.columns);
    }
    this.createHeaderRow();                                 // CHANGE STRING

    this.listenTo(this.columns, "sort", _.bind(function() { // CHANGE STRING
        this.createHeaderRow();                             // CHANGE STRING
        this.render();                                      // CHANGE STRING
    }, this));                                              // CHANGE STRING
};

Backgrid.Header.prototype.createHeaderRow = function() {
    this.row = new Backgrid.HeaderRow({
        columns: this.columns,
        collection: this.collection
    });
};

Backgrid.Header.prototype.render = function () {
    this.$el.empty();                                         // CHANGE STRING
    this.$el.append(this.row.render().$el);
    this.delegateEvents();

    this.trigger("backgrid:header:rendered", this);           // CHANGE STRING

    return this;
};
