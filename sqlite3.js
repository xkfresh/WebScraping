/**
 * Shows how to use chaining rather than the `serialize` method.
 */
"use strict";

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./ScrapingDB.sqlite');
var file = require("./file.js");
var util = require("./util.js");

module.exports = {
	insertIfNotExist: function (id, title, link) {
		db.serialize(function() {
			var stmt = db.prepare("SELECT * FROM site WHERE link = ?");
			stmt.get(link, function(err, row) {
				if(row === undefined) {
					var insertStmt = db.prepare("INSERT INTO site VALUES (?,?,?,?)");
					insertStmt.run(id,title,link, util.getCurrentTime());
					insertStmt.finalize();
				}
			});
			stmt.finalize();
		});
	},
	select: function (callback) {
		var i = 1, preId = "";
	    db.serialize(function() {
		    db.each("SELECT * FROM site order by id, title, updateDate desc", function(err, row) {
		    	var selectResult = "";
		    	if(preId == "" || row.id != preId) {
		    		i = 1;
		    		selectResult = '<h2>' + row.id + "</h2>";
		    	}
		    	
		    	var newFlg = "";
		    	var updateDate = new String(row.updateDate);
		    	if(util.getToday(0) == updateDate.substring(0,8)){
		    		newFlg = "<i style='color:#808060'> NEW</i>";
		    	}
		    	
		    	selectResult += i + ':  <a href=\'' + row.link + '\'>' + row.title + '</a>' + newFlg + '<br>';
		    	//console.log(row);

		      	i++;
		      	preId = row.id;
		      	
		      	callback(selectResult);
			});
		});
	},
	selectAll: function (table, callback) {
		var result = new Array();
		console.log(1);
	    db.serialize(function() {
		    db.each("SELECT * FROM " + table, function(err, row) {
		    	result +=row;
		    	
		    	callback(row);
			});
		});
	}
};