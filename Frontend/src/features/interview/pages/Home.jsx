import React, { useState, useRef, useEffect } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { Link, useNavigate,useLocation} from "react-router";
import Header from "../../header/header.jsx";

const MAX_WORDS = 500;
// Rough char cap to keep people near the word limit without server-side validation.
const MAX_CHARS = MAX_WORDS * 6;

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_EXTENSIONS = [".pdf", ".docx"];

const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";
    const units = ["B", "KB", "MB"];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
};

// NOTE: I don't have the shape useInterview() returns for `reports`, so these
// helpers guess at field names and fall back gracefully instead of crashing.
// `_id` and `jobDescription` match the payload you already send to
// generateReport, so those are likely right — `createdAt` / score field names
// are assumptions. Adjust the ?? fallbacks below if your API uses different keys.

const getReportTitle = (jobDescription) => {
    if (!jobDescription) return "Untitled Role";
    const firstLine = jobDescription.split("\n")[0].trim();
    if (!firstLine) return "Untitled Role";
    return firstLine.length > 60 ? `${firstLine.slice(0, 57)}...` : firstLine;
};

const formatReportDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getScoreTier = (score) => {
    if (score >= 80) return "high";
    if (score >= 50) return "medium";
    return "low";
};

const Home = () => {

    const { loading, generateReport, reports, deleteReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const [contextText, setContextText] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeError, setResumeError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [deleteReportId, setDeleteReportId] = useState(null);

    const wordCount =
        contextText.trim() === "" ? 0 : contextText.trim().split(/\s+/).length;

    const handleGenerateReport = async () => {
        if (!resumeFile) {
            alert("Please upload a resume.");
            return;
        }

        const data = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile,
        });

        if (data) {
            navigate(`/interview/${data._id}`);
        }
    }

    const acceptFile = (file) => {
        if (!file) return;

        const hasValidExtension = ACCEPTED_EXTENSIONS.some((ext) =>
            file.name.toLowerCase().endsWith(ext)
        );

        if (!hasValidExtension) {
            setResumeFile(null);
            setResumeError("Please upload a PDF or DOCX file.");
            return;
        }

        if (file.size > MAX_RESUME_BYTES) {
            setResumeFile(null);
            setResumeError("File is too large — the limit is 5MB.");
            return;
        }

        setResumeError("");
        setResumeFile(file);
    };

    const handleFileInputChange = (e) => {
        acceptFile(e.target.files && e.target.files[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        acceptFile(e.dataTransfer.files && e.dataTransfer.files[0]);
    };



    const handleDeleteReport = async (id) => {
    try {
        await deleteReport(id);
    } catch (err) {
        console.error(err);
    }
};

    const handleRemoveResume = (e) => {
        e.preventDefault(); // stop the label from reopening the file picker
        setResumeFile(null);
        setResumeError("");
        if (resumeInputRef.current) resumeInputRef.current.value = "";
    };

    const [showAllReports, setShowAllReports] = useState(false);
    const allReports = reports || [];
    const visibleReports = showAllReports ? allReports : allReports.slice(0, 3);


    const location = useLocation();

useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("scroll") === "reports") {
        document
            .getElementById("recent-reports")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    }
}, [location]);

    // if (loading) {

    //     return (
    //         <main className="loading-screen">
    //             <h1>Loading your report..</h1>
    //         </main>
    //     )

    // }

     if (loading) {
        return (<main className="auth-page"><h1>Loading...</h1></main>)
    }

//     if (loading) {
//     return (
//         <main className="loading-screen">
//             <div className="loading-container">

//                 <div className="loading-spinner"></div>

//                 <h2>Loading Your Interview Report</h2>

//                 <p>
//                     Please wait while we fetch your interview report and prepare
//                     everything for you.
//                 </p>

//                 <div className="loading-progress">
//                     <div className="loading-progress-bar"></div>
//                 </div>

