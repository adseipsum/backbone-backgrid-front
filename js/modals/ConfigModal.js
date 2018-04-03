/*jshint esversion: 6 */


App.Modals.ConfigModal = Backbone.Modal.extend({
	template: '#config-template',
	cancelEl: '.bbm-button',
	events: {
		'click #saveConfig': 'saveConfig',
	},

	showConfig: function() {
        var data = { additionalKeywords: ''};
        var self = this;

		$.ajax({
			method: 'GET',
			url: App.baseUrl + '/frontapi/config/show',
			headers: {
				'Authorization': "Bearer ".concat(App.token)
			},
			success: function (response) {
                if(response){
                    self.$el.find('#additionalKeywords').val(response.additionalKeywords);
                }
			}
		});

        return this;
	},

    saveConfig: function() {
        var self = this;

        $.ajax({
            method: 'POST',
            url: App.baseUrl + '/frontapi/config/save',
            data: JSON.stringify({
                'additionalKeywords' : $('#additionalKeywords').val()
            }),
            headers: {
                'Authorization': "Bearer ".concat(App.token)
            },
            success: function () {
                $('.app').empty();
            }
        });
    }

});
