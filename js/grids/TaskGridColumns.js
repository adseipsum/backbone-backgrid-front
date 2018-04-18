/*jshint esversion: 6 */

App.Grids.taskGridColumns = $.fn.createGridColumns([
	{
		name: "id",
		label: "ID",
		cell: "string",
		formatter: {
			fromRaw: function (object) {
				return object.substring(5);
			}
		},
    }, {
        name: "status",
        label: "Status",
        cell: "string"
    }, {
        name: "created",
        label: "Created",
        cell: "string"
    }, {
        name: "blogId",
        label: "Blog",
        cell: "string"
	}, {
		name: "link",
		label: "Link",
		cell: "html",
        width: '*',
        formatter: {
            fromRaw: function (value) {
                return '<a href="' + value + '">' + value + '</a>';
            }
        }
	}
]);
