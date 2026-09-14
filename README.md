# Agereboot Frontend Task

Frontend implementation for the Agereboot technical task.

## Project Structure

Part 1 and Part 2 are separate Vite applications so they can be run and evaluated independently.

```text
agereboot-frontend-task/

├── part1/
│   └── ...
│
├── part2/
│   └── ...
│
├── FINDINGS.md
├── README.md
└── .gitignore
```

---

## Part 1 — Existing Screen

Part 1 focuses on fixing the provided health report screen while keeping the existing API contract unchanged.

### Run Part 1

```bash
cd part1
npm install
npm run dev
```

### Implemented

* Loading state
* Empty state
* API error and retry
* Stale request protection
* Clinician verification handling
* Report coverage
* Verified and unverified report handling

### Member Scenarios

| Member  | Scenario                        |
| ------- | ------------------------------- |
| `m_001` | Verified report                 |
| `m_002` | Awaiting clinician verification |
| `m_003` | No report                       |
| `m_004` | API failure                     |

---

## Part 2 — Redesigned Screen

Part 2 is a redesign focused on making the report easier for a member to find and understand.

### Run Part 2

```bash
cd part2
npm install
npm run dev
```

### Added

* Simple home screen
* Member search by name or ID
* Member selection
* Report detail view
* Skeleton loading state
* Responsive layout for `375px`
* Biomarker cards
* Back-to-home navigation
* Clear handling of verified, pending, empty, and error states

The original API contract was kept unchanged.

---

## Technical Approach

* React
* Vite
* JavaScript / JSX
* CSS
* Provided API/backend contract

## Documentation

More details about the decisions and findings are available in [`FINDINGS.md`](./FINDINGS.md).
