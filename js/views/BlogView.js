/*jshint esversion: 6 */

App.Views.BlogView = Backbone.View.extend({
	el: $('.grid'),

	initialize: function(){
		_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

		// Fetch campaigns from the url
		this.blogs = new App.Collections.Blogs();
		this.blogsGrid = new Backgrid.Grid({
			columns: App.Grids.BlogGridColumns,
			collection: this.blogs,
			row: App.Views.BlogView.LockedRow
		});

		this.render(); // not all views are self-rendering. This one is.
	},

	render: function(){
		$('#main').html($('#grid').html());
		const actions = $('#actions');
        actions.addClass('blog');
		$('.grid').html(this.blogsGrid.render().el);
        actions.on('click', '.newBlog', function () {
			const modalView = new App.Modals.BlogModal();
			$('.app').html(modalView.render().el);
		});

        $('table.backgrid').floatThead();
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
})