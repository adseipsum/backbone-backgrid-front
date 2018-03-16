/*jshint esversion: 6 */

(function () {
    'use strict';

App.Grids.blogGridColumns = $.fn.createGridColumns([
    {
        name: "id",
        label: "ID",
        cell: "string",
        nesting: ["General"],
    }, {
        name: "enabled",
        label: "Enabled",
        cell: "boolean",
        nesting: ["General"],
    }, {
        name: "domainName",
        sortValue: "domainNameSort",
        label: "Domain name",
        cell: "html",
        width: "*",
        nesting: ["General"],
        filterType: "string"
	}, {
		name: "realIp",
		sortValue: "realIpSort",
		label: "Real Ip",
		cell: "html",
		width: "*",
		nesting: ["General"],
		filterType: "string"
    }, {
        name: "ping",
        sortValue: "pingStatus",
        label: "Ping",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Server"],
        filterType: "number"
    }, {
        name: "availability",
        sortValue: "availabilitieStatus",
        label: "Availability",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Server"],
        filterType: "number"
    },{
        name: "domainExpirationDate",
        sortValue: "domainExpirationDateSort",
        label: "Domain expired",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Server"],
        filterType: "number"
    }, {
        name: "googleCheck",
        sortValue: "googleCheckStatus",
        label: "Google",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Seo"],
        filterType: "number"
    }, {
        name: "moz_da",
        sortValue: "moz_da_sort",
        label: "DA",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Seo", "Moz"],
        filterType: "number"
    }, {
        name: "moz_pa",
        sortValue: "moz_pa_sort",
        label: "PA",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Seo", "Moz"],
        filterType: "number"
    }, {
        name: "moz_rank",
        sortValue: "moz_rank_sort",
        label: "Rank",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Seo", "Moz"],
        filterType: "number"
    }, {
        name: "maj_tf",
        sortValue: "maj_tf_sort",
        label: "TF",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Seo", "Majestic"],
        filterType: "number"
    }, {
        name: "maj_cf",
        sortValue: "maj_cf_sort",
        label: "CF",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Seo", "Majestic"],
        filterType: "number"
    }, {
        name: "alexa_rank",
        sortValue: "alexa_rank_sort",
        label: "Rank",
        cell: Backgrid.HtmlCenterCell,
        nesting: ["Check", "Seo", "Alexa"],
        filterType: "number"
    }, {
        name: "postPeriodSeconds",
        label: "Period",
        cell: "integer",
        nesting: ["Posting"],
        filterType: "number"
    }, {
        name: "tags",
        label: "Tags",
        cell: "string",
        formatter: {
            fromRaw: function (value, model) {
                const keys = Object.values(value);
                return keys.join();
            }
        },
        nesting: ["Posting"],
    }, {
        name: "lastPostDate",
        sortValue: "lastPostDateSort",
        label: "Last Post",
        cell: Backgrid.HtmlCenterCell,
        width: 150,
        nesting: ["Posting"],
        filterType: "number"
    }
]);

}());
