var DEBUG_FLG = false;

var fs = require('fs');
//require('request').debug = true
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var sqlite3 = require("./sqlite3.js");
var file = require("./file.js");
var parse = require("./parse.js");
var util = require("./util.js");

var PROXY_URL = 'http://xxx.x.x.x:port';
var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko';
var HEADER = '<style type=\"text/css\">';
//HEADER += 'font-family: \"メイリオ\", sans-serif;';
HEADER += ' a { text-decoration: none; }';
HEADER += ' a:link { color: #808080; }';
HEADER += ' a:visited { color: #000080; }';
HEADER += ' a:hover { color: #ff0000; }';
HEADER += ' a:active { color: #ff8000; }';
HEADER += '</style>';
HEADER += '<font size=small>' + util.getCurrentTimeWithSlash() + '</font>';
var TBLS = ["config","site"];

var options = {
  url: '',
  proxy : PROXY_URL,
  headers: {
    'User-Agent': USER_AGENT
  }
};

// init output file
var init = function(){
	// write css style to ouput file
	file.delete(function(){
		// write css style to ouput file
		file.append(HEADER);
	});
};

// insert data to DB
var insertData = function(siteInfo) {
	// loop through sites in jsonObject
	options.url = siteInfo.url;
	console.log(siteInfo);
	// access available url
	if(siteInfo.flg == 1) {
		// access site and capture contents
		request(options, function (err, response, body) {
			if(err) return console.error(err);
			
			if(siteInfo.type == "xml") {
				parse.parseXml(body,siteInfo);
			} else {
				parse.parseHtml(body, siteInfo);
			}
		})
	}
};

var appendContents = function(str) {
	file.append(str);
}

// refresh the contents of pickup file.
var refreshPickup = function(){
	sqlite3.select(appendContents);
};

// read config and call insertData function.
var readConfig2InsertData = function(){
	sqlite3.selectAll(TBLS[0], insertData);
}

var chain = [
	init,
	readConfig2InsertData,
	refreshPickup
];
chain.shift()();
chain.shift()();
chain.shift()();