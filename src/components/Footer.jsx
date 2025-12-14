import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h4>AI Income Hub</h4>
          <p>
            Learn how to use AI tools to earn money online, improve productivity,
            and build digital skills for the future.
          </p>
        </div>

        <div className="footer-links">
          <h5>Important Pages</h5>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link to="/disclaimer">Disclaimer</Link>
            </li>
          </ul>
        </div>

        <div className="footer-copy">
          <p>© {year} AI Income Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
