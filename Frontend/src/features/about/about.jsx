import Header from "../header/header";
import "./about.scss";
import { Link } from "react-router";

import amanImage from "../../assets/images/aman.jpeg";

export default function About() {
    return (
        <div className="about has-fixed-header">
            <Header />

            <main className="about-page ">

                <div className="about-container">

                    {/* =======================================
                        HERO
                    ======================================= */}

                    <section className="about-hero">

                        <div className="hero-content">

                            <span className="eyebrow">
                                ABOUT INTERVIEWAI
                            </span>

                            <h1>
                                Helping candidates prepare
                                <br />
                                smarter for every interview.
                            </h1>

                            <p>
                                InterviewAI is an AI-powered interview preparation
                                platform that creates personalized interview
                                experiences using your resume, your skills and the
                                job description you're applying for.
                            </p>

                            <div className="hero-actions">

                                <Link
                                    to="/"
                                    className="primary-btn"
                                >
                                    Start Interview
                                </Link>

                                <Link
                                    to="/pricing"
                                    className="secondary-btn"
                                >
                                    View Pricing
                                </Link>

                            </div>

                        </div>

                        {/* Product Preview */}

                        <div className="product-preview">

                            <div className="preview-window">

                                <div className="window-top">

                                    <div className="dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>

                                    <p>
                                        Interview Session
                                    </p>

                                </div>

                                <div className="preview-body">

                                    <div className="preview-card success">

                                        <div>

                                            <h4>
                                                Resume.pdf
                                            </h4>

                                            <small>
                                                Uploaded Successfully
                                            </small>

                                        </div>

                                        <span>✓</span>

                                    </div>

                                    <div className="preview-card success">

                                        <div>

                                            <h4>
                                                Job Description
                                            </h4>

                                            <small>
                                                AI Parsed
                                            </small>

                                        </div>

                                        <span>✓</span>

                                    </div>

                                    <div className="preview-card processing">

                                        <div>

                                            <h4>
                                                AI Interview Engine
                                            </h4>

                                            <small>
                                                Generating Questions...
                                            </small>

                                        </div>

                                    </div>

                                    <div className="progress">

                                        <div className="progress-fill"></div>

                                    </div>

                                    <div className="preview-card ready">

                                        <div>

                                            <h4>
                                                Interview Ready
                                            </h4>

                                            <small>
                                                Estimated Time • 18 mins
                                            </small>

                                        </div>

                                        <button>
                                            Start
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =======================================
                        QUESTION 01
                    ======================================= */}

                    <section className="question-section">

                        <div className="question-label">

                            Question 01

                        </div>

                        <div className="question-grid">

                            <div className="question-title">

                                <h2>
                                    What is
                                    <br />
                                    InterviewAI?
                                </h2>

                            </div>

                            <div className="question-content">

                                <p>
                                    InterviewAI is designed to make interview
                                    preparation personal instead of generic.
                                    Rather than asking random questions,
                                    it creates interview sessions based on
                                    your own resume and the job you're preparing for.
                                </p>

                                <p>
                                    Every interview adapts to your profile,
                                    helping you practice the questions you're
                                    actually likely to face during placements,
                                    internships or professional hiring processes.
                                </p>

                                <p>
                                    After each session, InterviewAI evaluates
                                    your responses, identifies strengths,
                                    highlights improvement areas and provides
                                    a structured report so every interview
                                    becomes a learning experience.
                                </p>

                            </div>

                        </div>

                    </section>
                    {/* =======================================
                        QUESTION 02
                    ======================================= */}

                    {/* =======================================
    QUESTION 02
======================================= */}

                    <section className="question-section feature-section">

                        <div className="question-label">
                            Question 02
                        </div>

                        <div className="question-grid">

                            <div className="question-title">

                                <h2>
                                    Why choose
                                    <br />
                                    InterviewAI?
                                </h2>

                                <p className="feature-intro">
                                    Designed to replicate real interview experiences instead of
                                    making you memorize random questions.
                                </p>

                            </div>

                            <div className="feature-showcase">

                                {/* CARD 1 */}

                                <article className="feature-card">

                                    <div className="feature-top">

                                        <div className="feature-icon">
                                            📄
                                        </div>

                                        <span className="feature-number">
                                            01
                                        </span>

                                    </div>

                                    <h3>
                                        Resume Based
                                    </h3>

                                    <p>
                                        AI understands your projects, skills and experience before
                                        generating interview questions.
                                    </p>

                                    <div className="mini-resume">

                                        <span>React</span>
                                        <span>Node.js</span>
                                        <span>MongoDB</span>

                                    </div>

                                </article>

                                {/* CARD 2 */}

                                <article className="feature-card">

                                    <div className="feature-top">

                                        <div className="feature-icon">
                                            💼
                                        </div>

                                        <span className="feature-number">
                                            02
                                        </span>

                                    </div>

                                    <h3>
                                        Job Matching
                                    </h3>

                                    <p>
                                        Every interview adapts according to the role and company
                                        you're preparing for.
                                    </p>

                                    <div className="mini-job">

                                        <div></div>
                                        <div></div>
                                        <div className="small"></div>

                                    </div>

                                </article>

                                {/* CARD 3 */}

                                <article className="feature-card">

                                    <div className="feature-top">

                                        <div className="feature-icon">
                                            🤖
                                        </div>

                                        <span className="feature-number">
                                            03
                                        </span>

                                    </div>

                                    <h3>
                                        AI Feedback
                                    </h3>

                                    <p>
                                        Get detailed analysis for communication, technical skills
                                        and confidence after every interview.
                                    </p>

                                    <div className="mini-report">

                                        <div>

                                            <span>Communication</span>

                                            <div className="bar">
                                                <div style={{ width: "88%" }}></div>
                                            </div>

                                        </div>

                                        <div>

                                            <span>Technical</span>

                                            <div className="bar">
                                                <div style={{ width: "93%" }}></div>
                                            </div>

                                        </div>

                                    </div>

                                </article>

                                {/* CARD 4 */}

                                <article className="feature-card">

                                    <div className="feature-top">

                                        <div className="feature-icon">
                                            📈
                                        </div>

                                        <span className="feature-number">
                                            04
                                        </span>

                                    </div>

                                    <h3>
                                        Progress Tracking
                                    </h3>

                                    <p>
                                        Save previous reports and monitor your interview
                                        performance over time.
                                    </p>

                                    <div className="mini-chart">

                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>

                                    </div>

                                </article>

                            </div>

                        </div>

                    </section>

                    {/* =======================================
                        QUESTION 03
                    ======================================= */}

                    {/* <section className="question-section">

                        <div className="question-label">
                            Question 03
                        </div>

                        <div className="question-grid">

                            <div className="question-title">

                                <h2>
                                    How does it
                                    <br />
                                    work?
                                </h2>

                            </div>

                            <div className="question-content">

                                <div className="workflow">

                                    <div className="workflow-box">

                                        <span>01</span>

                                        <h3>
                                            Upload Resume
                                        </h3>

                                        <p>
                                            Let InterviewAI understand your
                                            experience and technical skills.
                                        </p>

                                    </div>

                                    <div className="workflow-arrow">
                                        ↓
                                    </div>

                                    <div className="workflow-box">

                                        <span>02</span>

                                        <h3>
                                            Add Job Description
                                        </h3>

                                        <p>
                                            Match the interview to the role you're
                                            preparing for.
                                        </p>

                                    </div>

                                    <div className="workflow-arrow">
                                        ↓
                                    </div>

                                    <div className="workflow-box">

                                        <span>03</span>

                                        <h3>
                                            AI Interview
                                        </h3>

                                        <p>
                                            Answer personalized technical and HR
                                            questions.
                                        </p>

                                    </div>

                                    <div className="workflow-arrow">
                                        ↓
                                    </div>

                                    <div className="workflow-box">

                                        <span>04</span>

                                        <h3>
                                            Interview Report
                                        </h3>

                                        <p>
                                            Learn from detailed AI feedback and
                                            improve every attempt.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section> */}
                    <section className="question-section workflow-section">

                        <div className="question-label">
                            Question 03
                        </div>

                        <div className="question-grid">

                            <div className="question-title">

                                <h2>
                                    How does it
                                    <br />
                                    work?
                                </h2>

                                <p className="workflow-intro">
                                    InterviewAI simplifies interview preparation into four
                                    intelligent steps—from understanding your profile to
                                    delivering personalized feedback.
                                </p>

                            </div>

                            <div className="workflow-wrapper">

                                <div className="workflow-line"></div>

                                <div className="workflow-step">

                                    <div className="step-number">
                                        01
                                    </div>

                                    <div className="step-icon">
                                        📄
                                    </div>

                                    <h3>Upload Resume</h3>

                                    <p>
                                        Upload your latest resume so InterviewAI can understand
                                        your skills, projects and experience.
                                    </p>

                                </div>

                                <div className="workflow-step">

                                    <div className="step-number">
                                        02
                                    </div>

                                    <div className="step-icon">
                                        💼
                                    </div>

                                    <h3>Job Description</h3>

                                    <p>
                                        Paste the job description to personalize interview
                                        questions for your target role.
                                    </p>

                                </div>

                                <div className="workflow-step">

                                    <div className="step-number">
                                        03
                                    </div>

                                    <div className="step-icon">
                                        🤖
                                    </div>

                                    <h3>AI Interview</h3>

                                    <p>
                                        Answer intelligent technical and HR questions generated
                                        specifically for you.
                                    </p>

                                </div>

                                <div className="workflow-step">

                                    <div className="step-number">
                                        04
                                    </div>

                                    <div className="step-icon">
                                        📊
                                    </div>

                                    <h3>Interview Report</h3>

                                    <p>
                                        Receive a comprehensive AI report with scores,
                                        strengths and personalized improvements.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =======================================
                        QUESTION 04
                    ======================================= */}

                    <section className="question-section">

                        <div className="question-label">
                            Question 04
                        </div>

                        <div className="developer-layout">

                            <div className="developer-photo">

                                <img
                                    src={amanImage}
                                    alt="Aman Khan"
                                />

                            </div>

                            <div className="developer-info">

                                <h2>
                                    Who built InterviewAI?
                                </h2>

                                <p>
                                    Hi, I'm <strong>Aman Khan</strong>, a
                                    Computer Engineering graduate and Full Stack
                                    Developer passionate about building products
                                    that combine thoughtful design with modern AI.
                                </p>

                                <p>
                                    InterviewAI started during placement
                                    preparation. I realized that most candidates
                                    spend hours practicing random interview
                                    questions that rarely match the companies
                                    they're actually applying to.
                                </p>

                                <p>
                                    Instead of another question bank, I wanted to
                                    build a platform that understands your resume,
                                    reads the job description and creates a truly
                                    personalized interview experience.
                                </p>

                                <p>
                                    Every screen of InterviewAI has been designed
                                    and developed with one goal in mind:
                                    helping candidates become more confident
                                    before their next interview.
                                </p>

                                <div className="tech-stack">

                                    <span>React</span>
                                    <span>Node.js</span>
                                    <span>Express</span>
                                    <span>MongoDB</span>
                                    <span>Gemini AI</span>
                                    <span>UI / UX</span>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =======================================
                        QUESTION 05
                    ======================================= */}

                    {/* <section className="question-section">

                        <div className="question-label">
                            Final Question
                        </div>

                        <div className="question-grid">

                            <div className="question-title">

                                <h2>
                                    What's
                                    <br />
                                    next?
                                </h2>

                            </div>

                            <div className="question-content">

                                <div className="roadmap">

                                    <div className="roadmap-grid">

                                        <article className="roadmap-card">

                                            <div className="roadmap-icon">
                                                🎙️
                                            </div>

                                            <h3>
                                                Voice Interviews
                                            </h3>

                                            <p>
                                                Practice real conversations with AI instead
                                                of typing responses.
                                            </p>

                                            <span className="roadmap-status">
                                                Coming Soon
                                            </span>

                                        </article>

                                    </div>

                                    <div className="roadmap-grid">

                                        <article className="roadmap-card">

                                            <div className="roadmap-icon">
                                                📄
                                            </div>

                                            <h3>
                                                ATS Resume Analysis
                                            </h3>

                                            <p>
                                                Receive recruiter-style
                                                resume feedback.
                                            </p>

                                            <span className="roadmap-status">
                                                Planned
                                            </span>

                                        </article>

                                    </div>

                                    <div className="roadmap-grid">

                                        <article className="roadmap-card">

                                            <div className="roadmap-icon">
                                                🏢
                                            </div>

                                            <h3>
                                                Company Specific Interviews
                                            </h3>

                                            <p>
                                                Prepare for Google,
                                                Amazon, Microsoft,
                                                TCS and more.

                                            </p>

                                            <span className="roadmap-status">
                                                Coming Soon
                                            </span>

                                        </article>

                                    </div>

                                    <div className="roadmap-grid">

                                        <article className="roadmap-card">

                                            <div className="roadmap-icon">
                                                🤖
                                            </div>

                                            <h3>
                                                AI Career Coach
                                            </h3>

                                            <p>
                                                Personalized preparation
plans and guidance.
                                            </p>

                                            <span className="roadmap-status">
                                                Research
                                            </span>

                                        </article>

                                    </div>

                                    <div className="roadmap-grid">

                                        <article className="roadmap-card">

                                            <div className="roadmap-icon">
                                                📊
                                            </div>

                                            <h3>
                                                Performance Analytics
                                            </h3>

                                            <p>
                                                Visualize progress across
                                                multiple interviews.
                                            </p>

                                            <span className="roadmap-status">
                                                In Progress
                                            </span>

                                        </article>

                                    </div>

                                    <div className="roadmap-grid">

                                        <article className="roadmap-card">

                                            <div className="roadmap-icon">
                                                📊
                                            </div>

                                            <h3>
                                                Performance Analytics
                                            </h3>

                                            <p>
                                                Visualize progress across
                                                multiple interviews.
                                            </p>

                                            <span className="roadmap-status">
                                                In Progress
                                            </span>

                                        </article>

                                    </div>

                                    

                                </div>

                            </div>

                        </div>

                    </section> */}
                    {/* =======================================
    QUESTION 05
======================================= */}

                    <section className="question-section roadmap-section">

                        <div className="question-label">
                            Final Question
                        </div>

                        <div className="question-grid">

                            <div className="question-title">

                                <h2>
                                    What's
                                    <br />
                                    next?
                                </h2>

                                <p className="roadmap-intro">
                                    InterviewAI is continuously evolving. Here's what I'm currently
                                    building to make interview preparation even more personalized
                                    and effective.
                                </p>

                            </div>

                            <div className="question-content">

                                <div className="roadmap-grid">

                                    <article className="roadmap-card">

                                        <div className="roadmap-icon">🎙️</div>

                                        <h3>Voice Mock Interviews</h3>

                                        <p>
                                            Practice spoken interviews with AI for a realistic
                                            interview experience.
                                        </p>

                                        <span className="status coming">
                                            Coming Soon
                                        </span>

                                    </article>

                                    {/* <article className="roadmap-card">

                    <div className="roadmap-icon">📄</div>

                    <h3>ATS Resume Checker</h3>

                    <p>
                        Analyze resumes using recruiter-style ATS scoring and
                        improvement suggestions.
                    </p>

                    <span className="status progress">
                        In Progress
                    </span>

                </article> */}

                                    <article className="roadmap-card">

                                        <div>

                                            <div className="roadmap-icon">📄</div>

                                            <h3>ATS Resume Checker</h3>

                                            <p>
                                                Analyze resumes using recruiter-style ATS scoring and
                                                improvement suggestions.
                                            </p>

                                        </div>

                                        <span className="status prog">
                                            In Progress
                                        </span>

                                    </article>

                                    <article className="roadmap-card">

                                        <div className="roadmap-icon">🏢</div>

                                        <h3>Company Specific Interviews</h3>

                                        <p>
                                            Generate interviews for Google, Amazon, Microsoft, TCS
                                            and many more companies.
                                        </p>

                                        <span className="status coming">
                                            Coming Soon
                                        </span>

                                    </article>

                                    <article className="roadmap-card">

                                        <div className="roadmap-icon">📊</div>

                                        <h3>Performance Analytics</h3>

                                        <p>
                                            Visualize your growth across multiple interview sessions
                                            with detailed insights.
                                        </p>

                                        <span className="status planned">
                                            Planned
                                        </span>

                                    </article>

                                    <article className="roadmap-card">

                                        <div className="roadmap-icon">🤖</div>

                                        <h3>AI Career Coach</h3>

                                        <p>
                                            Receive personalized interview strategies, career advice
                                            and preparation plans.
                                        </p>

                                        <span className="status research">
                                            Research
                                        </span>

                                    </article>

                                    <article className="roadmap-card">

                                        <div className="roadmap-icon">🎯</div>

                                        <h3>Learning Paths</h3>

                                        <p>
                                            Practice topics based on your weaknesses and previous
                                            interview reports.
                                        </p>

                                        <span className="status coming">
                                            Coming Soon
                                        </span>

                                    </article>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =======================================
                        CTA
                    ======================================= */}

                    <section className="about-cta">

                        <h2>
                            Ready for your next interview?
                        </h2>

                        <p>
                            Start practicing today with AI-generated interview
                            sessions tailored to your resume and dream job.
                        </p>

                        <Link
                            to="/"
                            className="primary-btn"
                        >
                            Start Interview
                        </Link>

                    </section>

                </div>

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

}