App.Modals.Modal = Backbone.Modal.extend({
	template: '#modal-template',
	cancelEl: '.bbm-button',
	events: {
		'click #addNewCampaign': 'newCampaign',
	},
	newCampaign: function() {
		if(!$('#newCampaignForm')[0].checkValidity()) {
			return false;
		}

		$.ajax({
			method: 'POST',
			url: 'http://188.166.89.15/frontapi/campaign/new',
			data: JSON.stringify({
				'domainName': $('#domain_name').val(),
				'needPosts': $('#need_posts').val(),
				'additionalKeysPercentage': $('#additional_keys_percentage').val(),
				'postPeriodDays': $('#post_period_days').val(),
			}),
			success: function () {
				$('.app').empty();
			}
		});
	},
});