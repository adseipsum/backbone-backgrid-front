App.Views.CampaignsView = Backbone.View.extend({
	el: $('.grid'),

	initialize: function(){
		_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

		// Fetch campaigns from the url
		this.campaigns = new App.Collections.Campaigns();
		this.campaignsGrid = new Backgrid.Grid({
			columns: App.Grids.CampaignsGridColumns,
			collection: this.campaigns
		});

		this.render(); // not all views are self-rendering. This one is.
	},

	render: function(){
		$('#main').html($('#grid').html());
		$('.grid').html(this.campaignsGrid.render().el);
	},

	fetchCampaignsGrid: function(){
		this.campaigns.fetch({reset: true});
	},

});