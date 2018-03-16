/*jshint esversion: 6 */


App.Modals.BlogModal = Backbone.Modal.extend({
	template: '#blog-modal-template',
	cancelEl: '.bbm-button',
	events: {
		'click #addNewBlog': 'newBlog',
	},
	newBlog: function() {
		if(!$('#newBlogForm')[0].checkValidity()) {
			return false;
		}

		$.ajax({
			method: 'POST',
			url: App.baseUrl + '/frontapi/blog/new',
			data: JSON.stringify({
				'domainName': $('#domainName').val(),
				'realIp': $('#realIp').val(),
				'postingUserLogin': $('#postingUserLogin').val(),
				'postingUserPassword': $('#postingUserPassword').val(),
				'clientId': $('#clientId').val(),
				'clientSecret': $('#clientSecret').val(),
				'postPeriodSeconds': $('#postPeriodSeconds').val(),
				'tags': $('#tags').val()
			}),
			success: function () {
				$('.app').empty();
			}
		});
	}
});
