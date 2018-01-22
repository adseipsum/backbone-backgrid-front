App.Views.LoginView = Backbone.View.extend({
	el: $('#main'),

	initialize: function(){
		_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

		this.render(); // not all views are self-rendering. This one is.
	},

	render: function(){
		$(this.el).html($('#login').html());
	}

});