/*jshint esversion: 6 */

const App = {
	Views: {},
	Models: {},
	Collections: {},
	Grids: {},
	Modals: {},
	Router: {},
    Session: {},
	currentLoop: {},
    token: '',
	tokenHeader: '',
    baseUrl: 'http://188.166.89.15'
};

$(document).ready(function() {
	App.Router.Instance = new App.Router;
	App.Session = new App.Models.Session;

	if(!App.token){
		App.token = localStorage.getItem("token");
    }

	Backbone.history.start();

	// Check the auth status upon initialization,
	// before rendering anything or matching routes
	App.Session.checkAuth({
		// Start the backbone routing once we have captured a user's auth status
		complete: function(){
			Backbone.history.navigate("/campaigns", true);
		}
	});

	// Backbone.history.on("route", function() {
	// 	if (true) {
	// 	    Backbone.history.navigate("/login", true);
     //    }
	// });

	$.ajaxSetup({cache: false});

});


$.timeago.settings.allowFuture = true;

$.fn.unixTimeConverterAgo = function(unixTimestamp){
    const ret = $.timeago(new Date(unixTimestamp * 1000));
    return ret.replace('about ', '');
};

$.fn.unixTimeConverterEx = function(unixTimestamp, isDate = true, isTime = true){
    const cur = Date.now() / 1000;
    if (Math.abs(cur - unixTimestamp) >= (30 * 24 * 60 * 60)) {
        return $.fn.unixTimeConverter(unixTimestamp, isDate, isTime);
    } else {
        return $.fn.unixTimeConverterAgo(unixTimestamp);
    }
};


$.fn.unixTimeConverter = function(unixTimestamp, isDate = true, isTime = true){
    const a = new Date(unixTimestamp * 1000);
    let ret = '';
    if (isDate) {
        const year = a.getFullYear();
        let month = a.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        let date = a.getDate();
        if (date < 10) {
            date = '0' + date;
        }
        ret += year + '-' + month + '-' + date;
        if (isTime) {
            ret += ' ';
        }
    }
    if (isTime) {
        let hour = a.getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }
        let min = a.getMinutes();
        if (min < 10) {
            min = '0' + min;
        }
        let sec = a.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }
        ret += hour + ':' + min + ':' + sec;
    }
    return ret;
};


$.fn.naturalComparator = function() {
    // https://github.com/Project-TF/javascript-natural-sort/blob/umd/naturalSort.js
    // https://github.com/bruce-one/javascript-natural-sort/blob/master/naturalSort.js

    const re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g,
        snre = /\s+/g,        // normalize all whitespace to single ' ' character
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        b0re = /^\0/,
        e0re = /\0$/,
        x0080 = /[^\x00-\x80]/,
        i = function(s) {
            return ('' + s).trim();
        },
        normChunk = function(s, l) {
            // normalize spaces; find floats not starting with '0', string or 0 if not defined (Clint Priest)
            return (!s.match(ore) || l === 1) && parseFloat(s) || s.replace(snre, ' ').trim() || 0;
        };

    function naturalSort(a, b) {
        // convert all to strings strip whitespace
        const x = i(a) || '',
            y = i(b) || '',
            // chunk/tokenize
            xN = x.replace(re, '\0$1\0').replace(e0re,'').replace(b0re,'').split('\0'),
            yN = y.replace(re, '\0$1\0').replace(e0re,'').replace(b0re,'').split('\0'),
            // numeric, hex or date detection
            xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && Date.parse(x)),
            yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null;

        // first try and sort Hex codes or Dates
        if (yD) {
            if (xD < yD) { return -1; }
            else if (xD > yD) { return 1; }
        }

        // natural sorting through split numeric strings and default strings
        for(let cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
            const oFxNcL = normChunk(xN[cLoc] || '', xNl);
            const oFyNcL = normChunk(yN[cLoc] || '', yNl);
            // handle numeric vs string comparison - number < string - (Kyle Adams)
            const isNaNOFxNcL = isNaN(oFxNcL);
            const isNaNOFyNcL = isNaN(oFyNcL);
            if (isNaNOFxNcL !== isNaNOFyNcL) {
                return isNaNOFxNcL ? 1 : -1;
            }
            // if unicode use locale comparison
            if (x0080.test(oFxNcL + oFyNcL) && oFxNcL.localeCompare) {
                const comp = oFxNcL.localeCompare(oFyNcL);
                return comp / Math.abs(comp);
            }
            if (oFxNcL < oFyNcL) {
                return -1;
            } else if (oFxNcL > oFyNcL) {
                return 1;
            }
        }
        return 0;
    }

    return naturalSort;
}();


$.fn.createGridColumns = function(columns) {
    for(const c of columns) {
        if (c.editable === undefined) {
            c.editable = false;
        }
        if (c.orderable === undefined) {
            c.orderable = true;
        }
        if (c.resizeable === undefined) {
            c.resizeable = true;
        }
        if (c.width === undefined) {
            c.width = 80;
        }
        if (c.filterType === undefined) {
            if (c.cell === "string") {
                c.filterType = "string";
            } else if (c.cell === "boolean") {
                c.filterType = "boolean";
            } else if (c.cell === "integer") {
                c.filterType = "number";
            }
        }
        if (c.sortType === undefined) {
            c.sortType = "toggle";
        }
    }
    return columns;
};
