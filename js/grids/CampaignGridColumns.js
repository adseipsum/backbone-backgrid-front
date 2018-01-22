App.Grids.CampaignsGridColumns = [{
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
	name: "domainName",
	label: "Domain name",
	editable: false,
	cell: "uri" // Renders the value in an HTML anchor element
}, {
	name: "created",
	label: "Created Date",
	editable: false,
	cell: "date"
}, {
	name: "needPosts",
	label: "Need Posts",
	editable: false,
	cell: "integer"
}, {
	name: "additionalKeysPercentage",
	label: "Additional Keys Percentage",
	editable: false,
	cell: "number"
}, {
	name: "postPeriodDays",
	label: "Post Period Days",
	editable: false,
	cell: "integer"
}, {
	name: "nextPostTime",
	label: "Next Post Time",
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