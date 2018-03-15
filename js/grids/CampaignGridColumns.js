/*jshint esversion: 6 */

const ActionCell = Backgrid.Cell.extend({
	events: {
		'click .delete': 'deleteCampaign',
		'click .edit': 'editCampaign'
	},
	deleteCampaign: function(e) {
		e.preventDefault();
		if(confirm("Are you sure you want to delete this campaign? \n This action can't be undone!")){
			$.ajax({
				method: 'POST',
				url: App.baseUrl + '/frontapi/campaign/remove',
				data: JSON.stringify({
					'campaignId': this.model.attributes.id
				})
			});
			App.currentView.fetchGrid();
		}
	},
	editCampaign: function(e){
		e.preventDefault();
		const modalView = new App.Modals.CampaignBacklinkedModal();
		$('.app').html(modalView.render().el);
		modalView.fillForm(this.model.attributes);
	},
	render: function () {
		this.$el.html('<button class="edit btn btn-sm btn-info glyphicon glyphicon-pencil"></button>&nbsp;<button class="delete btn btn-sm btn-danger glyphicon glyphicon-trash"></button>');
		return this;
	}
});

App.Grids.campaignGridColumns = new Backgrid.Extension.OrderableColumns.orderableColumnCollection([
	{
		name: "id",
		label: "ID",
		editable: false,
		cell: "string",
		formatter: {
			fromRaw: function (object) {
				return object.substring(9);
			}
		},
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "status",
		label: "Status",
		editable: false,
		cell: "string",
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "mainDomain",
		label: "Domain",
		editable: false,
		cell: "string",
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "mainKeywords",
		label: "Keywords",
		editable: false,
		cell: "string",
        resizeable: true,
        width: "*",
        orderable: true,
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
		},
        resizeable: true,
		width: "*",
        orderable: true,
	}, {
		name: "created",
		label: "Created",
		editable: false,
		cell: "string",
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "needPosts",
		label: "Posts",
		editable: false,
		cell: "integer",
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "additionalKeysPercentage",
		label: "AKP",
		editable: false,
		cell: "number",
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "postPeriodDays",
		label: "Days",
		editable: false,
		cell: "integer",
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "nextPostTime",
		label: "Next Post",
		editable: false,
		cell: "string",
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "posted",
		label: "Posted",
		editable: false,
		cell: "integer",
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "errors",
		label: "Errors",
		editable: false,
		cell: "integer",
        resizeable: true,
        width: 80,
        orderable: true,
	}, {
		name: "",
		label: "Action",
		editable: false,
		cell: ActionCell,
        resizeable: true,
        width: 80,
        orderable: true,
	}
]);
