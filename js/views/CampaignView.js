App.Views.CampaignView = Backbone.View.extend({
	el: $('.grid'),

	initialize: function(){
		_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

		// Fetch campaigns from the url
		this.campaigns = new App.Collections.Campaigns();
		this.campaignsGrid = new Backgrid.Grid({
			columns: App.Grids.CampaignGridColumns,
			collection: this.campaigns
		});

		this.render(); // not all views are self-rendering. This one is.
	},

	render: function(){
		$('#main').html($('#grid').html());
		$('#actions').addClass('campaign');
		$('.grid').html(this.campaignsGrid.render().el);
		$('#actions').on('click', '.newCampaign', function () {

			if($(this).data('type') == 'backlinked'){
				var modalView = new App.Modals.CampaignBacklinkedModal();
			}else if($(this).data('type') == 'regular'){
				var modalView = new App.Modals.CampaignRegularModal();
			}

			$('.app').html(modalView.render().el);
			modalView.getBlogTags();
		});
	},

	fetchCampaignGrid: function(){
		this.campaigns.fetch({reset: true});
	},

});