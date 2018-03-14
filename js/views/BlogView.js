/*jshint esversion: 6 */

App.Views.BlogView = Backbone.View.extend({
	el: $('.grid'),

	initialize: function(){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

        App.Grids.BlogGridColumns.setPositions().sort();

        this.colManager = new Backgrid.Extension.ColumnManager(App.Grids.BlogGridColumns, {
            saveStateKey: "blogView",
            saveState: true,
            loadStateOnInit: true
        });

        this.colVisibilityControl = new Backgrid.Extension.ColumnManagerVisibilityControl({
            columnManager: this.colManager
        });

        // Fetch campaigns from the url
        const blogs = this.blogs = new App.Collections.Blogs();

        this.advancedFilter = new Backgrid.Extension.AdvancedFilter.Main({
            collection: this.blogs,
            columns: App.Grids.BlogGridColumns
        });

        let dataFiltered = false;
        this.advancedFilter.on("filter:apply", function(filterId, filterModel) {
            $('.content').fadeTo("fast", 0.33);
            dataFiltered = true;
            blogs.fetch({reset: true,
                success: function(){
                    const requestFilter = filterModel.exportFilter("mongo");
                    const resultDataIn = blogs.fullCollection.models.slice(0);
                    const resultDataOut = sift(requestFilter, resultDataIn);
                    blogs.fullCollection.reset(resultDataOut);
                    $('.content').fadeTo("fast", 1);
                }
            });
        });

        this.advancedFilter.on("filter:close filter:loaded filter:remove", function() {
            if (dataFiltered) {
                $('.content').fadeTo("fast", 0.33);
                dataFiltered = false;
                blogs.fetch({reset: true,
                    success: function(){
                        $('.content').fadeTo("fast", 1);
                    }
                });
            }
        });

        this.blogsGrid = new Backgrid.Grid({
            header: Backgrid.Extension.GroupedHeader,
            columns: App.Grids.BlogGridColumns,
            collection: this.blogs,
            row: App.Views.BlogView.LockedRow
        });

        // Set direction on other columns to null https://github.com/cloudflare/backgrid/issues/453#issuecomment-56760096
        this.blogsGrid.collection.on('backgrid:sort', function(model) {
            // No ids so identify model with CID
            const cid = model.cid;

            const filtered = model.collection.filter(function(model) {
                return model.cid !== cid;
            });

            _.each(filtered, function(model) {
                model.set('direction', null);
            });
        });

        this.blogsGrid.sort('id', 'ascending');

        this.paginator = new Backgrid.Extension.Paginator({
            collection: this.blogs
        });

        this.sizeAbleColumns = new Backgrid.Extension.SizeAbleColumns({
            columns: App.Grids.BlogGridColumns,
            collection: this.blogs,
            grid: this.blogsGrid
        });

        // Add resize handlers
        const sizeHandler = this.sizeHandler = new Backgrid.Extension.SizeAbleColumnsHandlers({
            sizeAbleColumns: this.sizeAbleColumns,
            grid: this.blogsGrid,
            saveColumnWidth: true
        });

        // Add orderable handlers
        this.orderHandler = new Backgrid.Extension.OrderableColumns({
            sizeAbleColumns: this.sizeAbleColumns,
            grid: this.blogsGrid
        });

        const thisRef = this;
        this.colManager.on("toggle-column-visibility", function (column) {
            const grid = $('.grid');
            grid.find('size-able-columns').remove();
            grid.find('size-handler').remove();
            grid.find('order-handler').remove();
            thisRef.addSizer(grid);
        });

        App.Grids.BlogGridColumns.on("ordered", function () {
            App.Grids.BlogGridColumns.setPositions().sort();
            const main = $('#main');
            main.find('#grid-control').html(thisRef.colVisibilityControl.render().el);
        });

        this.render(); // not all views are self-rendering. This one is.

        const linePerPageControl = $('#grid-line-per-page');
        linePerPageControl.off('change');
        linePerPageControl.val(blogs.state.pageSize);

        linePerPageControl.on('change', function() {
            const val = linePerPageControl.val();
            const newVal = parseInt(val);
            if (newVal === blogs.state.pageSize) {
                return;
            } else if (newVal <= 0 || isNaN(newVal) || ('' + newVal !== val)) {
                linePerPageControl.val(blogs.state.pageSize);
                return;
            }

            blogs.state.pageSize = newVal;
            const resultDataIn = blogs.fullCollection.models.slice(0);
            blogs.fullCollection.reset(resultDataIn);
        });
	},
    
    addSizer: function (grid) {
        const thead = grid.find('thead');

        let l = this.sizeAbleColumns.render().el;
        $(l).addClass("size-able-columns");
        thead.before(l);

        l = this.sizeHandler.render().el;
        $(l).addClass("size-handler");
        thead.before(l);

        l = this.orderHandler.render().el;
        $(l).addClass("order-handler");
        thead.before(l);
    },

	render: function(){
	    const main = $('#main');
        main.html($('#grid').html());
        const actions = $('#actions');
        actions.addClass('blog');

        main.find('#grid-control').html(this.colVisibilityControl.render().el);
        main.find('#grid-filter').html(this.advancedFilter.render().el);

        const content = $('.content');
        content.html(this.blogsGrid.render().el);
        this.addSizer(content);

        // Render the paginator
        $(main.find('.footer')).html(this.paginator.render().el);

        actions.on('click', '.newBlog', function () {
            const modalView = new App.Modals.BlogModal();
            $('.app').html(modalView.render().el);
        });
	},

	fetchGrid: function(){
	    const activeFilter = this.advancedFilter.filterStateModel.getActiveFilter();
	    if (activeFilter === undefined) {
            this.blogs.fetch({reset: true});
        } else {
	        const blogs = this.blogs;
            blogs.fetch({reset: true,
                success: function(){
                    const requestFilter = activeFilter.exportFilter("mongo");
                    const resultDataIn = blogs.fullCollection.models.slice(0);
                    const resultDataOut = sift(requestFilter, resultDataIn);
                    blogs.fullCollection.reset(resultDataOut);
                }
            });
        }
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
