/*jshint esversion: 6 */

App.Collections.Blogs = Backbone.Collection.extend({
	model: App.Models.Blog,
	url: App.baseUrl + "/frontapi/blog/list",

	parse : function(response){
	    const ret = response.result.value;

	    for (const i in ret) {
	        const v = ret[i];
            const domainName = v.domainName;
            let url = v.url;
            if (url === '') {
                url = 'http://' + v.domainName;
            }
            v.domainName = '<a href="' + url + '">' + domainName + '</a>';


            let googleCheck = -1;
            if (v.isCheckGoogle === undefined) {
                googleCheck = 0;
            } else if (v.isCheckGoogle) {
                googleCheck = 2;
            }
            v.googleCheck = '<img src="img/status' + googleCheck + '.png" title="Google first url: \'' + v.googleFirstUrl + '\'" class="googl-check-img" />';

        }

		return ret;
	}
});
