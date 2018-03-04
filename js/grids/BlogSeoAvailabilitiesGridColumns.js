/*jshint esversion: 6 */

App.Grids.BlogSeoAvailabilitiesGridColumns = [{
	name: "locationid",
	label: "Location id",
	editable: false,
	cell: "integer"
},{
    name: "location",
    label: "Location",
    editable: false,
    cell: "string"
}, {
    name: "status",
    label: "Status",
    editable: false,
    cell: Backgrid.HtmlCenterCell
},{
    name: "responce_code",
    label: "Responce code",
    editable: false,
    cell: "integer"
},{
    name: "responce_str",
    label: "Responce string",
    editable: false,
    cell: "string"
},{
    name: "size_responce",
    label: "Size responce",
    editable: false,
    cell: "string"
},{
    name: "start_connect_ms",
    label: "Start connect (ms)",
    editable: false,
    cell: "integer"
},{
    name: "dns_resolve_ms",
    label: "DNS resolve (ms)",
    editable: false,
    cell: "integer"
},{
    name: "first_byte_recive_ms",
    label: "First byte recive (ms)",
    editable: false,
    cell: "integer"
},{
    name: "last_byte_recive_ms",
    label: "Last byte recive (ms)",
    editable: false,
    cell: "integer"
},{
    name: "response_time_ms",
    label: "Response time (ms)",
    editable: false,
    cell: "integer"
}];
