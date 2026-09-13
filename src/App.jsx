import { useState, useEffect } from "react";
import { fetchMember, MEMBER_IDS } from "./api";

export default function App() {
  const [memberId, setMemberId] = useState("m_001");
  const [member, setMember] = useState(null);

  useEffect(() => {
    fetchMember(memberId).then((data) => {
      setMember(data);
    });
  }, [memberId]);

  return (
    <div className="app">
      <header>
        <h1>Health Report</h1>
        <select value={memberId} onChange={(e) => setMemberId(e.target.value)}>
          {MEMBER_IDS.map((id) => (
            <option value={id}>{id}</option>
          ))}
        </select>
      </header>

      <h2>{member.name}</h2>
      <p className="meta">
        Report {member.report.report_id} · collected {member.report.collected_on}
      </p>

      <div className="score">
        <span className="score-value">{member.report.score.total}</span>
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
            <tr className={b.status}>
              <td>{b.label}</td>
              <td>{b.value}</td>
              <td>
                {b.range[0]} – {b.range[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
