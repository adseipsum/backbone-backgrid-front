/*jshint esversion: 6 */

App.Views.BlogView = Backbone.View.extend({
	el: $('.grid'),

	initialize: function(){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

        this.colManager = new Backgrid.Extension.ColumnManager(App.Grids.BlogGridColumns, {
            saveStateKey: "blogView",
            saveState: true,
            loadStateOnInit: true
        });

        this.colVisibilityControl = new Backgrid.Extension.ColumnManagerVisibilityControl({
            columnManager: this.colManager
        });

        // Fetch campaigns from the url
        this.blogs = new App.Collections.Blogs();
        this.blogsGrid = new Backgrid.Grid({
            columns: App.Grids.BlogGridColumns,
            collection: this.blogs,
            row: App.Views.BlogView.LockedRow
        });

        const sizeAbleColumns = this.sizeAbleColumns = new Backgrid.Extension.SizeAbleColumns({
            columns: App.Grids.BlogGridColumns,
            collection: this.blogs,
            grid: this.blogsGrid
        });

        // Add resize handlers
        const sizeHandler = this.sizeHandler = new Backgrid.Extension.SizeAbleColumnsHandlers({
            sizeAbleColumns: this.sizeAbleColumns,
            grid: this.blogsGrid,
            saveModelWidth: true
        });

        const thisRef = this;
        this.colManager.on("toggle-column-visibility", function (column) {
            const grid = $('.grid');
            grid.find('size-able-columns').remove();
            grid.find('size-handler').remove();
            thisRef.addSizer(grid);
        });

        this.render(); // not all views are self-rendering. This one is.
	},
    
    addSizer: function (grid) {
        const thead = grid.find('thead');
        let l = this.sizeAbleColumns.render().el;
        $(l).addClass("size-able-columns");
        thead.before(l);
        l = this.sizeHandler.render().el;
        $(l).addClass("size-handler");
        thead.before(l);
    },

	render: function(){
	    const main = $('#main');
        main.html($('#grid').html());
        const actions = $('#actions');
        actions.addClass('blog');

        main.find('#grid-control').append(this.colVisibilityControl.render().el);
        const grid = $('.grid');
        grid.html(this.blogsGrid.render().el);
        this.addSizer(grid);

        actions.on('click', '.newBlog', function () {
            const modalView = new App.Modals.BlogModal();
            $('.app').html(modalView.render().el);
        });
	},

	fetchGrid: function(){
		// Fetch blogs from the url
		this.blogs.fetch({reset: true});
	},

});

App.Views.BlogView.LockedRow = Backgrid.Row.extend({
	render: function() {
		Backgrid.Row.prototype.render.call(this);
		if (this.model.get('locked')) {
			this.$el.addClass('locked');
		} else {
			this.$el.removeClass('locked');
		}
		return this;
	}
});
