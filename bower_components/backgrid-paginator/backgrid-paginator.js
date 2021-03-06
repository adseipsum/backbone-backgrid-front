/*
  backgrid-paginator
  http://github.com/wyuenho/backgrid

  add thic commit https://github.com/xSirrioNx/backgrid-paginator/commit/41654ef632ece469cbdc6a1441645a3bf2f0c21e

  Copyright (c) 2013 Jimmy Yuen Ho Wong and contributors
  Licensed under the MIT @license.
*/
(function (root, factory) {

  // CommonJS
  if (typeof exports == "object") {
    module.exports = factory(require("underscore"),
                             require("backbone"),
                             require("backgrid"),
                             require("backbone.paginator"));
  }
  // AMD. Register as an anonymous module.
  else if (typeof define == "function" && define.amd) {
    define(["underscore", "backbone", "backgrid", "backbone.paginator"], factory);
  }
  // Browser
  else {
    factory(root._, root.Backbone, root.Backgrid);
  }

}(this, function (_, Backbone, Backgrid) {

  "use strict";

  /**
     PageHandle is a class that renders the actual page handles and reacts to
     click events for pagination.

     This class acts in two modes - control or discrete page handle modes. If
     one of the `is*` flags is `true`, an instance of this class is under
     control page handle mode. Setting a `pageIndex` to an instance of this
     class under control mode has no effect and the correct page index will
     always be inferred from the `is*` flag. Only one of the `is*` flags should
     be set to `true` at a time. For example, an instance of this class cannot
     simultaneously be a first control and a fast forward control. A `label`
     and a `title` function or a string are required to be passed to the
     constuctor under this mode. If a `title` function is provided, it __MUST__
     accept a hash parameter `data`, which contains a key `label`. Its result
     will be used to render the generated anchor's title attribute.

     If all of the `is*` flags is set to `false`, which is the default, an
     instance of this class will be in discrete page handle mode. An instance
     under this mode requires the `pageIndex` to be passed from the constructor
     as an option and it __MUST__ be a 0-based index of the list of page numbers
     to render. The constuctor will normalize the base to the same base the
     underlying PageableCollection collection instance uses. A `label` is not
     required under this mode, which will default to the equivalent 1-based page
     index calculated from `pageIndex` and the underlying PageableCollection
     instance. A provided `label` will still be honored however. The `title`
     parameter is also not required under this mode, in which case the default
     `title` function will be used. You are encouraged to provide your own
     `title` function however if you wish to localize the title strings.

     If this page handle represents the current page, an `active` class will be
     placed on the root list element.

     If this page handle is at the border of the list of pages, a `disabled`
     class will be placed on the root list element.

     Only page handles that are neither `active` nor `disabled` will respond to
     click events and triggers pagination.

     @class Backgrid.Extension.PageHandle
  */
  var PageHandle = Backgrid.Extension.PageHandle = Backbone.View.extend({

    /** @property */
    tagName: "li",

    /** @property */
    events: {
      "click a": "changePage"
    },

    /**
       @property {string|function(Object.<string, string>): string} title
       The title to use for the `title` attribute of the generated page handle
       anchor elements. It can be a string or a function that takes a `data`
       parameter, which contains a mandatory `label` key which provides the
       label value to be displayed.
    */
    title: function (data) {
      return 'Page ' + data.label;
    },

    /**
       @property {boolean} isFirst Whether this handle represents a first
       control
    */
    isFirst: false,

    /**
       @property {boolean} isBack Whether this handle represents a back
       control
    */
    isBack: false,

    /**
       @property {boolean} isRewind Whether this handle represents a prev interval
       control
    */
    isRewind: false,

    /**
       @property {boolean} isForward Whether this handle represents a forward
       control
    */
    isForward: false,

    /**
       @property {boolean} isFastForward Whether this handle represents a next interval
       control
    */
    isFastForward: false,

    /**
       @property {boolean} isLast Whether this handle represents a fast
       forward control
    */
    isLast: false,

    /**
       Initializer.

       @param {Object} options
       @param {Backbone.Collection} options.collection
       @param {number} pageIndex 0-based index of the page number this handle
       handles. This parameter will be normalized to the base the underlying
       PageableCollection uses.
       @param {string} [options.label] If provided it is used to render the
       anchor text, otherwise the normalized pageIndex will be used
       instead. Required if any of the `is*` flags is set to `true`.
       @param {string} [options.title]
       @param {boolean} [options.isFirst=false]
       @param {boolean} [options.isRewind=false]
       @param {boolean} [options.isBack=false]
       @param {boolean} [options.isForward=false]
       @param {boolean} [options.isFastForward=false]
       @param {boolean} [options.isLast=false]
    */
    initialize: function (options) {
      var collection = this.collection;
      var state = collection.state;
      var currentPage = state.currentPage;
      var firstPage = state.firstPage;
      var lastPage = state.lastPage;
      var intervalSize = options.intervalSize;
      this.rewindPages =  currentPage - Math.max(0, firstPage > (currentPage - intervalSize) ? Math.floor(intervalSize / 2) : (intervalSize));
      this.fastForwardPages =  currentPage + Math.min(lastPage, lastPage < (currentPage + intervalSize) ? Math.ceil(intervalSize / 2) : (intervalSize));

      _.extend(this, _.pick(options,
                            ["isFirst", "isRewind", "isBack", "isForward", "isFastForward", "isLast"]));

      var pageIndex;
      if (this.isFirst) pageIndex = firstPage;
      else if (this.isRewind) pageIndex = this.rewindPages;
      else if (this.isBack) pageIndex = Math.max(firstPage, currentPage - 1);
      else if (this.isForward) pageIndex = Math.min(lastPage, currentPage + 1);
      else if (this.isFastForward) pageIndex = this.fastForwardPages;
      else if (this.isLast) pageIndex = lastPage;
      else {
        pageIndex = +options.pageIndex;
        pageIndex = (firstPage ? pageIndex + 1 : pageIndex);
      }
      this.pageIndex = pageIndex;
      this.intervalSize = intervalSize;

      this.label = (options.label || (firstPage ? pageIndex : pageIndex + 1)) + '';
      this.cssClassName = (options.cssClassName ?  options.cssClassName : '');
      var title = options.title || this.title;
      this.title = _.isFunction(title) ? title({label: this.label}) : title;
    },

    /**
       Renders a clickable anchor element under a list item.
    */
    render: function () {
      this.$el.empty();
      var anchor = document.createElement("a");
      anchor.href = '#';
      if (this.title) anchor.title = this.title;
      anchor.innerHTML = this.label;
      this.el.appendChild(anchor);

      var collection = this.collection;
      var state = collection.state;
      var currentPage = state.currentPage;
      var pageIndex = this.pageIndex;
      if (this.isFirst && currentPage == state.firstPage ||
         this.isBack && !collection.hasPreviousPage() ||
         this.isForward && !collection.hasNextPage() ||
         this.isLast && (currentPage == state.lastPage || state.totalPages < 1) ||
         this.isRewind && (this.rewindPages <= 0) ||
         this.isFastForward && (this.fastForwardPages > state.totalPages)
         ) {
        this.$el.addClass("disabled");
      }
      else if (!(this.isFirst ||
                 this.isRewind ||
                 this.isBack ||
                 this.isForward ||
                 this.isFastForward ||
                 this.isLast) &&
               state.currentPage == pageIndex) {
        this.$el.addClass("active");
      }
      
      this.$el.addClass( this.cssClassName);

      this.delegateEvents();
      return this;
    },

    /**
       jQuery click event handler. Goes to the page this PageHandle instance
       represents. No-op if this page handle is currently active or disabled.
    */
    changePage: function (e) {
      e.preventDefault();
      var $el = this.$el, col = this.collection;
      if (!$el.hasClass("active") && !$el.hasClass("disabled")) {
        if (this.isFirst) col.getFirstPage({reset: true});
        else if (this.isRewind) col.getPage(this.pageIndex, {reset: true});
        else if (this.isBack) col.getPreviousPage({reset: true});
        else if (this.isForward) col.getNextPage({reset: true});
        else if (this.isFastForward) col.getPage(this.pageIndex, {reset: true});
        else if (this.isLast) col.getLastPage({reset: true});
        else col.getPage(this.pageIndex, {reset: true});
      }
      return this;
    }

  });

  /**
     Paginator is a Backgrid extension that renders a series of configurable
     pagination handles. This extension is best used for splitting a large data
     set across multiple pages. If the number of pages is larger then a
     threshold, which is set to 10 by default, the page handles are rendered
     within a sliding interval, plus the first, back, forward and fast forward
     control handles. The individual control handles can be turned off.

     @class Backgrid.Extension.Paginator
  */
  var Paginator = Backgrid.Extension.Paginator = Backbone.View.extend({

    /** @property */
    className: "backgrid-paginator",

    /**
       @property {number} how many pages to display
    */
    intervalSize: 10,

    /**
       @property {Object.<string, Object.<string, string>>} controls You can
       disable specific control handles by setting the keys in question to
       null. The defaults will be merged with your controls object, with your
       changes taking precedent.
    */
    controls: {
      first: {
        label: "《",
        title: "First Page",
        cssClassName: "first"
      },
      rewind: {
        label: "《",
        title: "Previous Interval",
        cssClassName: "rewind"
      },
      back: {
        label: "〈",
        title: "Previous Page",
        cssClassName: "back"
      },
      forward: {
        label: "〉",
        title: "Next Page",
        cssClassName: "forward"
      },
      fastForward: {
        label: "》",
        title: "Next Interval",
        cssClassName: "fast-forward"
      },
      last: {
        label: "》",
        title: "Last Page",
        cssClassName: "last"
      }
    },

    /** @property */
    renderIndexedPageHandles: true,

    /**
      @property renderMultiplePagesOnly. Determines if the paginator
      should show in cases where the collection has more than one page.
      Default is false for backwards compatibility.
    */
    renderMultiplePagesOnly: false,

    /**
       @property {Backgrid.Extension.PageHandle} pageHandle. The PageHandle
       class to use for rendering individual handles
    */
    pageHandle: PageHandle,

    /** @property */
    goBackFirstOnSort: true,

    /**
       Initializer.

       @param {Object} options
       @param {Backbone.Collection} options.collection
       @param {boolean} [options.controls]
       @param {boolean} [options.pageHandle=Backgrid.Extension.PageHandle]
       @param {boolean} [options.goBackFirstOnSort=true]
       @param {boolean} [options.renderMultiplePagesOnly=false]
    */
    initialize: function (options) {
      var self = this;
      self.controls = _.defaults(options.controls || {}, self.controls,
                                 Paginator.prototype.controls);


      _.extend(self, _.pick(options || {}, "intervalSize", "pageHandle",
                            "goBackFirstOnSort",
                            "renderIndexedPageHandles",
                            "renderMultiplePagesOnly"));

      var col = self.collection;
      self.listenTo(col, "add", self.render);
      self.listenTo(col, "remove", self.render);
      self.listenTo(col, "reset", self.render);
      self.listenTo(col, "backgrid:sorted", function () {
        if (self.goBackFirstOnSort && col.state.currentPage !== col.state.firstPage) col.getFirstPage({reset: true});
      });
    },

    getPagesBefore: function(currentPage, intervalSize){
      return Math.floor(intervalSize  / 2);
    },

    getPagesAfter: function(currentPage, intervalSize){
      return Math.ceil(intervalSize  / 2);
    },

    _calculateInterval: function () {
      var collection = this.collection;
      var state = collection.state;

      // convert all indices to 0-based here
      var firstPage = state.firstPage;
      var lastPage = +state.lastPage;
      lastPage = Math.max(0, firstPage ? lastPage - 1 : lastPage);
      var currentPage = Math.max(state.currentPage, state.firstPage);
      currentPage = firstPage ? currentPage - 1 : currentPage;
      var intervalStart = currentPage - this.getPagesBefore(currentPage, this.intervalSize);
      var intervalEnd = currentPage + this.getPagesAfter(currentPage, this.intervalSize);
      if (intervalStart < 0) {
        intervalEnd -= intervalStart;
        intervalStart = 0;
      }
      if (intervalEnd > lastPage + 1) {
        intervalEnd = lastPage + 1;
        if (intervalEnd > this.intervalSize) {
          intervalStart = intervalEnd - this.intervalSize;
        }
      }
      return [intervalStart, intervalEnd];
    },

    /**
       Creates a list of page handle objects for rendering.

       @return {Array.<Object>} an array of page handle objects hashes
    */
    makeHandles: function () {

      var handles = [];
      var collection = this.collection;

      var interval = this._calculateInterval();
      var intervalStart = interval[0], intervalEnd = interval[1];

      if (this.renderIndexedPageHandles) {
        for (var i = intervalStart; i < intervalEnd; i++) {
          handles.push(new this.pageHandle({
            collection: collection,
            pageIndex: i
          }));
        }
      }

      var controls = this.controls,
        intervalSize = this.intervalSize;
      _.each(["back", "rewind", "first", "forward", "fastForward", "last"], function (key) {
        var value = controls[key];
        if (value) {
          var handleCtorOpts = {
            collection: collection,
            title: value.title,
            label: value.label,
            cssClassName: value.cssClassName ? value.cssClassName : '',
            intervalSize: intervalSize
          };
          handleCtorOpts["is" + key.slice(0, 1).toUpperCase() + key.slice(1)] = true;
          var handle = new this.pageHandle(handleCtorOpts);
          if (key == "first" || key == "rewind" || key == "back") handles.unshift(handle);
          else handles.push(handle);
        }
      }, this);

      return handles;
    },

    /**
       Render the paginator handles inside an unordered list.
    */
    render: function () {
      this.$el.empty();

      var totalPages = this.collection.state.totalPages;

      // Don't render if collection is empty
      if(this.renderMultiplePagesOnly && totalPages <= 1) {
        return this;
      }

      if (this.handles) {
        for (var i = 0, l = this.handles.length; i < l; i++) {
          this.handles[i].remove();
        }
      }

      var handles = this.handles = this.makeHandles();

      var ul = document.createElement("ul");
      for (var i = 0; i < handles.length; i++) {
        ul.appendChild(handles[i].render().el);
      }

      this.el.appendChild(ul);

      return this;
    },

    remove: function () {
        if (this.handles) {
            for (var i = 0, l = this.handles.length; i < l; i++) {
                this.handles[i].remove();
            }
        }
        // COMPLETELY UNBIND THE VIEW
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.stopListening();

        // Remove view from DOM
        Backbone.View.prototype.remove.call(this);
    }

  });

}));
