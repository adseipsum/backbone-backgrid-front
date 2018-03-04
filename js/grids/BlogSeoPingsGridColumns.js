/*jshint esversion: 6 */

App.Grids.BlogSeoPingsGridColumns = [{
	name: "locationid",
	label: "Location id",
	editable: false,
	cell: "integer"
},{
    name: "location",
    label: "Location",
    editable: false,
    cell: "string"
},{
    name: "ip",
    label: "IP",
    editable: false,
    cell: "string"
},{
    name: "status",
    label: "Status",
    editable: false,
    cell: Backgrid.HtmlCenterCell
},{
    name: "min_rtt_ms",
    label: "Min RTT (ms)",
    editable: false,
    cell: "integer"
},{
    name: "avg_rtt_ms",
    label: "Average RTT (ms)",
    editable: false,
    cell: "integer"
},{
    name: "max_rtt_ms",
    label: "Max RTT (ms)",
    editable: false,
    cell: "integer"
},{
    name: "packet_loss_percent",
    label: "Packet loss (%)",
    editable: false,
    cell: "percent"
}];
