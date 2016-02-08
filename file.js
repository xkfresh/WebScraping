var OUTPUT_FILE = 'pickup.html';
var DEBUG_FILE = 'debug.txt';
var fs = require('fs');

module.exports = {
	append: function (str) {
		fs.appendFileSync(OUTPUT_FILE, str);
	},
	delete: function (callback) {
		fs.exists(OUTPUT_FILE, function(err) {
			if(err) {
				fs.unlinkSync(OUTPUT_FILE);
				console.log('successfully deleted ' + OUTPUT_FILE);
			}
			
			callback();
		});
	},
	// write contents to temp file
	writeTempFile: function(str) {
		fs.writeFile(DEBUG_FILE, str, function(err){
		    if (err) throw err;
		})
	}
};