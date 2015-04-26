'use strict';

var _ = require('lodash');

var LoginPageObject = function() {

  var loginButton = element(by.css('.js-login-btn')),
    userNameInput = element(by.css('.js-input-user-name')),
    passwordInput = element(by.css('.js-input-password')),
    okBtn = element(by.css('.js-ok-btn')),
    cancelBtn = element(by.css('.js-cancel-btn')),
    currentUserSelector = '.js-current-user',
    errorMsgSelector = '.js-error-message';

  _.mixin(this, require('./common/base.js').Base);

  this.path = '#/';
  this.clickLoginButton = function() {
    return loginButton.click();
  };

  this.enterUserAndPassword = function(user, password) {
    return userNameInput.sendKeys(user)
      .then(function() {
        return passwordInput.sendKeys(password);
      });
  };

  this.pressOK = function() {
    return okBtn.click();
  };

  this.pressCancel = function() {
    return cancelBtn.click();
  };

  this.checkCurrentUser = function(user) {
    browser.debugger();
    var currentUserEl = element(by.cssContainingText(currentUserSelector, user));
    return currentUserEl.isDisplayed();
  };

  this.checkErrorMessageStatusCode = function(statusCode) {
    return element(by.cssContainingText(errorMsgSelector, statusCode))
      .isDisplayed();
  };

};

module.exports = LoginPageObject;
