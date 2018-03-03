/*jshint esversion: 6 */

App.Collections.Campaigns = Backbone.Collection.extend({
	model: App.Models.Campaign,
	url: App.baseUrl + "/frontapi/campaign/list",

	parse : function(response){
		return response.result.value;
	}
});
