/*jshint esversion: 6 */

App.Views.HeaderView = Backbone.View.extend({

	template: _.template($('#header').html()),

	initialize: function () {
		if(App.token){
			if(!App.Session.isInRole(['ROLE_ADMIN'])){
			}
		}

		// Listen for session logged_in state changes and re-render
		//App.Session.Instance.on("change:logged_in", this.onLoginStatusChange);
	},

	render: function () {
		var data = {
			token: '',
			user: ''
		};

		if(App.token && App.Session.user){
			data.token = App.token;
			data.user = App.Session.user;
		}

		this.$el.html(this.template(data));
		return this;
	},

});