(function($){

	//Blogs

	var Blog = Backbone.Model.extend({

	});

	var Blogs = Backbone.Collection.extend({
		model: Blog,
		url: "http://188.166.89.15/frontapi/blog/list",

		parse : function(response){
			return response.result.value;
		}
	});

	var blogs = new Blogs();

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

	// Initialize a new Grid instance
	var blogsGrid = new Backgrid.Grid({
		columns: columns,
		collection: blogs
	});

	var blogsGridView = Backbone.View.extend({
		el: $('.blogs'),

		initialize: function(){
			_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

			this.render(); // not all views are self-rendering. This one is.
		},

		render: function(){
			$(this.el).append(blogsGrid.render().el);
		},

		fetchBlogsGrid: function(){
			// Fetch blogs from the url
			blogs.fetch({reset: true});
		},

	});

	var blogsGridViewObject = new blogsGridView();

	setInterval(function() {
		blogsGridViewObject.fetchBlogsGrid();
	}, 4000);

	blogsGridViewObject.fetchBlogsGrid();

	var Modal = Backbone.Modal.extend({
		template: '#modal-template',
		cancelEl: '.bbm-button',
		events: {
			'click #addNewBlog': 'newBlog',
		},
		newBlog: function() {
			if(!$('#newBlogForm')[0].checkValidity()) {
				return false;
			}

			$.ajax({
				method: 'POST',
				url: 'http://188.166.89.15/frontapi/blog/new',
				data: JSON.stringify({
					'domainName': $('#domainName').val(),
					'postingUserLogin': $('#postingUserLogin').val(),
					'postingUserPassword': $('#postingUserPassword').val(),
					'clientId': $('#clientId').val(),
					'clientSecret': $('#clientSecret').val(),
					'postPeriodSeconds': $('#postPeriodSeconds').val(),
					'tags': $('#tags').val()
				}),
				success: function () {
					$('.app').empty();
				}
			});
		},
	});

	$('.open').on('click', function(){
		var modalView = new Modal();
		// Render an instance of your modal
		$('.app').html(modalView.render().el);
	});

	console.log(1516267091 < Math.floor(Date.now() / 1000));

})(jQuery);