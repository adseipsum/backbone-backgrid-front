/*jshint esversion: 6 */

App.Views.CampaignView = App.Views.BaseView.extend({

    stateKey: "campaignView",

    defaultSortField: "id",
    defaultSortDirection: 'ascending',

    columns: App.Grids.campaignGridColumns,

    Collections: App.Collections.Campaigns,

    onAfterRender: function () {
        const actions = $('#actions');
        actions.html($('#campaign-action-buttons-template').html());
        actions.addClass('campaign');

        actions.on('click', '.newCampaign', function () {
        	const type = $(this).data('type');
        	let modalView;
            if(type === 'backlinked'){
                modalView = new App.Modals.CampaignBacklinkedModal();
            }else if(type === 'regular'){
                modalView = new App.Modals.CampaignRegularModal();
            }

            $('.app').html(modalView.render().el);
            modalView.getBlogTags();
        });
    }

});
