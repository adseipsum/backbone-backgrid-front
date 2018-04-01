/*jshint esversion: 6 */

App.Collections.BlogSeoPings = Backbone.Collection.extend({
    model: App.Models.BlogSeoPing,
    url: App.baseUrl + "/frontapi/blog/seo/pings",

    constructor : function (blogId, isProxy) {
        Backbone.Collection.apply(this);
        if (isProxy) {
            this.url += '_proxy';
        }
        this.url += '/' + blogId;
    },

	processError: function (error) {
		if(error.responseJSON.error === 'invalid_grant'){
			Backbone.history.navigate("/logout", true);
		}
	},

    parse : function(response){
        const ret = response.result.value;

        for (const i in ret) {
            const v = ret[i];

            let pingStatus = v.status;
            if (pingStatus === 0) {
                pingStatus = -1;
            } else {
                pingStatus = 2;
            }
            v.status = '<img src="img/status' + pingStatus + '.png" class="status-img" />';

        }

        return ret;
    }
});
