import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { Fragment } from "react";
import toast, { Toaster } from "react-hot-toast";

function NavBar() {
    let voterId = sessionStorage.getItem("voterId");
    const id = sessionStorage.getItem("id");
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        if (id) {
            sessionStorage.removeItem("id");
            toast.success("Admin Logout Successful");
            navigate("/");
        } else {
            sessionStorage.removeItem("voterId");
            toast.success("Voter Logout Successful");
            navigate("/");
        }
    };

    // Helper to check active link for styling
    const isActive = (path) => location.pathname === path;

    return (
        <>
            <Toaster position="top-center" />
            <nav className={styles.navbar}>
                {/* Logo & Brand Section */}
                <Link to="/" className={styles.brandGroup}>
                    <div className={styles.logoWrapper}>
                        <img 
                            src="/logo.png" 
                            alt="voting survey logo" 
                            className={styles.logoImage}
                        />
                    </div>
                    <h1 className={styles.title}>Voting Survey</h1>
                </Link>

                {/* Navigation Links */}
                <ul className={styles.navLinks}>
                    <li>
                        <Link 
                            to="/" 
                            className={`${styles.link} ${isActive('/') ? styles.activeLink : ''}`}
                        >
                            Home
                        </Link>
                    </li>

                    {id || voterId ? (
                        <Fragment>
                            <li>
                                <Link 
                                    to={id ? "/adminDashbord" : "/profile"} 
                                    className={`${styles.link} ${isActive(id ? "/adminDashbord" : "/profile") ? styles.activeLink : ''}`}
                                >
                                    {id ? "Dashboard" : "My Profile"}
                                </Link>
                            </li>
                            <li>
                                <button onClick={logout} className={styles.logoutBtn}>
                                    Log Out
                                </button>
                            </li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <li>
                                <Link to="/login" className={styles.loginBtn}>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className={styles.signupBtn}>
                                    Sign Up
                                </Link>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default NavBar;