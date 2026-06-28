import React, { useState } from 'react'
import "../auth.form.scss";
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router'
import authImage from "../../../assets/images/authImage.svg";

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password, rememberMe })
        navigate('/')
    }

    if (loading) {
        return (<main className="auth-page"><h1>Loading...</h1></main>)
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
                    </div>

                    <div className="auth-form-wrap">
                        <div className="form-container">
                            <h1>Welcome Back</h1>
                            <p className="form-subtitle">
                                Enter your credentials to access your dashboard.
                            </p>

                            <form onSubmit={handleSubmit}>
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
                                    <div className="label-row">
                                        <label htmlFor="password">Password</label>
                                        <a href="#" className="forgot-link">Forgot password?</a>
                                    </div>
                                    <input
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>

                                <label className="checkbox-row">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    Remember me for 30 days
                                </label>

                                <button className="button primary-button" type="submit">
                                    Sign In
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14m-6-7 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                <div className="auth-footer">
                                    New to ResumeIQ? <Link to="/register">Join now</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="auth-panel auth-panel--visual">
                    <div className="auth-illustration">
                        <img
    src={authImage}
    alt="Resume Analysis"
    className="hero-image"
/>
                    </div>

                    <p className="auth-caption">Accelerate Your Path</p>
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

export default Login