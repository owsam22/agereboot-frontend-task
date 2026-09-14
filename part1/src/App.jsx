import { useState, useEffect } from "react";
import { fetchMember, MEMBER_IDS } from "./api";

export default function App() {
  const [memberId, setMemberId] = useState("m_001");
  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setMember(null);

    fetchMember(memberId)
      .then((data) => {
        if (!cancelled) {
          setMember(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [memberId]);

  const retry = () => {
    setMember(null);
    setError(null);
    setLoading(true);

    fetchMember(memberId)
      .then((data) => {
        setMember(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <header>
        <h1>Health Report</h1>

        <select
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        >
          {MEMBER_IDS.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </header>

      {loading && (
        <div className="state">
          <h2>Loading report...</h2>
          <p>Please wait while we fetch the member's health data.</p>
        </div>
      )}

      {error && (
        <div className="state error-state">
          <h2>Couldn't load this report</h2>
          <p>{error.message}</p>

          <button onClick={retry}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && member && !member.report && (
        <div className="state empty-state">
          <h2>No report available</h2>
          <p>
            There is no health report uploaded for {member.name} yet.
          </p>
        </div>
      )}

      {!loading && !error && member?.report && (
        <>
          <h2>{member.name}</h2>

          <p className="meta">
            Report {member.report.report_id} · collected{" "}
            {member.report.collected_on}
          </p>

          {!member.report.verified_by_clinician ? (
            <div className="verification-state">
              <h3>Report awaiting clinician review</h3>

              <p>
                This report has not yet been verified by a clinician.
                Results are not available for interpretation until
                verification is complete.
              </p>

              <p>
                Coverage:{" "}
                {Math.round(member.report.score.coverage * 100)}%
              </p>
            </div>
          ) : (
            <>
              <div className="score">
                <span className="score-value">
                  {member.report.score.total}
                </span>
                <span className="score-max">/ 1000</span>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Biomarker</th>
                    <th>Value</th>
                    <th>Range</th>
                  </tr>
                </thead>

                <tbody>
                  {member.report.biomarkers.map((b) => (
                    <tr key={b.code} className={b.status}>
                      <td>{b.label}</td>
                      <td>{b.value}</td>
                      <td>
                        {b.range[0]} – {b.range[1]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="verification-note">
                ✓ Verified by clinician on {member.report.verified_on}
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}