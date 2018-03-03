/*jshint esversion: 6 */

App.Grids.CampaignGridColumns = [{
	name: "id",
	label: "ID",
	editable: false,
	cell: "string"
}, {
	name: "enabled",
	label: "Enabled",
	cell: "boolean"
}, {
	name: "status",
	label: "Status",
	editable: false,
	cell: "string"
}, {
	name: "type",
	label: "Type",
	editable: false,
	cell: "string"
}, {
	name: "mainDomain",
	label: "Main Domain",
	editable: false,
	cell: "string"
}, {
	name: "mainKeywords",
	label: "Main Keywords",
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
	label: "Created Date",
	editable: false,
	cell: "string"
}, {
	name: "needPosts",
	label: "Need Posts",
	editable: false,
	cell: "integer"
}, {
	name: "additionalKeysPercentage",
	label: "AKP",
	editable: false,
	cell: "number"
}, {
	name: "postPeriodDays",
	label: "Period Days",
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
}];
