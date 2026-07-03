import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios"; // adjust import path if you have a configured axios instance
import "./header.scss";

// ...existing icon components (MenuIcon, CloseIcon, ChevronRightIcon)...

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  // ...existing scroll-lock and hide-on-scroll useEffects stay unchanged...

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setProfileOpen(false);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err.message);
      // even if the API call fails, clear the client-side state and redirect
      // so the user isn't stuck — the cookie is httpOnly so if it truly failed
      // to clear server-side, the next protected request will just re-trigger login
    } finally {
      setLoggingOut(false);
      setShowLogoutConfirm(false);
      navigate("/login");
    }
  };

  return (
    <header className={`app-header ${hidden ? "is-hidden" : ""}`}>
      <div className="app-header__inner">
        <Link to="/" className="app-header__logo">
          <span className="app-header__logo-mark">R</span>
          <span className="app-header__logo-text">ResumeIQ</span>
        </Link>

        <nav className="app-header__nav">
          <Link to="/" className="active">Dashboard</Link>
          <Link to="/about">About</Link>
          <Link to="/?scroll=reports">Recent Interview Reports</Link>
        </nav>

        <div className="app-header__actions">
          <Link to="/pricing" className="app-header__upgrade">Upgrade Pro</Link>

          <div className="app-header__profile-wrap" ref={profileRef}>
            <button
              className="app-header__avatar app-header__avatar--button"
              onClick={() => setProfileOpen((p) => !p)}
              aria-label="Account menu"
            >
              <UserIcon />
            </button>

            {profileOpen && (
              <div className="app-header__profile-dropdown">
                <button
                  className="app-header__profile-dropdown-item"
                  onClick={handleLogoutClick}
                >
                  <LogOutIcon />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className="app-header__hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`app-drawer-overlay ${menuOpen ? "is-open" : ""}`}
        onClick={closeMenu}
      />

      <aside className={`app-drawer ${menuOpen ? "is-open" : ""}`}>
        <div className="app-drawer__header">
          <div className="app-header__logo">
            <span className="app-header__logo-mark">R</span>
            <span className="app-header__logo-text">ResumeIQ</span>
          </div>
          <button className="app-drawer__close" onClick={closeMenu} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>

        <nav className="app-drawer__nav">
          <Link to="/" className="active" onClick={closeMenu}>
            <span>Dashboard</span>
            <ChevronRightIcon />
          </Link>
          <Link to="/about" onClick={closeMenu}>
            <span>About</span>
            <ChevronRightIcon />
          </Link>
          <Link to="/?scroll=reports" onClick={closeMenu}>
            <span>Recent Interview Reports</span>
            <ChevronRightIcon />
          </Link>
        </nav>

        <div className="app-drawer__spacer" />

        <div className="app-drawer__footer">
          <Link to="/pricing" className="app-header__upgrade app-drawer__upgrade" onClick={closeMenu}>
            Upgrade Pro
          </Link>
          <div className="app-drawer__profile">
            <div className="app-header__avatar">
              <UserIcon />
            </div>
            <div className="app-drawer__profile-text">
              <span className="app-drawer__profile-name">My Account</span>
              <button
                className="app-drawer__profile-sub app-drawer__logout-link"
                onClick={() => {
                  closeMenu();
                  handleLogoutClick();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* LOGOUT CONFIRM MODAL */}
      {showLogoutConfirm && (
        <div className="logout-modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Log out?</h3>
            <p>Are you sure you want to log out of ResumeIQ?</p>
            <div className="logout-modal__actions">
              <button
                className="logout-modal__cancel"
                onClick={() => setShowLogoutConfirm(false)}
                disabled={loggingOut}
              >
                Cancel
              </button>
              <button
                className="logout-modal__confirm"
                onClick={confirmLogout}
                disabled={loggingOut}
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;