/*jshint esversion: 6 */


App.Modals.BlogSeoAvailabilityModal = Backbone.Modal.extend({
    template: '#simple-template',
    cancelEl: '.bbm-button',

    constructor : function(blogId, url, checkTimestamp) {
        Backbone.Modal.apply(this);
        this.blogId = blogId;
        this.url = url;
        this.checkTimestamp = checkTimestamp;
    },

    onRender: function() {
        const availabilities = new App.Collections.BlogSeoAvailabilities(this.blogId);
        availabilities.fetch({reset: true});
        this.blogSeoAvailabilitiesGrid = new Backgrid.Grid({
            columns: App.Grids.BlogSeoAvailabilitiesGridColumns,
            collection: availabilities
        });
        const renderResult = this.blogSeoAvailabilitiesGrid.render().el;
        const mainElement = $(this.el);
        mainElement.find('.modal-dialog').width(1500);
        mainElement.find('.modal-title').html('Availabilities info by ' + $.fn.unixTimeConverter(this.checkTimestamp) + ' for ' + this.url);
        const container = mainElement.find('#simple-template-main-container');
        container.html(renderResult);
    }

});
