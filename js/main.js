(function($){

	var Task = Backbone.Model.extend({

	});

	var Tasks = Backbone.Collection.extend({
		model: Task,
		url: "http://188.166.89.15/frontapi/task/list",

		parse : function(response){
			return response.result.value;
		}
	});

	var tasks = new Tasks();

	var columns = [{
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
		newTask: function() {
			if(!$('#newTaskForm')[0].checkValidity()) {
				return false;
			}

			$.ajax({
				method: 'POST',
				url: 'http://188.166.89.15/frontapi/task/new',
				data: JSON.stringify({
					'domainName': $('#domain_name').val(),
					'needPosts': $('#need_posts').val(),
					'additionalKeysPercentage': $('#additional_keys_percentage').val(),
					'postPeriodDays': $('#post_period_days').val(),
				}),
				success: function () {
					$('.app').empty();
					gridView.fetchTasksGrid();
				}
			});
		},
	});

	$('.open').on('click', function(){
		var modalView = new Modal();
		// Render an instance of your modal
		$('.app').html(modalView.render().el);
	});

})(jQuery);