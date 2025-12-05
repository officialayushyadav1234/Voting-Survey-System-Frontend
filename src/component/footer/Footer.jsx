import styles from "./footer.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                
                {/* Left Section - Project Details */}
                <div className={styles.section}>
                    <h3>Voting Survey React Frontend</h3>
                    <p>
                        A user-friendly voting survey application built with <strong>React.js</strong> and <strong>Vite</strong>. 
                        This platform enables users to participate in surveys, cast votes, and view real-time results with ease.
                    </p>
                    <p>👨‍💻 <strong>Developed by: Ayush Yadav</strong></p>
                    
                    <div className={styles.socialIcons}>
                        <a 
                            href="https://github.com/officialayushyadav1234" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faGithub} className={styles.icon} /> GitHub
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/ayush-yadav-m7753" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faLinkedin} className={styles.icon} /> LinkedIn
                        </a>
                        <a 
                            href="https://x.com/ayushydv_5451" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faTwitter} className={styles.icon} /> Twitter
                        </a>
                    </div>
                </div>

                {/* Center Section - Quick Links */}
                <div className={styles.section}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/faq">FAQs</Link></li>
                        <li><Link to="/terms">Terms & Conditions</Link></li>
                        <li>
                            <a 
                                href="https://github.com/officialayushyadav1234/Voting-Survey-System-Frontend" 
                                target="_blank"
                            >
                                GitHub Repository
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Right Section - Technologies Used */}
                <div className={styles.section}>
                    <h3>Technologies Used</h3>
                    <ul>
                        <li>React.js</li>
                        <li>Vite</li>
                        <li>JavaScript (ES6+)</li>
                        <li>Axios</li>
                        <li>React Router DOM</li>
                        <li>Tailwind CSS</li>
                    </ul>
                </div>
            </div>

            {/* Copyright & Contact Section */}
            <div className={styles.copyright}>
                <p>© 2024 Voting Survey. All rights reserved. | MIT License</p>
                <p>
                    📧 Contact: 
                    <a href="mailto:ayushydv7753@example.com">
                        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> ayushydv7753@example.com
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;