import { useState, useEffect } from "react";
import { Link } from "react-router";
import "./header.scss";

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const SCROLL_HIDE_THRESHOLD = 80; // don't hide until scrolled past this
const SCROLL_DELTA = 4; // ignore tiny scroll jitters

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  

  const closeMenu = () => setMenuOpen(false);

  // Scroll lock while drawer is open
//   useEffect(() => {
//     if (menuOpen) {
//       const scrollY = window.scrollY;
//       document.body.style.position = "fixed";
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.left = "0";
//       document.body.style.right = "0";
//       document.body.style.width = "100%";
//       document.documentElement.style.overflow = "hidden";

//       return () => {
//         document.body.style.position = "";
//         document.body.style.top = "";
//         document.body.style.left = "";
//         document.body.style.right = "";
//         document.body.style.width = "";
//         document.documentElement.style.overflow = "";
//         window.scrollTo(0, scrollY);
//       };
//     }
//   }, [menuOpen]);
useEffect(() => {
  if (menuOpen) {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";

      // Force instant scroll restore — no animation
      const prevBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = prevBehavior;
    };
  }
}, [menuOpen]);

  // Hide on scroll down, reveal on scroll up
 useEffect(() => {
  let lastY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    const currentY = window.scrollY;

    if (menuOpen) {
      lastY = currentY;
      ticking = false;
      return;
    }

    const diff = currentY - lastY;

    // Near the very top: always show
    if (currentY <= SCROLL_HIDE_THRESHOLD) {
      setHidden(false);
    }
    // Scrolling down by more than the threshold: hide
    else if (diff > SCROLL_DELTA) {
      setHidden(true);
    }
    // Scrolling up by more than the threshold: show immediately, anywhere on the page
    else if (diff < -SCROLL_DELTA) {
      setHidden(false);
    }

    lastY = currentY;
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [menuOpen]);

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
          <div className="app-header__avatar">AK</div>
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
          <button
            className="app-drawer__close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
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
            <div className="app-header__avatar">AK</div>
            <div className="app-drawer__profile-text">
              <span className="app-drawer__profile-name">My Account</span>
              <span className="app-drawer__profile-sub">Manage settings</span>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Header;