/*jshint esversion: 6 */

App.Collections.Blogs = Backbone.Collection.extend({
	model: App.Models.Blog,
	url: App.baseUrl + "/frontapi/blog/list",

	parse : function(response){
	    const ret = response.result.value;

	    for (const i in ret) {
	        const v = ret[i];
            const domainName = v.domainName;
            let url = v.url;
            if (url === '') {
                url = 'http://' + v.domainName;
            }
            v.domainName = '<a href="' + url + '">' + domainName + '</a>';

            const notCheckStr = "Don't check.";

            let checkTimestamp = v.checkTimestamp;
            if (checkTimestamp !== undefined && checkTimestamp !== -1) {
                checkTimestamp = 'Last check: ' + $.fn.unixTimeConverter(checkTimestamp);
            } else {
                checkTimestamp = notCheckStr;
            }


            let title;

            let googleCheck = -1;
            title = "Google first url: '" + v.googleFirstUrl + "'\n" + checkTimestamp;
            if (v.isCheckGoogle === undefined) {
                googleCheck = 0;
                title = notCheckStr;
            } else if (v.isCheckGoogle) {
                googleCheck = 2;
            }
            v.googleCheck = '<img src="img/status' + googleCheck + '.png" title="' + title +'" class="status-img" />';



            let pingStatus = 2;
            let pingsCountAll = v.pingsCountAll;
            if (pingsCountAll === undefined) {
                pingsCountAll = 0;
            }
            let pingsCountValid = v.pingsCountValid;
            if (pingsCountValid === undefined) {
                pingsCountValid = 0;
            }
            if (pingsCountAll === 0) {
                pingStatus = 0;
                title = notCheckStr;
                v.ping = '<img src="img/status' + pingStatus + '.png" title="' + title + '" class="status-img" />';
            } else {
                title = "Valid pings: " + pingsCountValid + " of " + pingsCountAll + "\n" + checkTimestamp + "\nClick for more info...";
                if (pingsCountAll !== pingsCountValid) {
                    if (pingsCountValid === 0) {
                        pingStatus = -1;
                    } else {
                        pingStatus = 1;
                    }
                }
                v.ping = '<img src="img/status' + pingStatus + '.png" title="' + title + '" class="status-img focus-hand-cursor" onclick="$(\'.app\').html(new App.Modals.BlogSeoPingModal(\'' + v.id + '\', \'' + domainName + '\').render().el);" />';
            }


            let availabilitiestatus = 2;
            let availabilitiesCountAll = v.availabilitiesCountAll;
            if (availabilitiesCountAll === undefined) {
                availabilitiesCountAll = 0;
            }
            let availabilitiesCountValid = v.availabilitiesCountValid;
            if (availabilitiesCountValid === undefined) {
                availabilitiesCountValid = 0;
            }
            if (availabilitiesCountAll === 0) {
                availabilitiestatus = 0;
                title = notCheckStr;
                v.availability = '<img src="img/status' + availabilitiestatus + '.png" title="' + title + '" class="status-img" />';
            } else {
                title = "Valid availabilities: " + availabilitiesCountValid + " of " + availabilitiesCountAll + "\n" + checkTimestamp + "\nClick for more info...";
                if (availabilitiesCountAll !== availabilitiesCountValid) {
                    if (availabilitiesCountValid === 0) {
                        availabilitiestatus = -1;
                    } else {
                        availabilitiestatus = 1;
                    }
                }
                v.availability = '<img src="img/status' + availabilitiestatus + '.png" title="' + title + '" class="status-img focus-hand-cursor" onclick="$(\'.app\').html(new App.Modals.BlogSeoAvailabilityModal(\'' + v.id + '\', \'' + url + '\').render().el);" />';
            }



        }

		return ret;
	}
});
