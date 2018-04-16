/*jshint esversion: 6 */

App.Grids.taskGridColumns = $.fn.createGridColumns([
	{
		name: "id",
		label: "ID",
		cell: "string",
		formatter: {
			fromRaw: function (object) {
				return object.substring(9);
			}
		},
	}, {
		name: "link",
		label: "Link",
		cell: "string",
	}, {
		name: "blogId",
		label: "Blog",
		cell: "string"
	}
]);
