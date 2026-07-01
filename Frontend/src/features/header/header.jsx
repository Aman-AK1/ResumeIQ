import { Link } from "react-router";
import "./Header.scss";

const Header = () => {
    return (
        <header className="topbar">

            <div className="logo">
                <div className="logo-icon">R</div>
                <span>ResumeIQ</span>
            </div>

            <nav className="nav-links">
                <Link to="/" className="">
                    Dashboard
                </Link>

                <Link to="#">
                    About
                </Link>

                <Link to="/?scroll=reports">
    Recent Interview Reports
</Link>
            </nav>

            <div className="topbar-actions">
                <Link to="/pricing" className="upgrade-btn">
                    Upgrade Pro
                </Link>

                <div className="avatar">
                    AK
                </div>
            </div>

        </header>
    );
};

export default Header;