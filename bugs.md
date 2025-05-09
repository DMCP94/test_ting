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
- **Area:** controllers
- **Steps to Reproduce:**
  1. POST /api/interactions
  2. SourceID = Null
  3. Get Results
- **Expected Result:** API should error / not create new interaction
- **Actual Result:** API creates new interaction
- **Severity:** n/a
- **Notes:** More investigation need, likely other issues here as well.

## ❗ Issue #3
 **Title:** Delete /interaction/:id returns a 200 even when interaction does not exist
- **Area:** controllers
- **Steps to Reproduce:**
  1. Try to hit DELETE /api/interactions/:id with id that doesnt exist like 99999999
  2. See that you get a 200 back. 
- **Expected Result:** Trying to delete a non existing interaction should return a 404
- **Actual Result:** Trying to delete a non existing interaction returns a 200
- **Severity:** n/a
- **Notes:** More investigation need, likely other issues here as well.