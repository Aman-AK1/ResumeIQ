import Header from "../header/header";
import "./about.scss";
import { Link } from "react-router";
import amanImage from "../../assets/images/aman.jpeg";
export default function About() {
    const features = [
        {
            title: "Personalized Interviews",
            description:
                "Every interview is generated based on your resume, skills, and the job description you're targeting.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M2 12h20" />
                </svg>
            ),
        },
        {
            title: "AI-Powered Feedback",
            description:
                "Receive detailed analysis on your answers with strengths, weaknesses, confidence score, and improvement suggestions.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            ),
        },
        {
            title: "Progress Tracking",
            description:
                "Keep all your interview reports in one place and monitor your improvement over time.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M7 14l4-4 3 3 6-6" />
                </svg>
            ),
        },
        {
            title: "Real Company Preparation",
            description:
                "Practice using actual job descriptions from companies you're applying to for a realistic experience.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21h18" />
                    <path d="M5 21V7l7-4 7 4v14" />
                </svg>
            ),
        },
    ];

    const steps = [
        "Upload Your Resume",
        "Paste Job Description",
        "AI Generates Interview",
        "Receive Detailed Report",
        "Improve & Repeat",
    ];

    const stats = [
        {
            value: "100%",
            label: "AI Powered",
        },
        {
            value: "Unlimited",
            label: "Personalized Questions",
        },
        {
            value: "Instant",
            label: "Detailed Reports",
        },
        {
            value: "Realistic",
            label: "Interview Experience",
        },
    ];

    return (
        <div className="about">
            <Header/>
            <main className="about-page">

            
            <div className="about-container">
                {/* Hero */}

                <section className="hero-section">
                    <div className="hero-content">
                        <span className="hero-badge">
                            AI Interview Preparation Platform
                        </span>

                        <h1>
                            More Than Interview Practice.
                            <br />
                            <span>Build Confidence Before Every Interview.</span>
                        </h1>

                        <p>
                            InterviewAI helps students and professionals prepare
                            smarter with AI-generated interview questions,
                            personalized feedback, resume-based assessments, and
                            comprehensive performance reports tailored to every
                            opportunity.
                        </p>

                        <div className="hero-actions">
                            <Link to="/" className="primary-btn">
                                Start Practicing
                            </Link>

                            <Link to="/pricing" className="secondary-btn">
                                View Pricing
                            </Link>
                        </div>
                    </div>

                    <div className="hero-card">
                        <div className="mini-card">
                            <h3>Interview Score</h3>
                            <h2>92%</h2>
                            <span>Excellent Performance</span>
                        </div>

                        <div className="mini-card">
                            <h3>Questions Solved</h3>
                            <h2>150+</h2>
                            <span>Across Multiple Domains</span>
                        </div>

                        <div className="mini-card">
                            <h3>AI Feedback</h3>
                            <h2>Instant</h2>
                            <span>Detailed & Actionable</span>
                        </div>
                    </div>
                </section>

                {/* Who We Are */}

                <section className="about-section">
                    <div className="section-heading">
                        <h2>Who We Are</h2>
                        <p>
                            Helping candidates prepare with confidence through
                            personalized AI-powered interview experiences.
                        </p>
                    </div>

                    <div className="content-card">
                        <p>
                            InterviewAI is an intelligent interview preparation
                            platform designed to simulate real-world interview
                            experiences. Instead of practicing random questions,
                            our platform generates personalized interviews based
                            on your resume, technical skills, and the job
                            description you're targeting.
                        </p>

                        <p>
                            Whether you're preparing for your first internship,
                            campus placements, or your dream software
                            engineering role, InterviewAI helps you identify
                            knowledge gaps, improve communication, and build the
                            confidence needed to perform your best.
                        </p>
                    </div>
                </section>

                {/* Features */}

                <section className="about-section">
                    <div className="section-heading">
                        <h2>What Makes Us Different</h2>
                        <p>
                            Everything is designed to make interview preparation
                            more effective, personalized, and realistic.
                        </p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">
                                    {feature.icon}
                                </div>

                                <h3>{feature.title}</h3>

                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Timeline */}

                <section className="about-section">
                    <div className="section-heading">
                        <h2>How It Works</h2>
                        <p>
                            Preparing for interviews has never been this simple.
                        </p>
                    </div>

                    <div className="timeline">
                        {steps.map((step, index) => (
                            <div className="timeline-item" key={index}>
                                <div className="step-circle">
                                    {index + 1}
                                </div>

                                <h4>{step}</h4>

                                {index !== steps.length - 1 && (
                                    <div className="timeline-line"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission Vision */}

                <section className="about-section">
                    <div className="mission-grid">
                        <div className="mission-card">
                            <h2>Our Mission</h2>

                            <p>
                                To make interview preparation personalized,
                                accessible, and effective for every aspiring
                                professional through the power of artificial
                                intelligence.
                            </p>
                        </div>

                        <div className="mission-card">
                            <h2>Our Vision</h2>

                            <p>
                                To become the most trusted AI interview
                                companion that empowers candidates worldwide to
                                build confidence and secure better career
                                opportunities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}

                <section className="about-section">
                    <div className="stats-grid">
                        {stats.map((item, index) => (
                            <div className="stat-card" key={index}>
                                <h2>{item.value}</h2>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Developer */}

                <section className="about-section developer-section">
                    <div className="developer-card">
                       <div className="developer-avatar">
    <img src={amanImage} alt="Aman Khan" />
</div>

                        <div className="developer-content">
                            <h2>Meet the Developer</h2>

                            <p>
                                Hi, I'm <strong>Aman Khan</strong>, a Computer
                                Engineering graduate and Full Stack Developer
                                passionate about building AI-powered products
                                that solve real-world problems.
                            </p>

                            <p>
                                InterviewAI wasn't built as just another college
                                project—it was created to genuinely simplify
                                interview preparation. Every feature has been
                                thoughtfully designed to provide candidates with
                                a personalized experience that helps them learn,
                                improve, and approach interviews with greater
                                confidence.
                            </p>

                            <p>
                                From designing the user interface to developing
                                the frontend, backend, and AI workflow, every
                                aspect of this platform has been built with
                                simplicity, performance, and usability in mind.
                            </p>

                            <p>
                                As someone who has personally gone through
                                placement preparation, I understand the
                                challenges candidates face. My goal is to keep
                                improving InterviewAI with smarter AI features,
                                richer analytics, and an even better user
                                experience.
                            </p>

                            <div className="developer-tags">
                                <span>Computer Engineer</span>
                                <span>Full Stack Developer</span>
                                <span>React</span>
                                <span>Node.js</span>
                                <span>Express</span>
                                <span>MongoDB</span>
                                <span>UI/UX Designer</span>
                                <span>Hackathon Finalist</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}

                <section className="cta-section">
                    <h2>Ready to Ace Your Next Interview?</h2>

                    <p>
                        Practice smarter with AI-powered personalized interview
                        sessions and receive actionable feedback after every
                        attempt.
                    </p>

                    <Link to="/" className="primary-btn">
                        Start Your First Interview
                    </Link>
                </section>
            </div>
        </main>
        </div>
    );
}