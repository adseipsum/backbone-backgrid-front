/*jshint esversion: 6 */

App.Views.TaskView = App.Views.BaseView.extend({

    stateKey: "taskView",

    defaultSortField: "id",
    defaultSortDirection: 'ascending',

    columns: App.Grids.taskGridColumns,

    Collections: App.Collections.Tasks,

    setCampaign: function (campaignId) {
        this.collections.url = this.collections.url + '?campaignId=' + campaignId;
    },

    onAfterRender: function () {

    }

});
