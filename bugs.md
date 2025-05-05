# 🐞 Bugs & Issues Log

This document tracks any functional or visual issues discovered during testing.

---

## ❗ Bug #1

- **Title:** Interaction not created due to missing required field error
- **Area:** Create Interaction Form
- **Steps to Reproduce:**
  1. Open the Create Interaction form
  2. Leave the "Person B" field empty
  3. Click "Save"
- **Expected Result:** User is shown a clear validation error
- **Actual Result:** Form fails silently; no error message shown
- **Severity:** Medium
- **Notes:** Form should prevent submission or clearly indicate required fields
