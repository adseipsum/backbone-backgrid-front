/*jshint esversion: 6 */

App.Views.HeaderView = Backbone.View.extend({

	template: _.template($('#header').html()),

	initialize: function () {

		// Listen for session logged_in state changes and re-render
		//App.Session.Instance.on("change:logged_in", this.onLoginStatusChange);
	},

	events: {
		"click #logout-link"         : "onLogoutClick",
		"click #remove-account-link" : "onRemoveAccountClick"
	},

	onLoginStatusChange: function(e){

	},

	onLogoutClick: function(evt) {
		evt.preventDefault();
		App.Session.logout({});  // No callbacks needed b/c of session event listening
	},

	render: function () {
		this.$el.html(this.template({
			logged_in: App.Session.logged_in,
			user: App.Session.user
		}));
		return this;
	},

});