import { useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";


const ChevronIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8l4 4 4-4" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const RoadmapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="22" x2="4" y2="15" />
    <path d="M12 22V8" />
    <path d="M8 22v-6" />
    <path d="M16 22V11" />
    <path d="M20 14V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
    <circle cx="14" cy="9" r="2" />
  </svg>
);

const navItems = [
  { id: "technical", label: "Technical Questions", icon: <CodeIcon /> },
  { id: "behavioural", label: "Behavioural Questions", icon: <PeopleIcon /> },
  { id: "roadmap", label: "Roadmap", icon: <RoadmapIcon /> },
];

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const [expandedTech, setExpandedTech] = useState(0);
  const [expandedBehavioral, setExpandedBehavioral] = useState(0);
  
  const {report} = useInterview()

  const toggleExpand = (setter, index) => {
    setter((prev) => (prev === index ? null : index));
  };

  return (
    <div className="interview">
      {/* TOPBAR */}
      <header className="topbar">
        <div className="logo">
          <div className="logo-icon">AI</div>
          <span>InterviewAI</span>
        </div>
        <nav className="nav-links">
          <a href="#">Dashboard</a>
          <a href="#" className="active">Interview</a>
          <a href="#">Resume</a>
          <a href="#">Settings</a>
        </nav>
        <div className="topbar-actions">
          <button className="upgrade-btn">Upgrade</button>
        </div>
      </header>

      <div className="main-layout">
        {/* LEFT SIDEBAR */}
        <aside className="left-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-card-title">Report Sections</div>
            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`sidebar-link ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className="sidebar-link-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* CENTER CONTENT */}
        <main className="center-content">
          {activeSection === "technical" && (
            <>
              {/* Match Score */}
              <div className="match-score-card">
                <div className="match-score-header">
                  <span className="match-score-title">Interview Match Score</span>
                  <span className="match-score-badge">Generated Report</span>
                </div>
                <div className="match-score-value">{report.matchScore}%</div>
                <div className="match-score-subtitle">Based on your resume vs job description alignment</div>
              </div>

              {/* Technical Questions */}
              <div className="question-section">
                <div className="section-header">
                  <div className="section-icon section-icon--tech">
                    <CodeIcon />
                  </div>
                  <div>
                    <h2>Technical Questions</h2>
                    <p>Core knowledge and problem-solving evaluation</p>
                  </div>
                </div>
                <div className="questions-list">
                  {report.technicalQuestions.map((q, idx) => (
                    <div key={idx} className={`question-item ${expandedTech === idx ? "expanded" : ""}`}>
                      <div className="question-header" onClick={() => toggleExpand(setExpandedTech, idx)}>
                        <span className="question-number">{idx + 1}</span>
                        <span className="question-text">{q.question}</span>
                        <span className="question-toggle"><ChevronIcon /></span>
                      </div>
                      <div className="question-body">
                        <div className="question-body-inner">
                          <span className="question-intention">Intention: {q.intention}</span>
                          <p className="question-answer">{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeSection === "behavioural" && (
            <div className="question-section">
              <div className="section-header">
                <div className="section-icon section-icon--behavioral">
                  <PeopleIcon />
                </div>
                <div>
                  <h2>Behavioural Questions</h2>
                  <p>Soft skills, culture fit, and leadership assessment</p>
                </div>
              </div>
              <div className="questions-list">
                {report.behaviouralQuestions.map((q, idx) => (
                  <div key={idx} className={`question-item ${expandedBehavioral === idx ? "expanded" : ""}`}>
                    <div className="question-header" onClick={() => toggleExpand(setExpandedBehavioral, idx)}>
                      <span className="question-number">{idx + 1}</span>
                      <span className="question-text">{q.question}</span>
                      <span className="question-toggle"><ChevronIcon /></span>
                    </div>
                    <div className="question-body">
                      <div className="question-body-inner">
                        <span className="question-intention">Intention: {q.intention}</span>
                        <p className="question-answer">{q.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "roadmap" && (
            <div className="roadmap">
              <div className="roadmap-header">
                <div className="section-icon section-icon--roadmap">
                  <RoadmapIcon />
                </div>
                <div>
                  <h2>7-Day Preparation Plan</h2>
                  <p className="roadmap-subtitle">A structured roadmap to ace your interview</p>
                </div>
              </div>
              <div className="roadmap-timeline">
                <div className="roadmap-line" />
                {report.preparationPlan.map((item) => (
                  <div key={item.day} className="roadmap-day">
                    <div className="roadmap-dot-wrapper">
                      <div className="roadmap-dot" />
                    </div>
                    <div className="roadmap-content">
                      <div className="roadmap-day-header">
                        <span className="roadmap-focus">{item.focus}</span>
                        <span className="roadmap-day-badge">Day {item.day}</span>
                      </div>
                      <ul className="roadmap-tasks">
                        {item.tasks.map((task, tIdx) => (
                          <li key={tIdx}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="right-sidebar">
          <div className="sidebar-card skill-gaps-card">
            <div className="skill-gaps-header">
              <h3>Skill Gaps</h3>
              <span className="skill-gaps-count">{report.skillGaps.length}</span>
            </div>
            <p className="card-subtitle">Areas identified for improvement before your interview</p>
            <div className="skill-gap-list">
              {report.skillGaps.map((gap, idx) => (
                <div key={idx} className={`skill-gap-card skill-gap-card--${gap.severity}`}>
                  <div className="skill-gap-content">
                    <span className={`skill-gap-indicator skill-gap-indicator--${gap.severity}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {gap.severity === "high" ? <><line x1="7" y1="3" x2="7" y2="7" /><line x1="7" y1="9" x2="7" y2="11" /></> : gap.severity === "medium" ? <><circle cx="7" cy="7" r="2.5" /><line x1="7" y1="1" x2="7" y2="4" /></> : <><circle cx="7" cy="7" r="2" /></>}
                      </svg>
                    </span>
                    <span className="skill-gap-name">{gap.skill}</span>
                  </div>
                  <span className={`skill-gap-severity skill-gap-severity--${gap.severity}`}>{gap.severity}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
