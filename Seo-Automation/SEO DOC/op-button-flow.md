# OP Button Logic Flow

Describes how GEN-AIS determines whether to apply metadata automatically or hold it for review.

---

## 1. Initial Metadata Submission (Pre-Registration)

- User enters URL → Platform detected (Wix / Other)
- User provides metadata + gives Concurrence ✅
- System calls: `reviewAndApplyInitialMetadata()`
    - If `userConcurrence === true`:
        - Metadata applied via platform logic
    - Else:
        - Metadata deferred

---

## 2. Post-Registration (Pro Plan Users)

- User registers and selects a Plan
- OP Button becomes active
- Click triggers `handleOPButtonClick()`
    - If `user.plan === 'pro' && user.concurrenceEnabled === true`:
        - Apply metadata instantly
    - Else:
        - Flag as pending
