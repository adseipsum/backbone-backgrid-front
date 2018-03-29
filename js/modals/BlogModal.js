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
			url: App.baseUrl + '/frontapi/blog/upsert',
			data: JSON.stringify({
                'blogId': $('#blogId').val(),
				'domainName': $('#domainName').val(),
				'realIp': $('#realIp').val(),
				'postingUserLogin': $('#postingUserLogin').val(),
				'postingUserPassword': $('#postingUserPassword').val(),
				'clientId': $('#clientId').val(),
				'clientSecret': $('#clientSecret').val(),
				'postPeriodSeconds': $('#postPeriodSeconds').val(),
				'tags': $('#tags').val()
			}),
			headers: {
				'Authorization': "Bearer ".concat(App.token)
			},
			success: function () {
				$('.app').empty();
			}
		});
	},

    fillForm: function(data){
        var current = this;

        $('#blogId').val(data.id);
        $('#domainName').val($(data.domainName).text());
        $('#realIp').val(data.realIp);
        $('#postPeriodSeconds').val(data.postPeriodSeconds);
        $('#tags').val(data.tags);

        $('#postingUserLogin').attr('required', false);
        $('#postingUserPassword').attr('required', false);
        $('#clientId').attr('required', false);
        $('#clientSecret').attr('required', false);
    },
});
