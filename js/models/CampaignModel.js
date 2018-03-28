/*jshint esversion: 6 */

App.Models.Campaign = Backbone.Model.extend({

	enableCampaign: function(enabled){

		$.post({
			async: false,
			method: 'GET',
			url: App.baseUrl + '/frontapi/campaign/enable',
			data: {
				'campaignId' : this.get('id'),
				'enabled':  enabled
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', "Bearer ".concat(App.token));
			},
			success: function(response){

			}
		});
	}
});
