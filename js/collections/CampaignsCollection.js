/*jshint esversion: 6 */

App.Collections.Campaigns = Backbone.PageableCollection.extend({
    model: App.Models.Campaign,
    url: App.baseUrl + "/frontapi/campaign/list",

    state: {
        pageSize: 18
    },
    mode: "client", // page entirely on the client side

    parse : function(response){
        return response;
    }
});
