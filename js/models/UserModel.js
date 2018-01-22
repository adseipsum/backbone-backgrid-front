var UserModel = Backbone.Model.extend({

	initialize: function(){
		_.bindAll(this);
	},

	defaults: {
		id: 0,
		username: '',
		name: '',
		email: ''
	}
});