/*jshint esversion: 6 */

const App = {
	Views: {},
	Models: {},
	Collections: {},
	Grids: {},
	Modals: {},
	Router: {},
	currentLoop: {},

//	baseUrl: 'http://localhost:8000'
    baseUrl: 'http://188.166.89.15'
};

$(document).ready(function() {
	App.Router.Instance = new App.Router;

	Backbone.history.on("route", function() {
		if (false) {
		    Backbone.history.navigate("/login", true);
        }
	});

	Backbone.history.start();

});

$.fn.unixTimeConverter = function(unixTimestamp){
    const a = new Date(unixTimestamp * 1000);
    const year = a.getFullYear();
    let month = a.getMonth();
    if (month < 9) {
        month = '0' + month;
    }
    let date = a.getDate();
    if (date < 9) {
        date = '0' + date;
    }
    let hour = a.getHours();
    if (hour < 9) {
        hour = '0' + hour;
	}
    let min = a.getMinutes();
    if (min < 9) {
        min = '0' + min;
    }
    let sec = a.getSeconds();
    if (sec < 9) {
        sec = '0' + sec;
    }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
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
            if (oFxNcL < oFyNcL) { return -1; }
            else if (oFxNcL > oFyNcL) { return 1; }
        }
        return 0;
    }

    return naturalSort;
}();

