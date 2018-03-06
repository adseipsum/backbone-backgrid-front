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

            ////////////////////////////////////////////////////////////////////////////////////////

            const notCheckStr = "Don't check.";

            let domainExpirationDate = v.domainExpirationDate;
            if (domainExpirationDate !== undefined && domainExpirationDate !== -1) {
                const domainExpirationDateStr = $.fn.unixTimeConverter(domainExpirationDate);
                let color = 'green';
                const currTimeSec = Date.now() / 1000;
                const warningDelta = 7 * 24 * 60 * 60; // 7 days
                if (domainExpirationDate <= currTimeSec) {
                    color = 'red';
                } else if (domainExpirationDate <= currTimeSec + warningDelta) {
                    color = 'orange';
                }
                v.domainExpirationDate = '<span style="color: ' + color + '">' + domainExpirationDateStr + '</span>';
            } else {
                v.domainExpirationDate = '<img src="img/status0.png" title="' + notCheckStr + '" class="status-img" />';
            }

            ////////////////////////////////////////////////////////////////////////////////////////

            let lastPostDate = v.lastPostDate;
            if (lastPostDate !== undefined && lastPostDate !== 0) {
                lastPostDate = $.fn.unixTimeConverter(lastPostDate);
            } else {
                lastPostDate = "";
            }
            v.lastPostDate = lastPostDate;

            ////////////////////////////////////////////////////////////////////////////////////////

            let checkTimestamp = v.checkTimestamp;
            if (checkTimestamp !== undefined && checkTimestamp !== -1) {
                checkTimestamp = 'Last check: ' + $.fn.unixTimeConverter(checkTimestamp);
            } else {
                checkTimestamp = notCheckStr;
            }

            ////////////////////////////////////////////////////////////////////////////////////////

            let seoCheckTimestamp = v.seoCheckTimestamp;
            if (seoCheckTimestamp !== undefined && seoCheckTimestamp !== -1) {
                seoCheckTimestamp = 'Last check: ' + $.fn.unixTimeConverter(seoCheckTimestamp);
            } else {
                seoCheckTimestamp = notCheckStr;
            }

            ////////////////////////////////////////////////////////////////////////////////////////

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

            ////////////////////////////////////////////////////////////////////////////////////////

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

            ////////////////////////////////////////////////////////////////////////////////////////

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

            ////////////////////////////////////////////////////////////////////////////////////////

            const checkSeo = function(v, m) {
                const f = parseFloat(v);
                if (isNaN(f)) {
                    return '<img src="img/status1.png" title="Value unknown.\n' + seoCheckTimestamp + '" class="status-img" />';
                }
                let color = 'green';
                if (m !== undefined && f < m) {
                    color = 'red';
                }
                return '<span style="color: ' + color + '">' + f + '</span>';
            };

            let seo = v.seo;
            if (seo === undefined) {
                const val = '<img src="img/status0.png" title="' + notCheckStr + '" class="status-img" />';
                v.maj_cf = val;
                v.maj_tf = val;
                v.moz_pa = val;
                v.moz_da = val;
                v.moz_rank = val;
                v.alexa_rank = val;
            } else {
                v.maj_cf = checkSeo(seo.maj_cf, 15);
                v.maj_tf = checkSeo(seo.maj_tf, 15);
                v.moz_pa = checkSeo(seo.moz_pa, 15);
                v.moz_da = checkSeo(seo.moz_da, 15);
                v.moz_rank = checkSeo(seo.moz_rank);
                v.alexa_rank = checkSeo(seo.alexa_rank);
            }



        }

		return ret;
	}
});
