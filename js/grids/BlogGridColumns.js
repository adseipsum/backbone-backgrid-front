/*jshint esversion: 6 */

(function () {
    'use strict';

App.Grids.BlogGridColumns = new Backgrid.Columns([{
	name: "id",
	label: "ID",
	editable: false,
	cell: "string",
    comparator: $.fn.naturalComparator,
    resizeable: true,
    width: 80,
}, {
	name: "enabled",
	label: "Enabled",
	cell: "boolean",
    resizeable: true,
    width: 80,
}, {
    name: "domainName",
    label: "Domain name",
    editable: false,
    cell: "html",
    resizeable: true,
    width: "*",
}, {
    name: "googleCheck",
    label: "Google",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
}, {
    name: "ping",
    label: "Ping",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
}, {
    name: "availability",
    label: "Availability",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
},{
    name: "domainExpirationDate",
    label: "Domain expiration",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
}, {
    name: "maj_cf",
    label: "maj_cf",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
}, {
    name: "maj_tf",
    label: "maj_tf",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
}, {
    name: "moz_pa",
    label: "moz_pa",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
}, {
    name: "moz_da",
    label: "moz_da",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
}, {
    name: "moz_rank",
    label: "moz_rank",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
}, {
    name: "alexa_rank",
    label: "alexa_rank",
    editable: false,
    cell: Backgrid.HtmlCenterCell,
    resizeable: true,
    width: 80,
}, {
	name: "postPeriodSeconds",
	label: "Post Period",
	editable: false,
	cell: "integer",
    resizeable: true,
    width: 80,
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
}, {
	name: "lastPostDate",
	label: "Last Post",
	editable: false,
	cell: "string",
    resizeable: true,
    width: 150,
},
//    Backgrid.Extension.SizeAbleColumns.spacerColumnDefinition
]);

}());
