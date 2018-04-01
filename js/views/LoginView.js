/*jshint esversion: 6 */

App.Views.LoginView = Backbone.View.extend({
	el: $('#main'),

	events: {
		"click #login-btn": "login",
		"keypress #login-username-input": "keypress",
        "keypress #login-password-input": "keypress"
	},

	initialize: function(){
		this.render();
	},

	render: function(){
		$(this.el).html($('#login').html());
	},

	disableView: function() {
        this.$('#login-btn').attr("disabled", "disabled");
        this.$('#login-username-input').attr("disabled", "disabled");
        this.$('#login-password-input').attr("disabled", "disabled");
	},

    enableView: function() {
        this.$('#login-btn').removeAttr("disabled");
        this.$('#login-username-input').removeAttr("disabled");
        this.$('#login-password-input').removeAttr("disabled");
        this.$('#login-password-input').val("");
    },

    keypress: function (e) {
        if(e.which === 13) {
            this.login(e);
        }
	},

	login: function (e) {
		e.preventDefault();
        this.disableView();
		const username = this.$('#login-username-input').val();
		const password = this.$('#login-password-input').val();
		this.errorEl = this.$('#login-error');
		this.errorEl.hide();

		if(username && password) {
			this.auth(username, password);
		}else{
			this.errorEl.show().text('Please enter your username and password');
            this.enableView();
		}

	},

	auth: function(login, password) {
		const self = this;

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
				if (responseObject.responseJSON !== undefined && responseObject.responseJSON.error) {
					self.errorEl.show().text(responseObject.responseJSON.error_description);
				} else {
					window.alert("Internal server error");
				}
                self.enableView();
			}
		});

	}
});
