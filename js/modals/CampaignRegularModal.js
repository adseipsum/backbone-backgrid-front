App.Modals.CampaignRegularModal = Backbone.Modal.extend({
	template: '#campaign-regular-modal-template',
	cancelEl: '.bbm-button',
	events: {
		'click #addNewCampaign': 'newCampaign',
		'change #tagsSelector': 'getAvailableBlogs'
	},
	newCampaign: function() {
		if(!$('#newCampaignForm')[0].checkValidity()) {
			return false;
		}

		$.ajax({
			method: 'POST',
			url: 'http://188.166.89.15/frontapi/campaign/new',
			data: JSON.stringify({
				'type' : 'regular',
				'needPosts': $('#needPosts').val(),
				'postPeriodDays': $('#postPeriodDays').val(),
				'selectedBlogs': $('#selectedBlogs input[type=checkbox]:checked').map(function() {return this.value;}).get()
			}),
			success: function () {
				$('.app').empty();
			}
		});
	},
	getAvailableBlogs: function(){
		$('#selectedBlogs').html('');

		$.ajax({
			method: 'GET',
			url: 'http://188.166.89.15/frontapi/blog/list',
			data: {
				'tags': $('#tagsSelector').val()
			},
			success: function (responce) {
				$.each(responce.result.value, function(key, val){
					//TODO: template with Mustache
					$('#selectedBlogs')
						.append($('<li>').text(val.domainName)
						.append($('<input>').attr('type', 'checkbox').attr('value', val.id).attr('checked', true)));
				});
			}
		});
	},
	getBlogTags: function(){
		$.ajax({
			method: 'GET',
			url: 'http://188.166.89.15/frontapi/blog/tags',
			success: function (responce) {
				$.each(responce.result.value, function(key, val){
					$('#tagsSelector').append($('<option>').val(val).html(val));
				});

				$('#tagsSelector').selectpicker();
			}
		});
	},
	execute: function(callback, args, name) {
		$('#selectedBlogs').html('');
		if (callback) callback.apply(this, args);
	}
});