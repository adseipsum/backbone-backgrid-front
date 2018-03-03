/*jshint esversion: 6 */

App.Modals.CampaignBacklinkedModal = Backbone.Modal.extend({
	template: '#campaign-backlinked-modal-template',
	cancelEl: '.bbm-button',
	events: {
		'click #addNewCampaign': 'newCampaign',
		'change #tagsSelector': 'getAvailableBlogs',
		'click #addNewSubLink' : 'addNewSubLink'
	},
	newCampaign: function() {
		if(!$('#newCampaignForm')[0].checkValidity()) {
			return false;
		}

		var mapSubLinks = [];
		$("#subLinks .sub-link-block").each(function() {
			var subLink = $(this).find(".subLink").val();
			var subLinkKeywords = $(this).find(".subLinkKeywords").val();
			var subAdditionalKeywordsPercentage = $(this).find(".subAdditionalKeywordsPercentage").val();

			if(subLink && subLinkKeywords) {
				mapSubLinks.push({
					'subLink': subLink,
					'subLinkKeywords': subLinkKeywords,
					'subAdditionalKeywordsPercentage': subAdditionalKeywordsPercentage
				});
			}
		});

		$.ajax({
			method: 'POST',
			url: App.baseUrl + '/frontapi/campaign/new',
			data: JSON.stringify({
				'type' : 'backlinked',
				'mainDomain': $('#mainDomain').val(),
				'postMainDomainLinks': $('#postMainDomainLinks').val(),
				'postSubPageLinks': $('#postSubPageLinks').val(),
				'mainKeywords' : $('#mainKeywords').val(),
				'subLinks': mapSubLinks,
				'additionalKeysPercentage': $('#additionalKeysPercentage').val(),
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
			url: App.baseUrl + '/frontapi/blog/list',
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
			url: App.baseUrl + '/frontapi/blog/tags',
			success: function (responce) {
				$.each(responce.result.value, function(key, val){
					$('#tagsSelector').append($('<option>').val(val).html(val));
				});

				$('#tagsSelector').selectpicker();
			}
		});
	},
	addNewSubLink: function(){
		//TODO: template with Mustache
		//TODO: check if domain name same as main
		$('#subLinks').append($('#sub-links-template').html());
		return false;
	},
	execute: function(callback, args, name) {
		$('#selectedBlogs').html('');
		if (callback) callback.apply(this, args);
	}
});
