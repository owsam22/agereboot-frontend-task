# Agereboot Frontend Task

Frontend implementation for the Agereboot technical task.

## Project Structure

Part 1 and Part 2 are maintained as separate Vite applications so they can be developed and evaluated independently.

```text
agereboot-frontend-task/
├── part1/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── part2/
│   └── ...
│
├── FINDINGS.md
├── README.md
├── README-received.md
└── .gitignore
```

> Part 2 is currently under development.

---

## Part 1 — Existing Screen

Part 1 focuses on fixing the provided member health report screen while respecting the existing backend/API contract.

### Run Part 1

```bash
cd part1
npm install
npm run dev
```

### Implemented

* Loading state while member data is being fetched
* Empty state when a member has no report
* Error state for failed API requests
* Retry action for failed requests
* Protection against stale data when switching members
* Clinician verification handling
* Report coverage display
* Separate handling of verified and unverified reports

### Member Scenarios

| Member  | Scenario                               |
| ------- | -------------------------------------- |
| `m_001` | Verified report                        |
| `m_002` | Report awaiting clinician verification |
| `m_003` | No report available                    |
| `m_004` | API failure with retry                 |

For unverified reports, clinical results and the health score are not presented as confirmed results.

---

## Technical Approach

* React
* Vite
* JavaScript / JSX
* CSS
* Provided API/backend contract

The provided API response shapes were not changed.

---

## Documentation

Detailed findings, implementation decisions, and rationale are documented in [`FINDINGS.md`](./FINDINGS.md).
