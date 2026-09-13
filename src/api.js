// Fake API. Do not change the shape of what these return — treat it as a
// backend contract you do not control. You may change the delays.

const MEMBERS = {
  m_001: {
    member_id: "m_001",
    name: "Asha Rao",
    report: {
      report_id: "r_100",
      collected_on: "2026-08-14",
      verified_by_clinician: true,
      verified_on: "2026-08-16",
      score: { total: 742, coverage: 1.0 },
      biomarkers: [
        { code: "fasting_glucose", label: "Fasting Glucose", value: 92, unit: "mg/dL", range: [70, 100], status: "normal" },
        { code: "hba1c", label: "HbA1c", value: 5.3, unit: "%", range: [4.0, 5.6], status: "normal" },
        { code: "triglycerides", label: "Triglycerides", value: 130, unit: "mg/dL", range: [0, 150], status: "normal" },
        { code: "vo2_max", label: "VO2 Max", value: 41, unit: "mL/kg/min", range: [35, 60], status: "normal" },
        { code: "resting_heart_rate", label: "Resting Heart Rate", value: 64, unit: "bpm", range: [50, 70], status: "normal" },
      ],
    },
  },

  m_002: {
    member_id: "m_002",
    name: "Ravi Iyer",
    report: {
      report_id: "r_101",
      collected_on: "2026-08-20",
      verified_by_clinician: false,
      verified_on: null,
      score: { total: 318, coverage: 0.22 },
      biomarkers: [
        { code: "fasting_glucose", label: "Fasting Glucose", value: 104, unit: "mg/dL", range: [70, 100], status: "high" },
        { code: "hba1c", label: "HbA1c", value: 5.9, unit: "%", range: [4.0, 5.6], status: "high" },
      ],
    },
  },

  m_003: {
    member_id: "m_003",
    name: "Neha Kulkarni",
    report: null, // no report uploaded yet
  },
};

export function fetchMember(memberId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // m_004 always fails — the backend is down for this one.
      if (memberId === "m_004") {
        reject(new Error("Upstream service unavailable"));
        return;
      }
      const member = MEMBERS[memberId];
      if (!member) {
        reject(new Error("Member not found"));
        return;
      }
      resolve(member);
    }, 900);
  });
}

export const MEMBER_IDS = ["m_001", "m_002", "m_003", "m_004"];
