/*jshint esversion: 6 */

App.Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'index': 'index',
		'login': 'login',
		'logout': 'logout',
		'campaigns': 'campaigns',
		'blogs': 'blogs',
        'tasks/:campaignId': 'tasks'
	},

	initialize: function(){
		if(!this.headerView){
			this.headerView = new App.Views.HeaderView();
		}
	},

	index: function() {
		if(App.token){
            let currentPage = sessionStorage.getItem('general-currentPage');
            if (!["/campaigns", "/blogs"].includes(currentPage)) {
                currentPage = "/campaigns";
            }
			this.navigate(currentPage, true);
		}else{
			this.navigate("/login", true);
		}
	},

	login: function () {
        App.currentView = new App.Views.LoginView();
        App.currentView.render();
	},

	logout: function () {
		App.Session.clearToken();
		App.Session.user = new App.Models.UserModel();
		this.navigate("/login", true);
	},

	campaigns: function(){
        sessionStorage.setItem('general-currentPage', "/campaigns");
        App.currentView = new App.Views.CampaignView();
        App.currentView.fetchGrid();
        this.afterRender();
	},

	blogs: function(){
		if(!App.Session.isInRole(['ROLE_ADMIN'])){
			App.Router.Instance.navigate('campaigns', true);
			return false;
		}
        sessionStorage.setItem('general-currentPage', "/blogs");
        App.currentView = new App.Views.BlogView();
        App.currentView.fetchGrid();
        this.afterRender();
	},

    tasks: function(campaignId){
        if(!App.Session.isInRole(['ROLE_ADMIN'])){
            App.Router.Instance.navigate('campaigns', true);
            return false;
        }
        sessionStorage.setItem('general-currentPage', "/tasks");
        App.currentView = new App.Views.TaskView();
        App.currentView.setCampaign(campaignId);
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

        if(Backbone.history.getFragment().indexOf('login') < 0 && Backbone.history.getFragment().indexOf('login') < 0){
	        if(!App.Session.isInRole(['ROLE_USER'])){
	        	this.navigate('/logout', true);
	        }
        }
	},

    /**
     * @private
     */
    afterRender: function() {
        this.headerView.setElement($(".header-block")).render();

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

