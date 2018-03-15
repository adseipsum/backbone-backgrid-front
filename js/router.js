/*jshint esversion: 6 */



App.Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'login': 'login',
		'campaigns': 'campaigns',
		'blogs': 'blogs'
	},

	index: function() {
		this.navigate("campaigns", {trigger: true});
	},

	login: function () {
        App.currentView = new App.Views.LoginView();
        App.currentView.render();
        this.afterRender();
	},

	campaigns: function(){
        App.currentView = new App.Views.CampaignView();
        App.currentView.fetchGrid();
        this.afterRender();
	},

	blogs: function(){
        App.currentView = new App.Views.BlogView();
        App.currentView.fetchGrid();
        this.afterRender();
	},

	execute: function(callback, args, name) {
		if(App.currentLoop) {
			clearInterval(App.currentLoop);
		}
		if (callback) {
		    callback.apply(this, args);
        }
	},

    /**
     * @private
     */
    afterRender: function() {
        {
            const isFrameControl = $('#use-frame');
            let isFrame = sessionStorage.getItem('general-isFrame');
            isFrame = (isFrame === "true");
            if (isFrameControl.is(":checked") !== isFrame) {
                isFrameControl[0].checked = isFrame;
            }
            $.fn.changeFrame();
        }

        {
            const autoUpdateControl = $('#auto-update-enable');
            let isAutoUpdate = sessionStorage.getItem('general-isAutoUpdate');
            isAutoUpdate = (isAutoUpdate === "true");
            if (autoUpdateControl.is(":checked") !== isAutoUpdate) {
                autoUpdateControl[0].checked = isAutoUpdate;
            }
            $.fn.changeAutoUpdate();
        }
    }
});

$.fn.changeAutoUpdate = function() {
    const isAutoUpdate = $('#auto-update-enable').is(":checked");
    sessionStorage.setItem('general-isAutoUpdate', isAutoUpdate);
    if (isAutoUpdate) {
        App.currentLoop = setInterval(function () {
            App.currentView.fetchGrid();
        }, 4000);
    } else {
        clearInterval(App.currentLoop);
        App.currentLoop = null;
    }
};

$.fn.changeFrame = function() {
    const fraim = $('html');
    const className = "frame-enable";

    const isFrame = $('#use-frame').is(":checked");
    sessionStorage.setItem('general-isFrame', isFrame);

    if (isFrame) {
        fraim.addClass(className);
    } else {
        fraim.removeClass(className);
    }
};

