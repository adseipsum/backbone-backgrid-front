/*jshint esversion: 6 */

App.Collections.BlogSeoAvailabilities = Backbone.Collection.extend({
    model: App.Models.BlogSeoPing,
    url: App.baseUrl + "/frontapi/blog/seo/availabilities",

    constructor : function (blogId) {
        Backbone.Collection.apply(this);
        this.url += '/' + blogId;
    },

	processError: function (error) {
		if(error.responseJSON.error == 'invalid_grant'){
			Backbone.history.navigate("/logout", true);
		}
	},

    parse : function(response){
        const ret = response.result.value;

        for (const i in ret) {
            const v = ret[i];

            let availabilityStatus = v.status;
            if (availabilityStatus === 0) {
                availabilityStatus = -1;
            } else {
                availabilityStatus = 2;
            }
            v.status = '<img src="img/status' + availabilityStatus + '.png" class="status-img" />';

        }

        return ret;
    }
});
