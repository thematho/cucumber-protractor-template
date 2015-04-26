'use strict';

// at the top of the test spec:
var fs = require('fs');

// ... other code

// abstract writing screen shot to a file
function writeScreenShot(data, filename) {
  var stream = fs.createWriteStream(filename);

  stream.write(new Buffer(data, 'base64'));
  stream.end();
}

var WorldConstructor = function(callback) {
  var zombie = require('zombie');
  this.World = function World(callback) {

    this.browser = new zombie(); // this.browser will be available in step definitions

    this.visit = function(url, callback) {
      this.browser.visit(url, callback);
    };

    this.takeScreenshot = function() {
      browser.takeScreenshot()
        .then(function(png) {
          var now = new Date();
          writeScreenShot(png, now.toString() + '_screenShot.png');
        });
    };

    // Debug Options
    this.debugger = function() {
      browser.debugger();
    };

    this.pause = function() {
      browser.pause();
    };

    // ignoreSynchronization is false by default
    this.toggleSynchronization = function() {
      browser.ignoreSynchronization = !browser.ignoreSynchronization;
    };

    // ignoreSynchronization is false by default
    this.ignoreSynchronization = function() {
      browser.ignoreSynchronization = true;
    };

    callback(); // tell Cucumber we're finished and to use 'this' as the world instance
  };
};

exports.World = WorldConstructor;
