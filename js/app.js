var App = {
	Views: {},
	Models: {},
	Collections: {},
	Grids: {},
	Modals: {},
	Router: {}
};

$(document).ready(function() {
	App.Router.Instance = new App.Router;

	Backbone.history.on("route", function() {
		if (false) Backbone.history.navigate("/login", true);
	});

	Backbone.history.start();


	$('.open').on('click', function () {
		var modalView = new Modal();
		// Render an instance of your modal
		$('.app').html(modalView.render().el);
	});

});