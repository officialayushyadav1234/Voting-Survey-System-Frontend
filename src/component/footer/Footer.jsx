import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart, faCode } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Wave SVG Divider for smooth transition */}
      <div className={styles.waveDivider}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={styles.shapeFill}
          ></path>
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Brand & Description */}
          <div className={styles.brandColumn}>
            <div className={styles.logoGroup}>
              <span className={styles.logoIcon}>🗳️</span>
              <h3 className={styles.brandTitle}>Voting Survey</h3>
            </div>
            <p className={styles.brandDesc}>
              Empowering communities with a transparent, real-time voting
              platform. Built for speed, security, and ease of use.
            </p>
            <div className={styles.socialRow}>
              <a
                href="https://github.com/officialayushyadav1234"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-yadav-m7753"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://x.com/ayushydv_5451"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.linkColumn}>
            <h4 className={styles.colTitle}>Platform</h4>
            <ul className={styles.linkList}>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Support</Link>
              </li>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className={styles.linkColumn}>
            <h4 className={styles.colTitle}>Tech Stack</h4>
            <ul className={styles.techList}>
              <li>
                <span className={styles.techDot}></span>React.js
              </li>
              <li>
                <span className={styles.techDot}></span>Vite
              </li>
              <li>
                <span className={styles.techDot}></span>Tailwind CSS
              </li>
              <li>
                <span className={styles.techDot}></span>Axios
              </li>
            </ul>
          </div>

          {/* Developer Badge */}
          <div className={styles.devColumn}>
            <div className={styles.devCard}>
              <h4 className={styles.colTitle}>Developer</h4>
              <p className={styles.devName}>Ayush Yadav</p>
              <a
                href="https://github.com/officialayushyadav1234/Voting-Survey-System-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoBtn}
              >
                <FontAwesomeIcon icon={faCode} className={styles.btnIcon} />
                View Source Code
              </a>
            </div>
          </div>
        </div>

        <div className={styles.separator}></div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {currentYear} Voting Survey System. Released under MIT License.
          </p>
          <div className={styles.madeWith}>
            <span>Made with</span>
            <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
            <span>in React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;