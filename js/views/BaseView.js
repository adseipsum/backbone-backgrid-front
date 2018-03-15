/*jshint esversion: 6 */

App.Views.BaseView = Backbone.View.extend({

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    el: $('.grid'),

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	initialize: function() {
	    const self = this;
        _.bindAll(self, 'render'); // fixes loss of context for 'this' within methods

        self.gridColumns.setPositions().sort();

        self.colManager = new Backgrid.Extension.ColumnManager(self.gridColumns, {
            saveStateKey: self.stateKey,
            saveState: true,
            loadStateOnInit: true
        });
        const storage = this.colManager.getStorage();

        self.colVisibilityControl = new Backgrid.Extension.ColumnManagerVisibilityControl({
            columnManager: this.colManager
        });

        // Fetch campaigns from the url
        const collections = self.collections = new self.Collections();
        let linePerPage = parseInt(storage.getItem(self.stateKey + '-linePerPage'));
        if ($.isNumeric(linePerPage) && linePerPage > 0) {
            collections.state.pageSize = linePerPage;
        } else {
            linePerPage = collections.state.pageSize;
        }

        let filters = storage.getItem(self.stateKey + '-filters');
        try {
            filters = JSON.parse(filters);
        } catch (SyntaxError) {
            filters = [];
        }
        filters = new Backgrid.Extension.AdvancedFilter.FilterCollection(filters);

        let activeFilterId = parseInt(storage.getItem(self.stateKey + '-activeFilterId'));
        if ($.isNumeric(activeFilterId) && activeFilterId >= 0) {
            activeFilterId = filters.models[activeFilterId].cid;
        } else {
            activeFilterId = undefined;
        }

        const advancedFilter = self.advancedFilter = new Backgrid.Extension.AdvancedFilter.Main({
            collection: self.collections,
            columns: self.gridColumns,
            filters: filters,
            activeFilterId: activeFilterId
        });

        let dataFiltered = (activeFilterId !== undefined);
        self.advancedFilter.on("filter:apply", function(filterId, filterModel) {
            $('.content').fadeTo("fast", 0.33);
            dataFiltered = true;
            const currPage = collections.fullCollection.pageableCollection.state.currentPage;
            collections.fetch({reset: true,
                success: function(){
                    const requestFilter = filterModel.exportFilter("mongo");
                    const resultDataIn = collections.fullCollection.models.slice(0);
                    const resultDataOut = sift(requestFilter, resultDataIn);
                    collections.fullCollection.reset(resultDataOut);
                    collections.getPage(currPage);
                    $('.content').fadeTo("fast", 1);
                }
            });
        });

        self.advancedFilter.on("filter:activeFilterChange filter:new filter:remove", function() {
            if (dataFiltered) {
                $('.content').fadeTo("fast", 0.33);
                dataFiltered = false;
                collections.fetch({reset: true,
                    success: function(){
                        $('.content').fadeTo("fast", 1);
                    }
                });
            }
        });

        self.advancedFilter.on("filter:save filter:activeFilterChange filter:new filter:remove", function() {
            const filterStateModel = advancedFilter.filterStateModel;
            let filters = filterStateModel.get('filterCollection');
            let activeFilterId = filterStateModel.get('activeFilterId');
            let find = false;
            for (const i in filters.models) {
                const v = filters.models[i];
                if (v.cid === activeFilterId) {
                    find = true;
                    activeFilterId = i;
                    break;
                }
            }
            filters = JSON.stringify(filters);
            storage.setItem(self.stateKey + '-filters', filters);
            if (!find) {
                activeFilterId = -1;
            }
            storage.setItem(self.stateKey + '-activeFilterId', activeFilterId);
        });

        self.grid = new Backgrid.Grid({
            header: Backgrid.Extension.GroupedHeader,
            columns: self.gridColumns,
            collection: self.collections,
            row: (self.GridRowClass !== undefined ? self.GridRowClass : Backgrid.Row)
        });

        // Set direction on other columns to null https://github.com/cloudflare/backgrid/issues/453#issuecomment-56760096
        self.grid.collection.on('backgrid:sort', function(model) {
            // No ids so identify model with CID
            const cid = model.cid;

            const filtered = model.collection.filter(function(model) {
                return model.cid !== cid;
            });

            _.each(filtered, function(model) {
                model.set('direction', null);
            });
        });

        self.grid.sort(self.defaultSortField, 'ascending');

        self.paginator = new Backgrid.Extension.Paginator({
            collection: self.collections
        });

        self.sizeAbleColumns = new Backgrid.Extension.SizeAbleColumns({
            columns: self.gridColumns,
            collection: self.collections,
            grid: self.grid
        });

        // Add resize handlers
        const sizeHandler = self.sizeHandler = new Backgrid.Extension.SizeAbleColumnsHandlers({
            sizeAbleColumns: self.sizeAbleColumns,
            grid: self.grid,
            saveColumnWidth: true
        });

        // Add orderable handlers
        self.orderHandler = new Backgrid.Extension.OrderableColumns({
            sizeAbleColumns: self.sizeAbleColumns,
            grid: self.grid
        });

        self.colManager.on("toggle-column-visibility", function (column) {
            const grid = $('.grid');
            grid.find('size-able-columns').remove();
            grid.find('size-handler').remove();
            grid.find('order-handler').remove();
            self.addSizer(grid);
        });

        self.gridColumns.on("ordered", function () {
            self.gridColumns.setPositions().sort();
            const main = $('#main');
            main.find('#grid-control').html(thisRef.colVisibilityControl.render().el);
        });

        self.render(); // not all views are self-rendering. This one is.

        const linePerPageControl = $('#grid-line-per-page');
        linePerPageControl.off('change');
        linePerPageControl.val(linePerPage);

        linePerPageControl.on('change', function() {
            const val = linePerPageControl.val();
            const newVal = parseInt(val);
            if (newVal === collections.state.pageSize) {
                return;
            } else if (newVal <= 0 || isNaN(newVal) || ('' + newVal !== val)) {
                linePerPageControl.val(collections.state.pageSize);
                return;
            }

            collections.state.pageSize = newVal;
            storage.setItem(self.stateKey + '-linePerPage', newVal);
            const resultDataIn = collections.fullCollection.models.slice(0);
            collections.fullCollection.reset(resultDataIn);
        });
	},

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @param grid
     * @private
     */
    addSizer: function (grid) {
        const thead = grid.find('thead');

        let l = this.sizeAbleColumns.render().el;
        $(l).addClass("size-able-columns");
        thead.before(l);

        l = this.sizeHandler.render().el;
        $(l).addClass("size-handler");
        thead.before(l);

        l = this.orderHandler.render().el;
        $(l).addClass("order-handler");
        thead.before(l);
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @private
     */
	render: function(){
	    const self = this;

	    const main = $('#main');
        main.html($('#grid').html());

        main.find('#grid-control').html(self.colVisibilityControl.render().el);
        main.find('#grid-filter').html(self.advancedFilter.render().el);

        const content = $('.content');
        content.html(self.grid.render().el);
        self.addSizer(content);

        // Render the paginator
        $(main.find('.footer')).html(self.paginator.render().el);

        self.onAfterRender();
	},

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    fetchGrid: function(){
        const collections = this.collections;
        const currPage = collections.fullCollection.pageableCollection.state.currentPage;

        const activeFilter = this.advancedFilter.filterStateModel.getActiveFilter();
	    if (activeFilter === undefined) {
            collections.fetch({reset: true,
                success: function(){
                    collections.getPage(currPage);
                }
            });
        } else {
            collections.fetch({reset: true,
                success: function(){
                    const requestFilter = activeFilter.exportFilter("mongo");
                    const resultDataIn = collections.fullCollection.models.slice(0);
                    const resultDataOut = sift(requestFilter, resultDataIn);
                    collections.fullCollection.reset(resultDataOut);
                    collections.getPage(currPage);
                }
            });
        }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});