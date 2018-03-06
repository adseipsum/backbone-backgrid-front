# backgrid-html-cell
A simple Backgrid.Cell extension to render any HTML in a cell

## Basic usage:

Configure the formatter

```javascript
[
  {
    name: 'name of model attribute',
    label: 'column header label',
    editable: false,
    formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
      fromRaw: function (rawValue) {
        return '<pre>' + rawValue + '</pre>';
      }
    }),
    cell: 'html'
  },
  ...
]
```

## Usage with Underscore template:

Create an underscore template for your cell

```html
<script type="text/template" id="my_template">
  <pre><%= get('attribute name') %></pre>
</script>

```

Configure the formatter

```javascript
[
  {
    name: 'name of model attribute',
    label: 'column header label',
    editable: false,
    formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
      fromRaw: function (rawValue, model) {
        return _.template($('#my_template').html())(model);
      }
    }),
    cell: 'html'
  },
  ...
]
```
