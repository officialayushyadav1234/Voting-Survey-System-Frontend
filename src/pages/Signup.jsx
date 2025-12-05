import { useState } from 'react';
import styles from './signup.module.css';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
    const [formData, setFormData] = useState({
        voterId: '',
        name: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        address: '',
        constituency: '',
        constituencyNumber: ''
    });

    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (parseInt(formData.age, 10) < 18) {
            toast.error("You must be at least 18 years old to register.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8090/api/user/register", { 
                ...formData, 
                hasVoted: false 
            });

            if (response.status === 201) {
                toast.success("Registration Successful! Redirecting...");
                setTimeout(() => navigate("/login"), 1500);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(error.response.data);
            } else {
                console.error("Registration error:", error);
                toast.error("Registration failed. Please check your details.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <Toaster position="top-right" />
            
            {/* Background Decorations */}
            <div className={styles.bgShape1}></div>
            <div className={styles.bgShape2}></div>

            <motion.div 
                className={styles.glassContainer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.header}>
                    <h1 className={styles.title}>Voter Registration</h1>
                    <p className={styles.subtitle}>Join the digital democracy platform today.</p>
                </div>

                <form className={styles.formGrid} onSubmit={handleSubmit}>
                    
                    {/* Section: Personal Info */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Personal Identity</h3>
                        
                        <div className={styles.inputGroup}>
                            <label htmlFor="voterId">Voter ID Number</label>
                            <input 
                                type="text" 
                                id="voterId" 
                                name="voterId" 
                                placeholder="ex. ABC1234567" 
                                value={formData.voterId} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Full Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                placeholder="John Doe" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="age">Age</label>
                                <input 
                                    type="number" 
                                    id="age" 
                                    name="age" 
                                    placeholder="18+" 
                                    value={formData.age} 
                                    onChange={handleChange} 
                                    required 
                                    min="18"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Gender</label>
                                <div className={styles.selectWrapper}>
                                    <select 
                                        name="gender" 
                                        value={formData.gender} 
                                        onChange={handleChange} 
                                        required
                                        className={styles.selectInput}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section: Account & Location */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Account & Location</h3>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="name@example.com" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Create Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="••••••••" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                                minLength="6"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="address">Residential Address</label>
                            <input 
                                type="text" 
                                id="address" 
                                name="address" 
                                placeholder="House No, Street, City" 
                                value={formData.address} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="constituency">Constituency</label>
                                <input 
                                    type="text" 
                                    id="constituency" 
                                    name="constituency" 
                                    placeholder="District Name" 
                                    value={formData.constituency} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="constituencyNumber">Const. No.</label>
                                <input 
                                    type="number" 
                                    id="constituencyNumber" 
                                    name="constituencyNumber" 
                                    placeholder="00" 
                                    value={formData.constituencyNumber} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? "Creating Account..." : "Complete Registration"}
                        </button>
                        <p className={styles.loginLink}>
                            Already registered? <Link to="/login">Login here</Link>
                        </p>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default Register;