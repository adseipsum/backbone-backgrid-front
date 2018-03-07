/*jshint esversion: 6 */

(function () {
    'use strict';

App.Grids.BlogGridColumns = new Backgrid.Extension.OrderableColumns.orderableColumnCollection([
    {
        name: "id",
        label: "ID",
        editable: false,
        cell: "string",
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["General"]
    }, {
        name: "enabled",
        label: "Enabled",
        cell: "boolean",
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["General"]
    }, {
        name: "domainName",
        sortValue: "domainNameSort",
        label: "Domain name",
        editable: false,
        cell: "html",
        resizeable: true,
        width: "*",
        orderable: true,
        nesting: ["General"]
    }, {
        name: "googleCheck",
        sortValue: "googleCheckStatus",
        label: "Google",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Check", "Server"]
    }, {
        name: "ping",
        sortValue: "pingStatus",
        label: "Ping",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Check", "Server"]
    }, {
        name: "availability",
        sortValue: "availabilitieStatus",
        label: "Availability",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Check", "Server"]
    },{
        name: "domainExpirationDate",
        sortValue: "domainExpirationDateSort",
        label: "Domain expired",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        nesting: ["Check", "Server"]
    }, {
        name: "moz_da",
        sortValue: "moz_da_sort",
        label: "DA",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Check", "Http", "Moz"]
    }, {
        name: "moz_pa",
        sortValue: "moz_pa_sort",
        label: "PA",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Check", "Http", "Moz"]
    }, {
        name: "moz_rank",
        sortValue: "moz_rank_sort",
        label: "Rank",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Check", "Http", "Moz"]
    }, {
        name: "maj_tf",
        sortValue: "maj_tf_sort",
        label: "TF",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Check", "Http", "Majestic"]
    }, {
        name: "maj_cf",
        sortValue: "maj_cf_sort",
        label: "CF",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Check", "Http", "Majestic"]
    }, {
        name: "alexa_rank",
        sortValue: "alexa_rank_sort",
        label: "Rank",
        editable: false,
        cell: Backgrid.HtmlCenterCell,
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Check", "Http", "Alexa"]
    }, {
        name: "postPeriodSeconds",
        label: "Period",
        editable: false,
        cell: "integer",
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Posting"]
    }, {
        name: "tags",
        label: "Tags",
        editable: false,
        cell: "string",
        formatter: {
            fromRaw: function (value, model) {
                const keys = Object.values(value);
                return keys.join();
            }
        },
        resizeable: true,
        width: 80,
        orderable: true,
        nesting: ["Posting"]
    }, {
        name: "lastPostDate",
        sortValue: "lastPostDateSort",
        label: "Last Post",
        editable: false,
        cell: "string",
        resizeable: true,
        width: 150,
        orderable: true,
        nesting: ["Posting"]
    }
]);

}());
