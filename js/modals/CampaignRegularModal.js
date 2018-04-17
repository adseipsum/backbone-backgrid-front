/*jshint esversion: 6 */

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
            url: App.baseUrl + '/frontapi/campaign/upsert',
            data: JSON.stringify({
                'type' : 'regular',
                'campaignId': $('#campaignId').val(),
                'needPosts': $('#needPosts').val(),
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

    fillForm: function(data){
        var current = this;

        $('#campaignId').val(data.id);
        $('#needPosts').val(data.needPosts);
        $('#postPeriodDays').val(data.postPeriodDays);

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
	}
});
