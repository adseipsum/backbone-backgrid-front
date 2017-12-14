var Task = Backbone.Model.extend({});

var Tasks = Backbone.Collection.extend({
	model: Task,
	url: "tasks-mock.json"
});

var tasks = new Tasks();

var columns = [{
	name: "id", // The key of the model attribute
	label: "ID", // The name to display in the header
	editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
	// Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
	cell: Backgrid.IntegerCell.extend({
		orderSeparator: ''
	})
}, {
	name: "enabled",
	label: "Enabled",
	editable: false,
	cell: "boolean"
}, {
	name: "domain_name",
	label: "Domain name",
	editable: false,
	// The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
	cell: "uri" // Renders the value in an HTML anchor element
	// This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
}, {
	name: "created",
	label: "Created Date",
	editable: false,
	cell: "date"
}, {
	name: "age",
	label: "Age",
	editable: false,
	cell: "integer" // An integer cell is a number cell that displays humanized integers
}, {
	name: "expired",
	label: "Expired Date",
	editable: false,
	cell: "date"
}, {
	name: "need_posts",
	label: "Need Posts",
	editable: false,
	cell: "integer" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
}, {
	name: "additional_keys_percentage",
	label: "Additional Keys Percentage",
	editable: false,
	cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
}, {
	name: "post_period_days",
	label: "Post Period Days",
	editable: false,
	cell: "integer" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
}, {
	name: "next_post",
	label: "Next Post Date",
	editable: false,
	cell: "date"
}, {
	name: "posted",
	label: "Posted",
	editable: false,
	cell: "integer" // Renders the value in an HTML anchor element
}, {
	name: "errors",
	label: "Errors",
	editable: false,
	cell: "integer" // Renders the value in an HTML anchor element
}];

// Initialize a new Grid instance
var grid = new Backgrid.Grid({
	columns: columns,
	collection: tasks
});

// Render the grid and attach the root to your HTML document
$("#tasks-grid").append(grid.render().el);

// Fetch some countries from the url
tasks.fetch({reset: true});