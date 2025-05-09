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
 **Title:** POST /interactions is accepting interactions with no source/target ID's
- **Area:** postgresClient.ts
- **Steps to Reproduce:**
  1. POST /api/interactions
  2. SourceID = Null
  3. Get Results
- **Expected Result:** API should error / not create new interaction
- **Actual Result:** API creates new interaction
- **Severity:** n/a
- **Notes:** More investigation need, likely other issues here as well.