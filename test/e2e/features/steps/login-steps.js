var sugarStep = require('../support/sugar-step/lib/sugar-step.js'),
  loginPO = new(require('../po/login.po.js'))();

module.exports = function() {
  'use strict';

  var given, then, when;

  given = then = when = sugarStep(this.defineStep);

  this.path = '#/';

  given(/^I am on the main page$/, function() {
    loginPO.visit();
  });

  given(/^I click the login button$/, function() {
    return loginPO.clickLoginButton();
  });

  given(/^I enter "?([^"]*)"? user and "?([^"]*)"? password$/,
    function(user, password) {
      return loginPO.enterUserAndPassword(user, password);
    });

  given(/^I should see "?([^"]*)"? as current user$/, function(userName) {
    return loginPO.checkCurrentUser(userName);
  });

  given(/^I press OK btn$/, function() {
    return loginPO.pressOK();
  });

  given(/^I should see an error message with "?([^"]*)"? status code$/,
    function(statusCode) {
      return loginPO.checkErrorMessageStatusCode(statusCode);
    });

};
