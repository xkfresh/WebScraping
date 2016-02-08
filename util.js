var util = require("./util.js");

module.exports = {
	getDate : function(date) {
	    var localDate   = new Date(date);
	    var mm = new String(localDate.getMonth() + 1);
	    if(mm.length == 1) {
	    	mm = '0' + mm;
	    }
	    var dd = new String(localDate.getDate());
	    if(dd.length == 1) {
	    	dd = '0' + dd;
	    }
	    
	    return "" + localDate.getFullYear() + mm + dd;
	},
	getToday : function(period) {
		var localDate   = new Date();
		if(period > 0) {
			localDate.setDate (localDate.getDate() - period);
		}
		
		var mm = new String(localDate.getMonth() + 1);
	    if(mm.length == 1) {
	    	mm = '0' + mm;
	    }
	    var dd = new String(localDate.getDate());
	    if(dd.length == 1) {
	    	dd = '0' + dd;
	    }
	    
		return "" + localDate.getFullYear() + mm + dd;
	}
};