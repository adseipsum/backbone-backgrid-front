/*jshint esversion: 6 */

(function () {
    'use strict';

App.Grids.BlogGridColumns = [{
	name: "id",
	label: "ID",
	editable: false,
	cell: "string"
}, {
	name: "enabled",
	label: "Enabled",
	cell: "boolean"
}, {
    name: "domainName",
    label: "Domain name",
    editable: false,
    cell: "html"
}, {
    name: "googleCheck",
    label: "Google",
    editable: false,
    cell: Backgrid.HtmlCenterCell
}, {
    name: "ping",
    label: "Ping",
    editable: false,
    cell: Backgrid.HtmlCenterCell
}, {
    name: "availability",
    label: "Availability",
    editable: false,
    cell: Backgrid.HtmlCenterCell
}, {
	name: "postPeriodSeconds",
	label: "Post Period",
	editable: false,
	cell: "integer"
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
	}
}, {
	name: "lastPostDate",
	label: "Last Post",
	editable: false,
	cell: "string"
}];

}());
