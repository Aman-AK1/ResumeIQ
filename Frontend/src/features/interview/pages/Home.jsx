import React, { useState } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useRef } from "react";
import { useNavigate } from "react-router";


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

const Home = () => {

    const { loading, generateReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

//     const handleGenerateReport = async () => {
//         const resumeFile = resumeInputRef.current?.files?.[0];

// console.log("resumeInputRef.current:", resumeInputRef.current);
// console.log("resumeFile:", resumeFile);
//         // const resumeFile = resumeInputRef.current.files[0]
//         const data = await generateReport({ jobDescription, selfDescription, resumeFile })
//         navigate(`/interview/${data._id}`)
//     }

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

    const [contextText, setContextText] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeError, setResumeError] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const wordCount =
        contextText.trim() === "" ? 0 : contextText.trim().split(/\s+/).length;

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

    const handleRemoveResume = (e) => {
        e.preventDefault(); // stop the label from reopening the file picker
        setResumeFile(null);
        setResumeError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    if (loading) {

        return (
            <main className="loading-screen">
                <h1>Loading your report..</h1>
            </main>
        )

    }

    return (
        <div className="dashboard">

            <header className="topbar">
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
                    <button className="upgrade-btn">Upgrade Pro</button>

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
            </header>

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