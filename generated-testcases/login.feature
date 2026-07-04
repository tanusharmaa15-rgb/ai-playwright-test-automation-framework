Feature: Login Module

Scenario: Valid Login
Given the user is on the login page
When valid username and password are entered
Then the user should be redirected to the dashboard

Scenario: Invalid Login
Given the user is on the login page
When invalid credentials are entered
Then an error message should be displayed

Scenario: Forgot Password
Given the user is on the login page
When the user clicks Forgot Password
Then password recovery should be initiated

Scenario: Session Expiry
Given the user is logged in
When the session expires
Then the user should be redirected to login

Scenario: Brute Force Lockout
Given multiple failed login attempts
When the threshold is exceeded
Then the account should be temporarily locked