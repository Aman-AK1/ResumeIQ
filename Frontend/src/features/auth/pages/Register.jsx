import React, { useState } from 'react'
import "../auth.form.scss";
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import RegisterImage from "../../../assets/images/RegisterImage.svg";

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [agreed, setAgreed] = useState(false)
    const [formError, setFormError] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]/\\;']/.test(password);

        if (password.length < 8 || !hasSpecialChar) {
            setFormError("Password must be at least 8 characters and include one special character.");
            return;
        }

        if (!agreed) {
            setFormError("Please agree to the Terms of Service and Privacy Policy to continue.");
            return;
        }

        setFormError("");
        await handleRegister({ username, email, password })
        window.location.href = '/'
    }

    if (loading) {
        return (<main className="auth-page"><h1>Loading....</h1></main>)
    }

    return (
        <main className="auth-page">
            <div className="auth-body">

                <div className="auth-panel auth-panel--form">
                    <div className="auth-topbar">
                        <div className="logo">
                            <div className="logo-icon">R</div>
                            <span>ResumeIQ</span>
                        </div>

                        <div className="mobile-auth-image">
    <img src={RegisterImage} alt="Resume Analysis" />
</div>
                    </div>

                    <div className="auth-form-wrap">
                        <div className="form-container">
                            <h1>Create Your Account</h1>
                            <p className="form-subtitle">
                                Start matching your resume to roles with AI-powered insights.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        onChange={(e) => { setUsername(e.target.value) }}
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="e.g. jdoe_dev"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Create a password"
                                        required
                                    />
                                    <small className="field-hint">
                                        Must be at least 8 characters with one special character.
                                    </small>
                                </div>

                                {/* Plain div, not a <label> — nesting links inside a checkbox's
                                    <label> makes clicking the link also toggle the checkbox. */}
                                <div className="checkbox-row">
                                    <input
                                        type="checkbox"
                                        id="agree"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                        aria-label="I agree to the Terms of Service and Privacy Policy"
                                    />
                                    <span>
                                        I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                                    </span>
                                </div>

                                {formError && <p className="form-error">{formError}</p>}

                                <button className="button primary-button" type="submit">
                                    Join Now
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14m-6-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                <div className="auth-footer">
                                    Already a member? <Link to="/login">Sign in</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="auth-panel auth-panel--visual">
                    <div className="auth-illustration">
                        <img
                            src={RegisterImage}
                            alt="Resume Analysis"
                            className="hero-image"
                        />
                    </div>

                    <div className="auth-callout">
                        <h3>Accelerate Your Career</h3>
                        <p>Join thousands of professionals optimizing their job search with AI-powered insights.</p>
                    </div>
                </div>

            </div>

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
        </main>
    )
}

export default Register