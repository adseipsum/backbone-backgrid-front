/*jshint esversion: 6 */

App.Collections.Tasks = Backbone.PageableCollection.extend({
    model: App.Models.Task,
    url: App.baseUrl + "/frontapi/campaign/tasks",

    state: {
        pageSize: 18
    },
    mode: "client", // page entirely on the client side

	processError: function (error) {
		if(error.responseJSON.error == 'invalid_grant'){
			Backbone.history.navigate("/logout", true);
        }
	},

    parse : function(response){
        return response;
    }
});
