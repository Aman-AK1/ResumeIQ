import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-content">

                <p>
                    © {new Date().getFullYear()} ResumeIQ. All rights reserved.
                </p>

                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms</a>
                    <a href="#">Contact</a>
                </div>

            </div>

        </footer>
    );
};

export default Footer;