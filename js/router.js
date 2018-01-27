App.Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'login': 'login',
		'campaigns': 'campaigns',
		'blogs': 'blogs'
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
		var CampaignView = new App.Views.CampaignView();
		CampaignView.fetchCampaignGrid();
		App.currentLoop = setInterval(function() {
			CampaignView.fetchCampaignGrid();
		}, 4000);
	},

	blogs: function(){
		console.log('blogs');
		var BlogView = new App.Views.BlogView();
		BlogView.fetchBlogGrid();
		App.currentLoop = setInterval(function() {
			BlogView.fetchBlogGrid();
		}, 4000);
	},

	execute: function(callback, args, name) {
		if(App.currentLoop) {
			clearInterval(App.currentLoop);
		}
		if (callback) callback.apply(this, args);
	}
});