# 🐞 Bugs & Issues Log

This document tracks any functional or visual issues discovered during testing.

---

## ❗ Issue #1

- **Title:** Varchar for Timestamp
- **Area:** DB Model
- **Steps to Reproduce:**
  1. n/a
- **Expected Result:** n/a
- **Actual Result:** n/a
- **Severity:** n/a
- **Notes:** While mocking test DB, I noticed that the timestamp column is a Varchar. I'm not sure if this is a bug or not. I'll investigate further. `Timestamp` is better practice.

## ❗ Issue #2

- **Title:** No pool Export
- **Area:** postgresClient.ts
- **Steps to Reproduce:**
  1. n/a
- **Expected Result:** pool should be exported to allow for proper tear down in testing. 
- **Actual Result:** n/a
- **Severity:** n/a
- **Notes:** While tearing down the db for testing, I noticed that the pool was not being exported. 
