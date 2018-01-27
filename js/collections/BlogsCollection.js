App.Collections.Blogs = Backbone.Collection.extend({
	model: App.Models.Blog,
	url: "http://188.166.89.15/frontapi/blog/list",

	parse : function(response){
		return response.result.value;
	}
});