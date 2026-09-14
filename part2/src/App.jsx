
import { useEffect, useMemo, useState } from "react";
import { fetchMember, MEMBER_IDS } from "./api";

const MEMBERS = [
  {
    id: "m_001",
    name: "Asha Rao",
    status: "Verified",
  },
  {
    id: "m_002",
    name: "Ravi Iyer",
    status: "Review pending",
  },
  {
    id: "m_003",
    name: "Neha Kulkarni",
    status: "No report",
  },
  {
    id: "m_004",
    name: "Member unavailable",
    status: "Unavailable",
  },
].filter((member) => MEMBER_IDS.includes(member.id));

function getInitials(name) {
  if (!name) return "?";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function App() {
  const [memberId, setMemberId] = useState("m_001");
  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [view, setView] = useState("home");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return MEMBERS;
    }

    return MEMBERS.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
    );
  }, [search]);

  useEffect(() => {
    if (view !== "report") return;

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
  }, [memberId, retryCount, view]);

  const openReport = (id) => {
    setMemberId(id);
    setSearch("");
    setSearchOpen(false);
    setView("report");
  };

  const goHome = () => {
    setView("home");
    setSearch("");
    setSearchOpen(false);
    setError(null);
    setMember(null);
  };

  const retry = () => {
    setRetryCount((count) => count + 1);
  };

  return (
    <div className="app">
      <header className="navbar">
        <button className="brand" onClick={goHome} aria-label="Go to home">
          <span className="brand-mark">H</span>
          <span>Health Report</span>
        </button>

        <div className={`navbar-search ${searchOpen ? "is-open" : ""}`}>
          {searchOpen && (
            <>
              <SearchIcon />
              <input
                autoFocus
                type="search"
                placeholder="Search by name or member ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearch("");
                    setSearchOpen(false);
                  }
                }}
              />

              {search && (
                <div className="search-results">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((item) => (
                      <button
                        key={item.id}
                        className="search-result"
                        onClick={() => openReport(item.id)}
                      >
                        <span className="result-avatar">
                          {getInitials(item.name)}
                        </span>

                        <span className="result-info">
                          <strong>{item.name}</strong>
                          <small>{item.id}</small>
                        </span>

                        <span
                          className={`result-status ${
                            item.status === "Verified"
                              ? "verified"
                              : item.status === "Review pending"
                              ? "pending"
                              : ""
                          }`}
                        >
                          {item.status}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="no-results">
                      No member found
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <button
          className={`search-button ${searchOpen ? "active" : ""}`}
          onClick={() => setSearchOpen((open) => !open)}
          aria-label="Search members"
          aria-expanded={searchOpen}
        >
          <SearchIcon />
          <span>Search</span>
        </button>
      </header>

      {view === "home" && (
        <main className="home">
          <section className="home-intro">
            <p className="eyebrow">MEMBER HEALTH</p>

            <h1>
              Your health information,
              <br />
              in one place.
            </h1>

            <p className="home-description">
              View your latest health report, check its verification status,
              and review your available health measurements.
            </p>

            <button
              className="primary-button"
              onClick={() => {
                setSearchOpen(true);
                setTimeout(() => {
                  document
                    .querySelector(".navbar-search input")
                    ?.focus();
                }, 0);
              }}
            >
              <SearchIcon />
              Find my report
            </button>
          </section>

          <section className="home-guide">
            <div>
              <span className="guide-number">01</span>
              <div>
                <strong>Find your report</strong>
                <p>Search using your name or member ID.</p>
              </div>
            </div>

            <div>
              <span className="guide-number">02</span>
              <div>
                <strong>Check your results</strong>
                <p>See verified information in a simple format.</p>
              </div>
            </div>

            <div>
              <span className="guide-number">03</span>
              <div>
                <strong>Know what's available</strong>
                <p>Report coverage and verification are shown clearly.</p>
              </div>
            </div>
          </section>
        </main>
      )}

      {view === "report" && (
        <main className="report-page">
          <button className="back-button" onClick={goHome}>
            <ArrowLeftIcon />
            Back to home
          </button>

          {loading && (
            <div className="report-content">
              <div className="skeleton skeleton-small" />
              <div className="skeleton skeleton-title" />

              <div className="skeleton-card">
                <div className="skeleton skeleton-avatar" />
                <div className="skeleton-lines">
                  <div className="skeleton skeleton-line medium" />
                  <div className="skeleton skeleton-line short" />
                </div>
              </div>

              <div className="skeleton-card">
                <div className="skeleton skeleton-line medium" />
                <div className="skeleton skeleton-score" />
              </div>

              <div className="skeleton-grid">
                <div className="skeleton skeleton-card" />
                <div className="skeleton skeleton-card" />
                <div className="skeleton skeleton-card" />
              </div>
            </div>
          )}

          {!loading && error && (
            <section className="state-card error-card">
              <div className="state-icon">!</div>
              <p className="eyebrow">REPORT UNAVAILABLE</p>
              <h1>Couldn't load this report</h1>
              <p>
                We couldn't retrieve the health information right now.
                Please try again.
              </p>

              <button className="secondary-button" onClick={retry}>
                Try again
              </button>
            </section>
          )}

          {!loading && !error && member && (
            <div className="report-content">
              <div className="report-heading">
                <p className="eyebrow">HEALTH REPORT</p>
                <h1>{member.name}</h1>
                <p className="report-id">
                  Member ID · {member.member_id}
                </p>
              </div>

              {!member.report && (
                <section className="state-card empty-card">
                  <div className="state-icon muted">—</div>
                  <p className="eyebrow">NO REPORT</p>
                  <h2>No report available</h2>
                  <p>
                    There is no health report uploaded for {member.name} yet.
                  </p>
                </section>
              )}

              {member.report && (
                <>
                  <section className="member-card">
                    <div className="avatar">
                      {getInitials(member.name)}
                    </div>

                    <div className="member-details">
                      <strong>{member.name}</strong>
                      <span>Report {member.report.report_id}</span>
                      <span>
                        Collected {member.report.collected_on}
                      </span>
                    </div>

                    {member.report.verified_by_clinician && (
                      <span className="verified-badge">
                        <CheckIcon />
                        Verified
                      </span>
                    )}
                  </section>

                  {!member.report.verified_by_clinician ? (
                    <>
                      <section className="review-card">
                        <div className="review-top">
                          <span className="review-dot" />
                          <span>Awaiting clinician review</span>
                        </div>

                        <h2>Your report is not ready to review yet.</h2>

                        <p>
                          This report has not yet been verified by a clinician.
                          Results will be available for interpretation after
                          verification is complete.
                        </p>
                      </section>

                      <section className="coverage-card">
                        <div className="section-label">
                          <span>Report coverage</span>
                          <strong>
                            {Math.round(
                              member.report.score.coverage * 100
                            )}
                            %
                          </strong>
                        </div>

                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${
                                member.report.score.coverage * 100
                              }%`,
                            }}
                          />
                        </div>

                        <p>
                          Coverage shows how much of the expected report data
                          has been collected.
                        </p>
                      </section>
                    </>
                  ) : (
                    <>
                      <section className="score-card">
                        <div>
                          <p className="section-label">Health score</p>
                          <p className="score-helper">
                            From your latest verified report
                          </p>
                        </div>

                        <div className="score">
                          <strong>{member.report.score.total}</strong>
                          <span>/ 1000</span>
                        </div>
                      </section>

                      <section className="biomarkers-section">
                        <div className="section-heading">
                          <div>
                            <p className="eyebrow">MEASUREMENTS</p>
                            <h2>Your results</h2>
                          </div>
                          <span>
                            {member.report.biomarkers.length} available
                          </span>
                        </div>

                        <div className="biomarker-grid">
                          {member.report.biomarkers.map((b) => (
                            <article
                              className="biomarker-card"
                              key={b.code}
                            >
                              <div className="biomarker-top">
                                <span>{b.label}</span>
                                <span
                                  className={`status-dot ${b.status}`}
                                />
                              </div>

                              <div className="biomarker-value">
                                <strong>{b.value}</strong>
                                <span>{b.unit}</span>
                              </div>

                              <div className="reference">
                                Reference range: {b.range[0]} – {b.range[1]}
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>

                      <section className="verification-footer">
                        <span className="verification-check">
                          <CheckIcon />
                        </span>

                        <div>
                          <strong>Clinically verified</strong>
                          <p>
                            Verified by a clinician on{" "}
                            {member.report.verified_on}
                          </p>
                        </div>
                      </section>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;