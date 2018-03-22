/*jshint esversion: 6 */

App.Models.Session = Backbone.Model.extend({

	// Initialize with negative/empty defaults
	// These will be overriden after the initial checkAuth
	defaults: {
		logged_in: false,
		user_id: '',
		error: '',
	},

	initialize: function(){
		// Singleton user object
		// Access or listen on this throughout any module with app.session.user
		this.user = new App.Models.UserModel();
	},

	/*
	 * Check for session from API
	 * The API will parse client cookies using its secret token
	 * and return a user object if authenticated
	 */
	checkAuth: function() {
		var self = this;
		if(App.token){
			this.set({ logged_in : true });
			this.getUserInfo();
		}else{
			this.set({ logged_in : false });
		}
	},

	auth: function(login, password, errorEl) {
		event.preventDefault();
		var self = this;
		var token;

		$.post({
			async: false,
			method: 'POST',
			url: App.baseUrl + '/oauth/v2/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				'grant_type': 'password',
				'client_id': '1_g7fxszqcapkw84048o4kg4w8oc0800ccg80kko48ws0k44wow',
				'client_secret': '4ibwinsr1400cgcwggg88wookccwsoocckkcwcg40gc84socs4',
				'redirect_uri': 'https://api.aitext.me/oauth/oauth-callback',
				'username': login,
				'password': password
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			},
			success: function () {
				self.set({ logged_in : true });
			},
			complete: function (response) {
				if (response.responseJSON.access_token) {
					token = response.responseJSON.access_token;
					Backbone.history.navigate("/campaigns", true);
				}

				if (response.responseJSON.error) {
					self.set({ logged_in : false });
					errorEl.text(response.responseJSON.error_description);
				}
			}
		});

		if(token){
			App.token = token;
			App.tokenHeader = function (xhr) {
				xhr.setRequestHeader('Authorization', ("Bearer ".concat(token)));
			}

			localStorage.setItem("token", token);
			this.getUserInfo();
		}

	},

	getUserInfo: function () {
		var self = this;
		$.ajax({
			async: false,
			method: 'GET',
			url: App.baseUrl + '/frontapi/v1/getuserinfo',
			headers: {
				'Authorization': "Bearer ".concat(btoa(App.token))
			},
			beforeSend: function(xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + App.token);
			},
			success: function(response){
				self.updateSessionUser(response.result.value);
			}
		});
	},

	updateSessionUser: function( userData ){
		this.user.set('username', userData.username);
		this.user.set('roles', userData.roles);

		//temp
		if(!App.Session.isInRole(['ROLE_ADMIN'])){
			$('#blogs-button').remove();
			$('#campaigns-button').remove();
			$('#buttons-block').append($('#logout-action-buttons-template').html())
		}
	},

	isInRole: function (roles) {
		var allowed = false;
		var userRoles = this.user.get('roles');

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
