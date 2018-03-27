/*jshint esversion: 6 */

App.Models.Session = Backbone.Model.extend({

	initialize: function(){
		this.user = new App.Models.UserModel;
	},

	checkAuth: function(){
		App.token = App.token.length > 1 ? App.token : localStorage.getItem("token");

		if(App.token){
			this.getUserInfo();
			Backbone.history.navigate("/index", true);
		}else{
			Backbone.history.navigate("/login", true);
		}
	},

	auth: function(login, password, errorEl) {
		var self = this;
		var token;

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
					App.token = response.access_token;
					localStorage.setItem("token", App.token);
					self.getUserInfo();
					Backbone.history.navigate("/index", true);
				}
			},
			error: function (response) {
				if (response.error) {
					errorEl.show().text(response.error_description);
				}
			}
		});

	},

	getUserInfo: function () {
		var self = this;
		$.post({
			async: false,
			method: 'GET',
			url: App.baseUrl + '/frontapi/v1/getuserinfo',
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer ".concat(App.token));
			},
			success: function(response){
				self.updateSessionUser(response);
			}
		});
	},

	updateSessionUser: function( userData ){
		this.user.set('username', userData.username);
		this.user.set('roles', userData.roles);
	},

	isInRole: function (roles) {
		var allowed = false;
		var userRoles = this.user.get('roles');

		if(!roles || $.isEmptyObject(userRoles)){
			return false;
		}

		var self = this;
		$.each(roles, function(i) {
			if (userRoles.indexOf(roles[i]) > -1) {
				allowed = true;
			}
		});

		if(allowed){
			return true;
		}

		return false;
	}

});
