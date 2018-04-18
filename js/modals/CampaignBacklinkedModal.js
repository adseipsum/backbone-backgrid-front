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
			url: App.baseUrl + '/frontapi/campaign/upsert',
			data: JSON.stringify({
				'type' : 'backlinked',
				'campaignId': $('#campaignId').val(),
				'mainDomain': $('#mainDomain').val(),
				'postMainDomainLinks': $('#postMainDomainLinks').val(),
				'postSubLinks': $('#postSubLinks').val(),
				'mainKeywords' : $('#mainKeywords').val(),
				'subLinks': mapSubLinks,
                'noFollowPercentage': $('#noFollowPercentage').val(),
				'additionalKeysPercentage': $('#additionalKeysPercentage').val(),
				'postPeriodDays': $('#postPeriodDays').val(),
				'blogTags' : $('#newCampaignForm .filter-option').text(),
				'selectedBlogs': $('#selectedBlogs input[type=checkbox]:checked').map(function() {return this.value;}).get()
			}),
			headers: {
				'Authorization': "Bearer ".concat(App.token)
			},
			success: function () {
				$('.app').empty();
			}
		});

		App.currentView.fetchGrid();
	},

	getAvailableBlogs: function(){
		$('#selectedBlogs').html('');
		var tags = $('#tagsSelector').val();
		if(tags.length) {
			this.fillInBlogs($('#tagsSelector').val());
		}
	},

	getBlogTags: function(selectedTags){
		$.ajax({
			method: 'GET',
			url: App.baseUrl + '/frontapi/blog/tags',
			headers: {
				'Authorization': "Bearer ".concat(App.token)
			},
			success: function (responce) {
				$.each(responce.result.value, function(key, val){
					var option = $('<option>').val(val).html(val);

					if(typeof(selectedTags) != 'undefined' && $.inArray(val, selectedTags) > -1){
						option.attr('selected', true);
					}

					$('#tagsSelector').append(option);
				});

				$('#tagsSelector').selectpicker('refresh');
			}
		});
	},

	addNewSubLink: function(data){
		//TODO: template with Mustache
		//TODO: check if domain name same as main

		var tpl = $.parseHTML($('#sub-links-template').html());

		if(data.subLink || data.subLinkKeywords || data.subAdditionalKeywordsPercentage) {
			$(tpl).find('.subLink').val(data.subLink);
			$(tpl).find('.subLinkKeywords').text(data.subLinkKeywords.join(', '));
			$(tpl).find('.subAdditionalKeywordsPercentage').val(data.subAdditionalKeywordsPercentage);
		}

		$('#subLinks').append(tpl);

		return false;
	},

	fillForm: function(data){
		var current = this;

		$('#campaignId').val(data.id);
		$('#mainDomain').val(data.mainDomain);
		$('#postMainDomainLinks').val(data.postMainDomainLinks);
		$('#postSubLinks').val(data.postSubLinks);
		$('#mainKeywords').val(data.mainKeywords.join(', '));
        $('#noFollowPercentage').val(data.noFollowPercentage);
		$('#additionalKeysPercentage').val(data.additionalKeysPercentage);
		$('#postPeriodDays').val(data.postPeriodDays);
		$.each(data.subLinks, function(key, value){
			current.addNewSubLink(value);
		});

		this.getBlogTags(data.blogTags);
		this.fillInBlogs(data.blogTags, data.blogs);
	},

    fillInBlogs: function(tags, blogs){

        $.ajax({
            method: 'GET',
            url: App.baseUrl + '/frontapi/blog/list',
            data: {
                'tags': tags
            },
            headers: {
                'Authorization': "Bearer ".concat(App.token)
            },
            success: function (response) {
                $.each(response.result.value, function(key, val){

                    if(typeof(blogs) != 'undefined' && !(val.id in blogs)){
                        return true;
                    }

                    //TODO: template with Mustache
                    $('#selectedBlogs')
                        .append($('<li>').text(val.domainName)
                            .append($('<input>').attr('type', 'checkbox').attr('value', val.id).attr('checked', true)));
                });
            }
        });
    },

	execute: function(callback, args, name) {
		$('#selectedBlogs').html('');
		if (callback) callback.apply(this, args);
	},
});
