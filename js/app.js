/*jshint esversion: 6 */

const App = {
	Views: {},
	Models: {},
	Collections: {},
	Grids: {},
	Modals: {},
	Router: {},
	currentLoop: {},

//	baseUrl: 'http://localhost:8000'
    baseUrl: 'http://188.166.89.15'
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

$.fn.unixTimeConverter = function(unixTimestamp){
    const a = new Date(unixTimestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    let date = a.getDate();
    if (date < 9) {
        date = '0' + date;
    }
    let hour = a.getHours();
    if (hour < 9) {
        hour = '0' + hour;
	}
    let min = a.getMinutes();
    if (min < 9) {
        min = '0' + min;
    }
    let sec = a.getSeconds();
    if (sec < 9) {
        sec = '0' + sec;
    }
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
};
