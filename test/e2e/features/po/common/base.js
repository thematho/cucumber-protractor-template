function visit(path, params) {
  // return browser.get(this.path + (params || ''));
  return browser.get(this.path + (params || ''));
}

function navigate() {
  return browser.navigate();
}

function navigateBackward() {
  return navigate().back();
}

function navigateForward() {
  return navigate().forward();
}

exports.Base = {
  visit: visit,
  forward: navigateForward,
  backward: navigateBackward
};
