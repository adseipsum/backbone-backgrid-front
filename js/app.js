/*jshint esversion: 6 */

const App = {
	Views: {},
	Models: {},
	Collections: {},
	Grids: {},
	Modals: {},
	Router: {},
	currentLoop: {},

	baseUrl: 'http://localhost:8000',
//    baseUrl: 'http://188.166.89.15'
};

$(document).ready(function() {
	App.Router.Instance = new App.Router;

	Backbone.history.on("route", function() {
		if (false) {
		    Backbone.history.navigate("/login", true);
        }
	});

	Backbone.history.start();

});
