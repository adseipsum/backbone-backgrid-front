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
				'postSubLinks': $('#postSubLinks').val(),
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
	addNewSubLink: function(data){
		//TODO: template with Mustache
		//TODO: check if domain name same as main

		var tpl = _.template($('#sub-links-template').html(), JSON.stringify({
			"subLink": data.subLink,
			"subLinkKeywords": data.subLinkKeywords,
			"subAdditionalKeywordsPercentage": data.subAdditionalKeywordsPercentage
		}));

		$('#subLinks').append(tpl);
	},
	fillForm: function(data){
		var current = this;
		console.log(data.subLinks);
		$('#mainDomain').val(data.mainDomain);
		$('#postMainDomainLinks').val(data.postMainDomainLinks);
		$('#postSubLinks').val(data.postSubLinks);
		$('#mainKeywords').val(data.mainKeywords);
		$('#additionalKeysPercentage').val(data.additionalKeysPercentage);
		$('#postPeriodDays').val(data.postPeriodDays);
		$.each(data.subLinks, function(key, value){
			//current.addNewSubLink(value);
		});
	},
	execute: function(callback, args, name) {
		$('#selectedBlogs').html('');
		if (callback) callback.apply(this, args);
	}
});
