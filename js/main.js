(function($){

	var Task = Backbone.Model.extend({

	});

	var Tasks = Backbone.Collection.extend({
		model: Task,
		url: "tasks-mock.json"
	});

	var tasks = new Tasks();

	var columns = [{
		name: "id",
		label: "ID",
		editable: false,
		// Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
		cell: Backgrid.IntegerCell.extend({
			orderSeparator: ''
		})
	}, {
		name: "enabled",
		label: "Enabled",
		cell: "boolean"
	}, {
		name: "domain_name",
		label: "Domain name",
		editable: false,
		cell: "uri" // Renders the value in an HTML anchor element
	}, {
		name: "created",
		label: "Created Date",
		editable: false,
		cell: "date"
	}, {
		name: "age",
		label: "Age",
		editable: false,
		cell: "integer"
	}, {
		name: "expired",
		label: "Expired Date",
		editable: false,
		cell: "date"
	}, {
		name: "need_posts",
		label: "Need Posts",
		editable: false,
		cell: "integer"
	}, {
		name: "additional_keys_percentage",
		label: "Additional Keys Percentage",
		editable: false,
		cell: "number"
	}, {
		name: "post_period_days",
		label: "Post Period Days",
		editable: false,
		cell: "integer"
	}, {
		name: "next_post",
		label: "Next Post Date",
		editable: false,
		cell: "date"
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

	// Initialize a new Grid instance
	var grid = new Backgrid.Grid({
		columns: columns,
		collection: tasks
	});

	var GridView = Backbone.View.extend({
		el: $('.backgrid-container'),

		initialize: function(){
			_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

			this.render(); // not all views are self-rendering. This one is.
		},

		render: function(){
			$(this.el).append(grid.render().el);
		},

		fetchTasksGrid: function(){
			// Fetch tasks from the url
			tasks.fetch({reset: true});
		},

	});

	var gridView = new GridView();

	gridView.fetchTasksGrid();

	var Modal = Backbone.Modal.extend({
		template: '#modal-template',
		cancelEl: '.bbm-button',
		events: {
			'click #addNewTask': 'newTask',
		},
		newTask: function(options) {
			return Backbone.ajax(_.extend({
				method: 'POST',
				url: 'http://188.166.89.15/frontapi/task/new',
				data: { myData : "John" },
				processData: false,
			}, options));
		},
	});

	$('.open').on('click', function(){
		// Render an instance of your modal
		var modalView = new Modal();
		$('.app').html(modalView.render().el);
	});

})(jQuery);