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
	cell: "uri"
}, {
	name: "postingUserLogin",
	label: "User",
	editable: false,
	cell: "string"
}, {
	name: "postPeriodSeconds",
	label: "Post Period",
	editable: false,
	cell: "integer"
}, {
	name: "clientId",
	label: "Client Id",
	editable: false,
	cell: "string"
}, {
	name: "tags",
	label: "Tags",
	editable: false,
	cell: "string",
	formatter: {
		fromRaw: function (value, model) {
			var keys = Object.values(value);
			return keys.join();
		}
	}
}, {
	name: "lastPostDate",
	label: "Last Post",
	editable: false,
	cell: "datetime"
}];