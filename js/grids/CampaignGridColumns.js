/*jshint esversion: 6 */


const KeywordsCell = Backgrid.HtmlCell.extend({
    events: {
        'click .show-keywords': 'showKeywords'
    },

    showKeywords: function (e) {
        e.preventDefault();
        var modalView = new App.Modals.BlankModal();
        $('.app').show().html(modalView.render().el);
        modalView.populate($(e.target).data('keywords'));
    }
});

const ActionCell = Backgrid.Cell.extend({
	events: {
		'click .delete': 'deleteCampaign',
		'click .edit': 'editCampaign'
	},

	deleteCampaign: function(e) {
		e.preventDefault();
		if(confirm("Are you sure you want to delete this campaign? \n This action can't be undone!")){
			$.ajax({
				async: false,
				method: 'POST',
				url: App.baseUrl + '/frontapi/campaign/remove',
				data: JSON.stringify({
					'campaignId': this.model.attributes.id
				}),
				headers: {
					'Authorization': "Bearer ".concat(App.token)
				}
			});
			App.currentView.fetchGrid();
		}
	},

	editCampaign: function(e){
		e.preventDefault();
		const modalView = new App.Modals.CampaignBacklinkedModal();
		$('.app').show().html(modalView.render().el);
		modalView.fillForm(this.model.attributes);
	},

	render: function () {
		this.$el.html('<button class="edit btn btn-sm btn-info glyphicon glyphicon-pencil"></button>&nbsp;<button class="delete btn btn-sm btn-danger glyphicon glyphicon-trash"></button>');
		return this;
	}
});

App.Grids.campaignGridColumns = $.fn.createGridColumns([
	{
		name: "id",
		label: "ID",
		cell: "string",
		formatter: {
			fromRaw: function (object) {
				return object.substring(9);
			}
		},
	}, {
		name: "enabled",
		label: "Enabled",
		editable: true,
		cell: Backgrid.BooleanCell.extend({
			events: {
				'change input': function (e) {
					this.model.enableCampaign(e.target.checked);
				}
			}
		})
	}, {
		name: "status",
		label: "Status",
		cell: "string",
	}, {
		name: "mainDomain",
		label: "Domain",
		cell: "string",
    }, {
        name: "mainKeywords",
        label: "Keywords",
        cell: KeywordsCell,
        width: "20",
        formatter: {
            fromRaw: function (value, model) {
                return '<a href=""><span class="glyphicon glyphicon-eye-open show-keywords" data-keywords="' + value + '"></span></a>';
            }
        },
	}, {
		name: "subLinks",
		label: "Sub Links",
		editable: false,
		cell: "html",
		formatter: {
			fromRaw: function (object) {
				const keys = $.map(object, function(value, key){
					return '<a href="' + value.subLink  + '" alt="' + value.subLink  + '">' + 'Sub Link ' + ++key + '</a>' + ' (' + value.subLinkKeywords + ') </br>' ;
				});

				return keys.join("\n");
			}
		}
	}, {
		name: "created",
		label: "Created",
		cell: "string",
	}, {
		name: "needPosts",
		label: "Posts",
		cell: "integer",
	}, {
		name: "additionalKeysPercentage",
		label: "AKP",
		cell: "number",
	}, {
		name: "postPeriodDays",
		label: "Days",
		cell: "integer",
	}, {
		name: "nextPostTime",
		label: "Next Post",
		cell: "string",
	}, {
		name: "posted",
		label: "Posted",
		cell: "integer",
	}, {
		name: "errors",
		label: "Errors",
		cell: "integer",
	}, {
		name: "",
		label: "Action",
		cell: ActionCell,
	}
]);
