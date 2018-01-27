var App = {
	Views: {},
	Models: {},
	Collections: {},
	Grids: {},
	Modals: {},
	Router: {},
	currentLoop: {}
};

$(document).ready(function() {
	App.Router.Instance = new App.Router;

	Backbone.history.on("route", function() {
		if (false) Backbone.history.navigate("/login", true);
	});

	Backbone.history.start();

});