//             </div>
//         </main>
//     );
// }

    return (
        <div className="dashboard">

            {/* <header className="topbar">
                <div className="logo">
                    <div className="logo-icon">R</div>
                    <span>ResumeIQ</span>
                </div>

                <nav className="nav-links">
                    <a href="#" className="active">Dashboard</a>
                    <a href="#">Jobs</a>
                    <a href="#">Resume Builder</a>
                    <a href="#">Applications</a>
                </nav>

                <div className="topbar-actions">
                    <Link to="/pricing" className="upgrade-btn">Upgrade Pro</Link>

                    <button className="icon-btn" aria-label="Notifications" type="button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M18 8a6 6 0 1 0-12 0c0 3.3-.9 4.9-2 6.5h16c-1.1-1.6-2-3.2-2-6.5Z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button className="icon-btn" aria-label="Settings" type="button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 13a8 8 0 0 0 0-2l1.9-1.5-1.9-3.4-2.3.6a8 8 0 0 0-1.7-1L15 3.5h-6l-.4 2.2a8 8 0 0 0-1.7 1l-2.3-.6L2.7 9.5 4.6 11a8 8 0 0 0 0 2l-1.9 1.5 1.9 3.4 2.3-.6a8 8 0 0 0 1.7 1l.4 2.2h6l.4-2.2a8 8 0 0 0 1.7-1l2.3.6 1.9-3.4-1.9-1.5Z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <div className="avatar" aria-label="Account">JS</div>
                </div>
            </header> */}

            <Header/>

            <main className="home">

                <section className="jd-section">
                    <div className="section-header">
                        <div className="section-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
                                <path d="M14 3v4h4M9 12h6M9 16h6" strokeLinecap="round" />
                            </svg>
                        </div>

                        <div>
                            <h2>Job Description</h2>
                            <p>
                                Paste the complete job description to analyze candidate fit.
                            </p>
                        </div>
                    </div>

                    <textarea
                        onChange={(e) => { setJobDescription(e.target.value) }}
                        placeholder="Paste the job description here..."
                    />
                </section>

                <aside className="sidebar">

                    <div className="panel">
                        <div className="panel-head">
                            <h3>Resume</h3>
                            <span className="tag tag--required">Required</span>
                        </div>

                        <label
                            htmlFor="resume"
                            className={[
                                "upload-box",
                                resumeFile ? "upload-box--filled" : "",
                                isDragging ? "upload-box--dragging" : "",
                                resumeError ? "upload-box--error" : "",
                            ].join(" ").trim()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                        >
                            {resumeFile ? (
                                <>
                                    <div className="upload-icon upload-icon--success">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                    <span className="upload-filename">{resumeFile.name}</span>

                                    <small>{formatBytes(resumeFile.size)} · ready to analyze</small>

                                    <button type="button" className="upload-remove" onClick={handleRemoveResume}>
                                        Remove file
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="upload-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                            <path d="M7 17.5a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 8a4.5 4.5 0 0 1 1.2 8.85" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 11v7m0-7 2.5 2.5M12 11l-2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>

                                    <span>Click to upload or drag &amp; drop</span>

                                    <small>PDF, DOCX up to 5MB</small>
                                </>
                            )}

                            <input
                                type="file"
                                id="resume"
                                accept=".pdf,.docx"
                                ref={resumeInputRef}
                                onChange={handleFileInputChange}
                            />
                        </label>

                        {resumeError && <p className="upload-error">{resumeError}</p>}
                    </div>

                    <div className="panel">
                        <div className="panel-head">
                            <h3>Candidate Context</h3>
                            <span className="tag tag--optional">Optional</span>
                        </div>

                        <p className="panel-hint">
                            Briefly describe your relevant experience for this role
                        </p>

                        <textarea
                            placeholder="Tell us about your skills..."
                            value={contextText}
                            maxLength={MAX_CHARS}
                            onChange={(e) => {
                                setContextText(e.target.value);
                                setSelfDescription(e.target.value);
                            }}
                        />

                        <div className="word-count">
                            {wordCount} / {MAX_WORDS} words
                        </div>
                    </div>

                    <button
                        onClick={handleGenerateReport}
                        className="generate-btn" type="button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M4 19V5m0 14h16M8 19v-6m4 6V9m4 10v-4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Generate Report
                    </button>

                    <p className="generate-hint">
                        Our AI will analyze your resume against the job description to provide a
                        personalized compatibility score and optimization tips.
                    </p>

                </aside>

            </main>
            <>
            
    
            <div id="recent-reports" className="recent-interview-reports">
                <div className="reports-header">
                    <h2>Recent Interview Reports</h2>
                    {allReports.length > 3 && (
                        <button
                            type="button"
                            className="view-all-link"
                            onClick={() => setShowAllReports((prev) => !prev)}
                        >
                            {showAllReports ? "Show less" : "View all"}
                        </button>
                    )}
                </div>

                {visibleReports.length === 0 ? (
                    <p className="reports-empty">
                        No reports yet — generate your first match report above to see it here.
                    </p>
                ) : (
                    <div className="reports-grid">
                        {visibleReports.map((report) => {
                            const score = report.score ?? report.matchScore ?? 0;
                            const tier = getScoreTier(score);

                            return (
                                <article key={report._id} className="report-card">
                                    <div className="report-card-head">

                                        <div className="report-icon">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path
                                                    d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M14 3v4h4M9 13.5l1.8 1.8L15 11"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>

                                        <div className="report-actions">

                                            <span className={`score-badge score-badge--${tier}`}>
                                                {score}% Match
                                            </span>

                                            <button
                                                className="delete-report-btn"
                                                onClick={() => setDeleteReportId(report._id)}
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M3 6h18" />
                                                    <path d="M8 6V4h8v2" />
                                                    <path d="M19 6l-1 14H6L5 6" />
                                                    <path d="M10 11v6" />
                                                    <path d="M14 11v6" />
                                                </svg>
                                            </button>

                                        </div>

                                    </div>

                                    <div className="report-card-body">
                                        <h3>{report.jobTitle || getReportTitle(report.jobDescription)}</h3>
                                    </div>

                                    <div className="report-card-footer">
                                        <span className="report-date">{formatReportDate(report.createdAt)}</span>
                                        <Link to={`/interview/${report._id}`} className="report-link">View Report →</Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
             {deleteReportId && (
            <div className="delete-modal-backdrop">
                <div className="delete-modal">

                    <h3>Delete Report?</h3>

                    <p>
                        Are you sure you want to delete this interview report?
                        This action cannot be undone.
                    </p>

                    <div className="delete-modal-actions">

                        <button
                            className="cancel-btn"
                            onClick={() => setDeleteReportId(null)}
                        >
                            Cancel
                        </button>

                        <button
                            className="confirm-delete-btn"
                            onClick={() => {
                                handleDeleteReport(deleteReportId);
                                setDeleteReportId(null);
                            }}
                        >
                            Delete
                        </button>

                    </div>

                </div>
            </div>
        )}
            </>

            <footer className="site-footer">
                <div className="footer-left">
                    <div className="footer-brand">ResumeIQ</div>
                    <p className="footer-copy">© 2026 ResumeIQ Inc. All rights reserved.</p>
                </div>

                <nav className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Help Center</a>
                    <a href="#">Contact Us</a>
                </nav>
            </footer>
            

        </div>
    );
};

export default Home;