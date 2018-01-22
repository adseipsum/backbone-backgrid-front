App.Collections.Campaigns = Backbone.Collection.extend({
	model: App.Models.Campaign,
	url: "http://188.166.89.15/frontapi/campaign/list",

	parse : function(response){
		return response.result.value;
	}
});