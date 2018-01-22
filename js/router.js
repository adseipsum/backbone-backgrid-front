App.Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'login': 'login',
		'campaigns': 'campaigns'
	},

	index: function() {
		console.log('index');
		this.navigate("campaigns", {trigger: true});
	},

	login: function () {
		console.log('login');
		var LoginView = new App.Views.LoginView();
		LoginView.render();
	},

	campaigns: function(){
		console.log('campaigns');
		var CampaignsView = new App.Views.CampaignsView();
		CampaignsView.fetchCampaignsGrid();
	}
});