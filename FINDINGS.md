#Findings

## Part 1 - Existing Screen

### 1. Loading state
Added a loding state while member data is being fetched.

### 2. Empty state
Handled members without a report. 

for `m_003` , the application now displays an normal empty state instead of attempting tp access report fields.

### 3. Error state
Handled API failures.

For `m_004`, the application displays an error message and provides a retry action.

### 4. Stale data
The previous member's data is cleared when switching members.

The request also uses effect cleanup to prevent an older request from updating the
screen after a newer member has been selected.


### 5. Clinician verification
Reports that have not been verified by a clinician are not presented as confirmed
clinical results.

For `m_002`, the score and biomarker values are hidden and the member sees:

"Report awaiting clinician review"

"This report has not yet been verified by a clinician. Results are not available
for interpretation until verification is complete."

Coverage is still displayed to communicate report completeness.

### 6. Verified reports
For verified reports such as `m_001`, the score and biomarker results are shown,
along with the clinician verification date.

## Part 2
[Will Add after completing ]

## AI Usage
Basic CSS are added for the application