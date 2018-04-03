/*jshint esversion: 6 */

App.Views.HeaderView = Backbone.View.extend({

	template: _.template($('#header').html()),

	events: {
        'click #config': 'showConfig',
	},

	initialize: function () {
		if(App.token){
			if(!App.Session.isInRole(['ROLE_ADMIN'])){
			}
		}

		// Listen for session logged_in state changes and re-render
		//App.Session.Instance.on("change:logged_in", this.onLoginStatusChange);
	},

	showConfig: function(e){
	    e.preventDefault();
        const modalView = new App.Modals.ConfigModal();
        $('.app').show().html(modalView.render().el);
        modalView.showConfig();
	},

	render: function () {
		var data = {
			token: '',
			user: ''
		};

		if(App.token && App.Session.user){
			data.token = App.token;
			data.user = App.Session.user;
		}

		this.$el.html(this.template(data));
		return this;
	},

});