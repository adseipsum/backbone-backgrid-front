/*jshint esversion: 6 */

App.Views.LoginView = Backbone.View.extend({
	el: $('#main'),

	events: {
		"click #login-btn": "login"
	},

	initialize: function(){
		_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

		this.render(); // not all views are self-rendering. This one is.
	},

	render: function(){
		$(this.el).html($('#login').html());
	},

	login: function () {
		var username = this.$('#login-username-input').val();
		var password = this.$('#login-password-input').val();
		var errorEl = this.$('#login-error');
		errorEl.hide();
		errorEl.show().text(App.Session.auth(username, password, errorEl));
	}

});
