# Test Strategy for Sayari SDET Take-home

## Overview

This strategy outlines the approach for testing the full-stack component that handles interactions between people. The application consists of a React/TypeScript frontend, a Node/Express backend, and a Postgres database.

---

## Test Focus

### What Will Be Automated

| **Area**                 | **Tests**                                                       |
|--------------------------|-----------------------------------------------------------------|
| **API**                  | All backend endpoints responsible for CRUD / High Regression areas                      |
| **Frontend Components**  | Key components (e.g., Interactions List, Interactions Details)  |
| **End-to-End (E2E)**     | Core User flows (CRUD), High Regression areas                   |
| **Basic Security**       | API Authentication / Error Handling                             |


### What Will Be Manually Tested

| **Area**                   | **Tests**                                                        |
|----------------------------|------------------------------------------------------------------|
| **UI/UX**                  | Core User Flows, UI Validation, Usability  |
| **Edge Cases**             | Complex user interactions, Exploritory Testing, failure scenarios|

---

## Additional Testing Recommendations

### Performance Testing
- Backend performance (API response times under load).

### Security Testing
- Input validation, avoiding SQL injection, XSS, etc.

### Accessibility Testing
- Check WCAG compliance with tools like **axe**.

---

## Test Data Strategy

- Use an isolated test database with seed data 
- Seed data in a way that is deterministic and repeatable.
- Clean up the test database after each test run 

---

## Tools and Frameworks

- **API Testing**: Jest + Supertest .
- **Frontend Testing**: Cypress .
- **E2E Testing**: Cypress .

---

## Improvments

-  Wrap low level components in functions that will only allow them to be called during tests.
-  Current infratructure is not freindly to mocking individual routes since everthing is handled in the same file (server.ts)

---

## Conclusion

This strategy ensures that the most critical areas of the application are well-tested, providing stability, scalability, and confidence in future releases. Manual testing will focus on areas with a high impact on user experience and complex edge cases.
