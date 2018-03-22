/*jshint esversion: 6 */

App.Views.LoginView = Backbone.View.extend({
	el: $('#main'),

	events: {
		"click #login-btn": "login"
	},

	initialize: function(){
		this.render();
	},

	render: function(){
		$(this.el).html($('#login').html());
	},

	login: function () {
		var username = this.$('#login-username-input').val();
		var password = this.$('#login-password-input').val();
		var errorEl = this.$('#login-error');
		errorEl.hide();
		App.Session.auth(username, password, errorEl);
	}

});
