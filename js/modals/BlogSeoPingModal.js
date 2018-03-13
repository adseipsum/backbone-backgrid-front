/*jshint esversion: 6 */


App.Modals.BlogSeoPingModal = Backbone.Modal.extend({
    template: '#simple-template',
    cancelEl: '.bbm-button',

    constructor : function(blogId, domainName, checkTimestamp) {
        Backbone.Modal.apply(this);
        this.blogId = blogId;
        this.domainName = domainName;
        this.checkTimestamp = checkTimestamp;
    },

    onRender: function() {
        const pings = new App.Collections.BlogSeoPings(this.blogId);
        pings.fetch({reset: true});
        this.blogSeoPingsGrid = new Backgrid.Grid({
            columns: App.Grids.BlogSeoPingsGridColumns,
            collection: pings
        });
        const renderResult = this.blogSeoPingsGrid.render().el;
        const mainElement = $(this.el);
        mainElement.find('.modal-dialog').width(1000);
        mainElement.find('.modal-title').html('Ping info by ' + $.fn.unixTimeConverter(this.checkTimestamp) + ' for ' + this.domainName);
        const container = mainElement.find('#simple-template-main-container');
        container.html(renderResult);
    }

});
