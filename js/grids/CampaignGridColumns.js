/*jshint esversion: 6 */

var ActionCell = Backgrid.Cell.extend({
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
		var modalView = new App.Modals.CampaignBacklinkedModal();
		$('.app').html(modalView.render().el);
		modalView.fillForm(this.model.attributes);
	},
	render: function () {
		this.$el.html('<button class="edit btn btn-sm btn-info glyphicon glyphicon-pencil"></button>&nbsp;<button class="delete btn btn-sm btn-danger glyphicon glyphicon-trash"></button>');
		return this;
	}
});

App.Grids.CampaignGridColumns = [{
	name: "id",
	label: "ID",
	editable: false,
	cell: "string",
	formatter: {
		fromRaw: function (object) {
			return object.substring(9);
		}
	}
}, {
	name: "status",
	label: "Status",
	editable: false,
	cell: "string"
}, {
	name: "mainDomain",
	label: "Domain",
	editable: false,
	cell: "string"
}, {
	name: "mainKeywords",
	label: "Keywords",
	editable: false,
	cell: "string"
}, {
	name: "subLinks",
	label: "Sub Links",
	editable: false,
	cell: "string",
	formatter: {
		fromRaw: function (object) {
			var keys = $.map(object, function(value, key){
				return value.subLink + '(' + value.subLinkKeywords + ')' ;
			});

			return keys.join("\n");
		}
	}
}, {
	name: "created",
	label: "Created",
	editable: false,
	cell: "string"
}, {
	name: "needPosts",
	label: "Posts",
	editable: false,
	cell: "integer"
}, {
	name: "additionalKeysPercentage",
	label: "AKP",
	editable: false,
	cell: "number"
}, {
	name: "postPeriodDays",
	label: "Days",
	editable: false,
	cell: "integer"
}, {
	name: "nextPostTime",
	label: "Next Post",
	editable: false,
	cell: "string"
}, {
	name: "posted",
	label: "Posted",
	editable: false,
	cell: "integer"
}, {
	name: "errors",
	label: "Errors",
	editable: false,
	cell: "integer"
}, {
	name: "",
	label: "Action",
	editable: false,
	cell: ActionCell
}];
