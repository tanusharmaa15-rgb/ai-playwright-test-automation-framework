Feature: REST API Testing

Scenario: Validate Authentication
Given a valid authentication token
When a protected API is called
Then the response status should be 200

Scenario: Create Resource
Given valid request data
When a POST request is sent
Then a new resource should be created

Scenario: Update Resource
Given an existing resource
When a PUT request is sent
Then the resource should be updated

Scenario: Delete Resource
Given an existing resource
When a DELETE request is sent
Then the resource should be deleted

Scenario: Invalid Authentication
Given an invalid token
When a protected API is called
Then the response status should be Unauthorized