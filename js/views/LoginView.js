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

	login: function (e) {
		e.preventDefault();
		var username = this.$('#login-username-input').val();
		var password = this.$('#login-password-input').val();
		this.errorEl = this.$('#login-error');
		this.errorEl.hide();

		if(username && password) {
			this.auth(username, password);
		}else{
			this.errorEl.show().text('Please enter your username and password');
		}

	},

	auth: function(login, password) {
		var self = this;

		$.post({
			async: false,
			crossOrigin: true,
			method: 'POST',
			url: App.baseUrl + '/oauth/v2/token',
			data: {
				'grant_type': 'password',
				'client_id': '1_g7fxszqcapkw84048o4kg4w8oc0800ccg80kko48ws0k44wow',
				'client_secret': '4ibwinsr1400cgcwggg88wookccwsoocckkcwcg40gc84socs4',
				'redirect_uri': 'https://api.aitext.me/oauth/oauth-callback',
				'username': login,
				'password': password
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			},
			success: function (response) {
				if (response.access_token) {
					App.Session.start(response.access_token);
				}
			},
			error: function (responseObject) {
				if (responseObject.responseJSON.error) {
					self.errorEl.show().text(responseObject.responseJSON.error_description);
				}
			}
		});

	}
});
