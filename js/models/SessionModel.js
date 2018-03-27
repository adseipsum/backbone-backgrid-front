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

	start: function(token){
		this.setToken(token);
		this.getUserInfo();
		Backbone.history.navigate("/index", true);
	},

	setToken: function(token){
		App.token = token;
		localStorage.setItem("token", App.token);
	},

	clearToken: function(){
		App.token = '';
		localStorage.removeItem("token");
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
			error: function(responseObject){
				if(responseObject.responseJSON.error == 'invalid_grant'){
					self.clearToken();
					Backbone.history.navigate("/logout", true);
				}
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
