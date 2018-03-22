/*jshint esversion: 6 */

App.Models.UserModel = Backbone.Model.extend({

	initialize: function(){
		//_.bindAll(this);
	},

	defaults: {
		id: 0,
		username: '',
		roles: {},
		name: '',
		email: ''
	},

	url: function(){
		return App.baseUrl + '/frontapi/v1/getuserinfo';
	}

});
