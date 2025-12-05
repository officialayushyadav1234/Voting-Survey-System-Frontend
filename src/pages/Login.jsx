import { useState } from "react";
import styles from "./login.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ id: "", voterId: "", password: "" });
    const [isAdmin, setIsAdmin] = useState(false);
    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleCheckboxChange = () => {
        setIsAdmin((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginData = isAdmin 
                ? { id: formData.id, password: formData.password } 
                : { voterId: formData.voterId, password: formData.password };
            
            const endpoint = isAdmin 
                ? "http://localhost:8090/api/admin/auth" 
                : "http://localhost:8090/api/user/login";
            
            const response = await axios.post(endpoint, loginData);
            
            if (response.data === true) {
                toast.success("Login successful!");
                if (isAdmin) {
                    sessionStorage.setItem("id", formData.id);
                    navigate("/adminDashbord");
                } else {
                    sessionStorage.setItem("voterId", formData.voterId);
                    navigate("/profile");
                }
            } else {
                toast.error("Invalid ID or Password");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    {isAdmin ? (
                        <div className={styles.inputGroup}>
                            <label htmlFor="id">Admin ID</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                placeholder="Enter Admin ID"
                                value={formData.id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ) : (
                        <div className={styles.inputGroup}>
                            <label htmlFor="voterId">Voter ID</label>
                            <input
                                type="text"
                                id="voterId"
                                name="voterId"
                                placeholder="Enter your Voter ID"
                                value={formData.voterId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="checkbox"
                            id="adminCheck"
                            name="adminCheck"
                            checked={isAdmin}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="adminCheck">Login as Admin</label>
                    </div>
                    <button type="submit" className="g-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;