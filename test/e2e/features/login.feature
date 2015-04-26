# features/login.feature

Feature: Login feature
  As a user
  I want authenticate my account

  Scenario: Authentication  success
    Given I am on the main page
    And I click the login button
    And I enter "myUserName" user and "password" password
    When I press OK btn
    Then I should see "myUserName" as current user

  @AroundMock(authenticationError404)
  Scenario: Authentication error displayed when server is down
    Given I am on the main page
    And I click the login button
    And I enter "myUserName" user and "password" password
    When I press OK btn
    Then I should see an error message with "404" status code

  @AroundMock(authenticationError500)
  Scenario: Authentication error displayed when server internalerror
    Given I am on the main page
    And I click the login button
    And I enter "myUserName" user and "password" password
    When I press OK btn
    Then I should see an error message with "500" status code
