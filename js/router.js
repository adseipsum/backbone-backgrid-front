/*jshint esversion: 6 */



App.Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'login': 'login',
		'campaigns': 'campaigns',
		'blogs': 'blogs'
	},

	index: function() {
//		console.log('index');
		this.navigate("campaigns", {trigger: true});
	},

	login: function () {
//		console.log('login');
        App.currentView = new App.Views.LoginView();
        App.currentView.render();
	},

	campaigns: function(){
//		console.log('campaigns');

        App.currentView = new App.Views.CampaignView();
        App.currentView.fetchGrid();
        $.fn.changeAutoUpdate();

		$('#actions').html($('#campaign-action-buttons-template').html());
	},

	blogs: function(){
//		console.log('blogs');

        App.currentView = new App.Views.BlogView();
        App.currentView.fetchGrid();
        $.fn.changeAutoUpdate();

		$('#actions').html($('#blog-action-buttons-template').html());
	},

	execute: function(callback, args, name) {
		if(App.currentLoop) {
			clearInterval(App.currentLoop);
		}
		if (callback) callback.apply(this, args);
	}
});

$.fn.changeAutoUpdate = function() {
    if ($('#auto-update-enable').is(":checked")) {
        App.currentLoop = setInterval(function () {
            App.currentView.fetchGrid();
        }, 4000);
    } else {
        clearInterval(App.currentLoop);
        App.currentLoop = null;
    }
}
