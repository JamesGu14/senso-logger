'use strict'

var fs = require('fs');
var mkdirp = require('mkdirp');
var colors = require('colors');
var mv = require('mv');


var today = new Date();
// let basePath = __dirname;
var path = require('path');
var basePath = path.dirname(require.main.filename);

/** 
 Logging Folder Structure
 
 log
 |--Archive
        |--Jan
        |--Feb
        |--Mar 
 |--Apr
 |--May
 */

function checkIfLogFolderExists(callback) {
	let path = basePath + '/log';

	fs.access(path, fs.F_OK, function(err) {
		if(!err) {
			callback(true);
		} else {
			mkdirp(path, function(err) {
	        	if(err) {
	        		console.log('Failed to create logging folder'.red);
	        		console.error(err);
	        		callback(false);
	        	}
	        	else {
	        		console.log('Logger folder created successfully');
	        		callback(true);
	        	}
	        });
		}
	});
}

function checkIfArchiveFolderExists(callback) {
	let path = basePath + '/log/archived';

	fs.access(path, fs.F_OK, function(err) {
		if(!err) {
			callback(true);
		} else {
			mkdirp(path, function(err) {
	        	if(err) {
	        		console.log('Failed to create archived folder'.red);
	        		console.error(err);
	        		callback(false);
	        	}
	        	else {
	        		console.log('Archived folder created successfully');
	        		callback(true);
	        	}
	        });
		}
	});
}

function checkIfMonthFolderExists(callback) {
	var today = new Date();
    var path = basePath + '/log/' + today.getFullYear() + '_' + ((today.getMonth() + 1).length === 1 ? 
    	(today.getMonth() + 1) : ('0' + (today.getMonth() + 1)));
    fs.access(path, fs.F_OK, function(err) {
    	if(!err) {
    		callback(true);
    	} else {
    		mkdirp(path, function(err) {
	        	if(err) {
	        		console.log('Failed to create current month folder'.red);
	        		console.error(err);
	        		callback(false);
	        	}
	        	else {
	        		console.log('Current month folder created successfully');
	        		callback(true);
	        	}
	        });
    	}
    });
}

// Check if previous month folder is ready to archive
function checkIfMonthFolderIsArchived(callback) {
	// at 5th of a month, archive the previous
	if(new Date().getDate() >= 5) {

		let prevMonthPath = today.getFullYear() + '_' + (today.getMonth().length === 1 ? 
	        	today.getMonth() : ('0' + today.getMonth()));

		fs.access(basePath + '/log/' + prevMonthPath, fs.F_OK, function(err) {
			if(!err) {
				mv(basePath + '/log/' + prevMonthPath, basePath + '/log/archived/' + prevMonthPath, function(err) {
					if(err) { 
						console.log(err);
						console.log('Archiving folder failed!'.red);
					} else {
						console.log('Successfully Archived folder'.green);
					}
					callback(true);
				});		
			}
		});
	}
}

module.exports = function(msg) {
	checkIfLogFolderExists(function(res) {
		if(res) {
			checkIfArchiveFolderExists(function(res) {
				if(res) {
					checkIfMonthFolderExists(function(res) {
						if(res) {
							let time = new Date().getHours() + ':' + new Date().getMinutes() 
								+ ':' + new Date().getSeconds();
							writeLog(msg + ' - ' + time + '\r\n');
						}
					});

					checkIfMonthFolderIsArchived(function(res) {

					});
				}
			});
		}
	});
};

function writeLog(msg) {
	msg += '\r\n';
	let monthPath = today.getFullYear() + '_' + ((today.getMonth() + 1).length === 1 ? 
    	(today.getMonth() + 1) : ('0' + (today.getMonth() + 1)));
	let dateFileName = ((today.getMonth() + 1).length === 1 ? 
    	(today.getMonth() + 1) : ('0' + (today.getMonth() + 1))) + '_' + today.getDate() + '.log';
	let path = basePath + '/log/' + monthPath + '/' + dateFileName;

	fs.access(path, fs.F_OK, function(err) {
		if(err) {
			fs.writeFile(path, msg, function(err) {
				if(err) {
					console.log(err);
				}
			}); 
		} else {
			fs.appendFile(path, msg, (err) => {
				if (err) throw err;
			});
		}
	});
}
