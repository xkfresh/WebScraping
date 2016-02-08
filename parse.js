var sqlite3 = require("./sqlite3.js");
var cheerio = require('cheerio');
var url = require('url');
var util = require("./util.js");

module.exports = {
	// parse html contents and write to file
	parseHtml : function (body, siteInfo) {
		var id = siteInfo.id;
		var siteUrl = siteInfo.url;
		var target = siteInfo.target
	    var $ = cheerio.load(body);

	    // Finally, we'll define the variables we're going to capture
	    var title, link;
	    $(target).each(function(index) {
			title = $(this).text().trim();	
	        link = $(this).attr("href");
	        
	        if(link.indexOf('http://') != 0) {
	        	link = url.resolve(siteUrl, link);
	        }
	        
	        sqlite3.insertIfNotExist(id, title, link);
	    });
	},

	// parse xml contents and write to file
	parseXml : function(body, siteInfo) {
		var id = siteInfo.id;
		var pubDateName = siteInfo.pubDateName;
		var period = siteInfo.period
		var contentName = siteInfo.contentName
		var $ = cheerio.load(body, {xmlMode: true});

	    // Finally, we'll define the variables we're going to capture
	    var title, link;
		$('item').each(function(index,item) {
			title = $(this).children("title").text();
			link = $(this).children("link").text();
		    var pubDate    = $(this).children(pubDateName).text();
		    
		    // get title of current date
		    if(util.getDate(pubDate) >= util.getToday(period)) {
		    	sqlite3.insertIfNotExist(id, title, link);
		    }
		});
	}
};