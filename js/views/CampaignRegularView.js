/*jshint esversion: 6 */

App.Views.CampaignRegularView = App.Views.BaseView.extend({

    stateKey: "campaignRegularView",

    defaultSortField: "id",
    defaultSortDirection: 'ascending',

    columns: App.Grids.campaignRegularGridColumns,

	Collections: App.Collections.Campaigns,

    setType: function () {
        this.collections.url = this.collections.url + '?type=regular';
    },

    onAfterRender: function () {
        const actions = $('#actions');
        actions.append($('#campaign-action-buttons-template').html());
        actions.addClass('campaign');

        actions.on('click', '.newCampaign', function () {
        	var modalView = new App.Modals.CampaignRegularModal();

            $('.app').show().html(modalView.render().el);
            modalView.getBlogTags();
        });
    }

});
