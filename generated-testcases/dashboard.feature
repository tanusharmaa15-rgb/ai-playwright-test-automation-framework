Feature: Dashboard Module

Scenario: Verify Dashboard Widgets
Given the user is logged in
When the dashboard loads
Then all widgets should be displayed correctly

Scenario: Verify Product List
Given the user is on the dashboard
When the inventory page loads
Then all products should be displayed

Scenario: Verify Filter Functionality
Given the user is on the dashboard
When a filter option is selected
Then the products should be sorted correctly

Scenario: Verify Responsive Layout
Given the user is on the dashboard
When the browser window is resized
Then the layout should remain responsive

Scenario: Verify Permission Based Access
Given a logged in user
When the dashboard loads
Then only authorized information should be visible