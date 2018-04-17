/*jshint esversion: 6 */

const RegularActionCell = Backgrid.Cell.extend({
    events: {
        'click .edit': 'editCampaign',
        'click .showTasks': 'showTasks'
    },

    editCampaign: function(e){
        e.preventDefault();
        const modalView = new App.Modals.CampaignRegularModal();
        $('.app').show().html(modalView.render().el);
        modalView.fillForm(this.model.attributes);
    },

    showTasks: function(e){
        e.preventDefault();
        App.Router.Instance.navigate('tasks/' + this.model.attributes.id, true);
    },

    render: function () {
        this.$el.html('<button class="showTasks btn btn-sm btn-info glyphicon glyphicon-list-alt"></button>&nbsp;<button class="edit btn btn-sm btn-info glyphicon glyphicon-pencil"></button>');
        return this;
    }
});


App.Grids.campaignRegularGridColumns = $.fn.createGridColumns([
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
		name: "created",
		label: "Created",
		cell: "string",
	}, {
		name: "needPosts",
		label: "Posts",
		cell: "integer",
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
		cell: RegularActionCell,
	}
]);
