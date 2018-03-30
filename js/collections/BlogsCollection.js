/*jshint esversion: 6 */

App.Collections.Blogs = Backbone.PageableCollection.extend({
	model: App.Models.Blog,
	url: App.baseUrl + "/frontapi/blog/list",

    state: {
        pageSize: 18
    },
    mode: "client", // page entirely on the client side

	processError: function (error) {
		if(error.responseJSON.error == 'invalid_grant'){
			Backbone.history.navigate("/logout", true);
		}
	},

	parse : function(response){
	    const ret = response.result.value;

	    for (const i in ret) {
	        const v = ret[i];
            let domainName = v.domainName;
            let url = v.url;
            if (url === '') {
                url = 'http://' + domainName;
            }
            domainName = domainName.replace('http://', '').replace('https://', '');

            v.domainNameSort = v.domainName;
            v.domainName = '<a target="_blank" href="' + url + '">' + domainName + '</a>';
            if(v.lastPostId){
	            v.domainName += ' <a href="' + url + '?p=' + v.lastPostId + '" title="Last Post"><span class="glyphicon glyphicon-pushpin"></span></a>';
            }

            if(v.lastBacklinkedPostId){
                v.domainName += ' <a href="' + url + '?p=' + v.lastBacklinkedPostId + '" title="Last Post With Backlink"><span class="glyphicon glyphicon-asterisk"></span></a>';
            }


            ////////////////////////////////////////////////////////////////////////////////////////

            const notCheckStr = "Don't check.";

            {
                let domainExpirationDate = v.domainExpirationDate;
                if (domainExpirationDate !== undefined && domainExpirationDate !== -1) {
                    const domainExpirationDateStr = $.fn.unixTimeConverterAgo(domainExpirationDate);
                    let color = 'green';
                    const currTimeSec = Date.now() / 1000;
                    const warningDelta = 7 * 24 * 60 * 60; // 7 days
                    if (domainExpirationDate <= currTimeSec) {
                        color = 'red';
                    } else if (domainExpirationDate <= currTimeSec + warningDelta) {
                        color = 'orange';
                    }
                    v.domainExpirationDateSort = v.domainExpirationDate;
                    v.domainExpirationDate = '<span title="' + $.fn.unixTimeConverter(domainExpirationDate, true, false) + '" style="color: ' + color + '">' + domainExpirationDateStr + '</span>';
                } else {
                    v.domainExpirationDateSort = -1;
                    v.domainExpirationDate = '<img src="img/status0.png" title="' + notCheckStr + '" class="status-img" />';
                }
            }

            ////////////////////////////////////////////////////////////////////////////////////////

            {
                let lastPostDate = v.lastPostDate;
                if (lastPostDate !== undefined && lastPostDate !== 0) {
                    lastPostDate = '<span title="' + $.fn.unixTimeConverter(lastPostDate) + '">' + $.fn.unixTimeConverterAgo(lastPostDate) + '</span>';
                    v.lastPostDateSort = (Date.now() / 1000) - v.lastPostDate;
                } else {
                    lastPostDate = "";
                    v.lastPostDateSort = -1;
                }
                v.lastPostDate = lastPostDate;
            }

            ////////////////////////////////////////////////////////////////////////////////////////

            let checkTimestamp = v.checkTimestamp;
            if (checkTimestamp !== undefined && checkTimestamp !== -1) {
                checkTimestamp = 'Last check: ' + $.fn.unixTimeConverterEx(checkTimestamp);
            } else {
                checkTimestamp = notCheckStr;
            }

            ////////////////////////////////////////////////////////////////////////////////////////

            let seoCheckTimestamp = v.seoCheckTimestamp;
            if (seoCheckTimestamp !== undefined && seoCheckTimestamp !== -1) {
                seoCheckTimestamp = 'Last check: ' + $.fn.unixTimeConverterEx(seoCheckTimestamp);
            } else {
                seoCheckTimestamp = notCheckStr;
            }

            ////////////////////////////////////////////////////////////////////////////////////////

            let title;

            {
                let urlIndex = v.urlIndex;
                if (urlIndex === undefined) {
                    urlIndex = -1;
                }

                let googleCheckStatus = -1;
                title = "Google position: " + (urlIndex !== -1 ? urlIndex : 'absent') + "\nGoogle first url: '" + v.googleFirstUrl + "'\n" + seoCheckTimestamp;
                if (v.isCheckGoogle === undefined) {
                    googleCheckStatus = 0;
                    title = notCheckStr;
                } else if (urlIndex === 1) {
                    googleCheckStatus = 2;
                } else if (urlIndex <= 10 && urlIndex > 0) {
                    googleCheckStatus = 1;
                }
                v.googleCheckStatus = googleCheckStatus;
                v.googleCheck = '<img src="img/status' + googleCheckStatus + '.png" title="' + title + '" class="status-img" />';
            }

            ////////////////////////////////////////////////////////////////////////////////////////

            {
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
                    v.ping = '<img src="img/status' + pingStatus + '.png" title="' + title + '" class="status-img focus-hand-cursor" onclick="$(\'.app\').show().html(new App.Modals.BlogSeoPingModal(\'' + v.id + '\', \'' + domainName + '\', ' + v.checkTimestamp + ').render().el);" />';
                }
                v.pingStatus = pingStatus;
            }

            ////////////////////////////////////////////////////////////////////////////////////////

            {
                let availabilitieStatus = 2;
                let availabilitiesCountAll = v.availabilitiesCountAll;
                if (availabilitiesCountAll === undefined) {
                    availabilitiesCountAll = 0;
                }
                let availabilitiesCountValid = v.availabilitiesCountValid;
                if (availabilitiesCountValid === undefined) {
                    availabilitiesCountValid = 0;
                }
                if (availabilitiesCountAll === 0) {
                    availabilitieStatus = 0;
                    title = notCheckStr;
                    v.availability = '<img src="img/status' + availabilitieStatus + '.png" title="' + title + '" class="status-img" />';
                } else {
                    title = "Valid availabilities: " + availabilitiesCountValid + " of " + availabilitiesCountAll + "\n" + checkTimestamp + "\nClick for more info...";
                    if (availabilitiesCountAll !== availabilitiesCountValid) {
                        if (availabilitiesCountValid === 0) {
                            availabilitieStatus = -1;
                        } else {
                            availabilitieStatus = 1;
                        }
                    }
                    v.availability = '<img src="img/status' + availabilitieStatus + '.png" title="' + title + '" class="status-img focus-hand-cursor" onclick="$(\'.app\').show().html(new App.Modals.BlogSeoAvailabilityModal(\'' + v.id + '\', \'' + url + '\', ' + v.checkTimestamp + ').render().el);" />';
                }
                v.availabilitieStatus = availabilitieStatus;
            }

            ////////////////////////////////////////////////////////////////////////////////////////

            {
                const checkSeo1 = function (v, options) {
                    if (options === undefined) {
                        options = {};
                    }

                    const f = parseFloat(v);
                    if (isNaN(f)) {
                        return '<img src="img/status1.png" title="Value unknown.\n' + seoCheckTimestamp + '" class="status-img" />';
                    }

                    let color = 'green';
                    if (options.minVal !== undefined && f < options.minVal) {
                        color = 'red';
                    }

                    let str = '' + f;
                    if (options.addEndZero !== undefined && options.addEndZero) {
                        if (parseInt(f) === f) {
                            str += '.0';
                        }
                    }

                    if (options.maxSymbols !== undefined && options.maxSymbols > 0) {
                        for(let i = str.length; i < options.maxSymbols; i++) {
                            str = '&nbsp;' + str;
                        }
                    }

                    if (options.addSpacer !== undefined && options.addSpacer) {
                        let ret = '';
                        let counter = 0;
                        for(let i = str.length - 1; i >= 0; i--) {
                            const c = str[i];
                            if (c === ';') {
                                ret = str.substring(0, i) + ret;
                                break;
                            }
                            counter += 1;
                            if (counter > 3) {
                                ret = "'" + ret;
                                counter = 1;
                            }
                            ret = c + ret;
                        }
                        str = ret;
                    }

                    return '<span title="' + seoCheckTimestamp + '" style="color: ' + color + '">' + str + '</span>';
                };

                const checkSeo2 = function (v) {
                    const f = parseFloat(v);
                    if (isNaN(f)) {
                        return -1;
                    }
                    return f;
                };

                let seo = v.seo;
                if (seo === undefined) {
                    const val = '<img src="img/status0.png" title="' + notCheckStr + '" class="status-img" />';
                    v.maj_cf = val;
                    v.maj_cf_sort = -2;
                    v.maj_tf = val;
                    v.maj_tf_sort = -2;
                    v.moz_pa = val;
                    v.moz_pa_sort = -2;
                    v.moz_da = val;
                    v.moz_da_sort = -2;
                    v.moz_rank = val;
                    v.moz_rank_sort = -2;
                    v.alexa_rank = val;
                    v.alexa_rank_sort = -2;
                } else {
                    v.maj_cf = checkSeo1(seo.maj_cf, {minVal: 15, maxSymbols: 2});
                    v.maj_tf = checkSeo1(seo.maj_tf, {minVal: 15, maxSymbols: 2});
                    v.moz_pa = checkSeo1(seo.moz_pa, {minVal: 15, addEndZero: true});
                    v.moz_da = checkSeo1(seo.moz_da, {minVal: 15, addEndZero: true});
                    v.moz_rank = checkSeo1(seo.moz_rank, {addEndZero: true});
                    v.alexa_rank = checkSeo1(seo.alexa_rank, {maxSymbols: 8, addSpacer: true});

                    v.maj_cf_sort = checkSeo2(seo.maj_cf);
                    v.maj_tf_sort = checkSeo2(seo.maj_tf);
                    v.moz_pa_sort = checkSeo2(seo.moz_pa);
                    v.moz_da_sort = checkSeo2(seo.moz_da);
                    v.moz_rank_sort = checkSeo2(seo.moz_rank);
                    v.alexa_rank_sort = checkSeo2(seo.alexa_rank);
                }
            }

            ////////////////////////////////////////////////////////////////////////////////////////

        }

		return ret;
	}
});
