/*jshint esversion: 6 */

App.Views.CampaignView = App.Views.BaseView.extend({

    stateKey: "campaignView",

    defaultSortField: "id",

    gridColumns: App.Grids.campaignGridColumns,

    Collections: App.Collections.Campaigns,

    onAfterRender: function () {
        const actions = $('#actions');
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
