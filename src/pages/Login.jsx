import { useState } from "react";
import styles from "./login.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    id: "",
    voterId: "",
    password: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Toggle between Admin and Voter modes
  const toggleMode = (mode) => {
    setIsAdmin(mode === "admin");
    setFormData({ id: "", voterId: "", password: "" }); // Clear form on switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginData = isAdmin
        ? { id: formData.id, password: formData.password }
        : { voterId: formData.voterId, password: formData.password };

      const endpoint = isAdmin
        ? "http://localhost:8090/api/admin/auth"
        : "http://localhost:8090/api/user/login";

      const response = await axios.post(endpoint, loginData);

      if (response.data === true) {
        toast.success(`Welcome back, ${isAdmin ? "Admin" : "Voter"}!`);
        
        // Small delay to let the toast show before navigating
        setTimeout(() => {
            if (isAdmin) {
              sessionStorage.setItem("id", formData.id);
              navigate("/adminDashbord");
            } else {
              sessionStorage.setItem("voterId", formData.voterId);
              navigate("/profile");
            }
        }, 800);
      } else {
        toast.error("Invalid credentials provided.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Server error. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster position="top-center" />
      
      {/* Background Decor Shapes */}
      <div className={styles.shapeOne}></div>
      <div className={styles.shapeTwo}></div>

      <motion.div 
        className={styles.glassCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Enter your credentials to access the voting portal.</p>
        </div>

        {/* Custom Tab Switcher */}
        <div className={styles.tabContainer}>
          <button
            type="button"
            className={`${styles.tabBtn} ${!isAdmin ? styles.activeTab : ""}`}
            onClick={() => toggleMode("voter")}
          >
            Voter
          </button>
          <button
            type="button"
            className={`${styles.tabBtn} ${isAdmin ? styles.activeTab : ""}`}
            onClick={() => toggleMode("admin")}
          >
            Admin
          </button>
          {/* Animated Slider Background */}
          <div className={`${styles.slider} ${isAdmin ? styles.sliderRight : styles.sliderLeft}`}></div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isAdmin ? (
            <div className={styles.inputGroup}>
              <label htmlFor="id">Admin ID</label>
              <div className={styles.inputWrapper}>
                <span className={styles.icon}>🛡️</span>
                <input
                  type="text"
                  id="id"
                  name="id"
                  placeholder="Enter Admin ID"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
            </div>
          ) : (
            <div className={styles.inputGroup}>
              <label htmlFor="voterId">Voter ID</label>
              <div className={styles.inputWrapper}>
                <span className={styles.icon}>🆔</span>
                <input
                  type="text"
                  id="voterId"
                  name="voterId"
                  placeholder="ex. V-123456"
                  value={formData.voterId}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <span className={styles.icon}>🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn} 
            disabled={isLoading}
          >
            {isLoading ? <span className={styles.loader}></span> : "Sign In"}
          </button>
        </form>

        <div className={styles.footerLinks}>
          <p>Don't have an account? <Link to="/register" className={styles.link}>Sign Up</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;