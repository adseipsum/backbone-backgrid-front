/*jshint esversion: 6 */


App.Views.BlogView = App.Views.BaseView.extend({

    stateKey: "blogView",

    defaultSortField: "id",

    gridColumns: App.Grids.blogGridColumns,

    GridRowClass: Backgrid.Row.extend({
        render: function() {
            Backgrid.Row.prototype.render.call(this);
            if (this.model.get('locked')) {
                this.$el.addClass('locked');
            } else {
                this.$el.removeClass('locked');
            }
            return this;
        }
    }),

    Collections: App.Collections.Blogs,

    onAfterRender: function () {
        const actions = $('#actions');
        actions.addClass('blog');

        actions.on('click', '.newBlog', function () {
            const modalView = new App.Modals.BlogModal();
            $('.app').html(modalView.render().el);
        });
    }

});
