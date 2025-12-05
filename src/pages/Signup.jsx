import { useState } from 'react';
import styles from './signup.module.css';
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

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

    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Age validation: must be 18 or above
        if (parseInt(formData.age, 10) < 18) {
            toast.error("You must be at least 18 years old to register.");
            return; // Stop form submission
        }
    
        console.log(formData);
    
        axios.post("http://localhost:8090/api/user/register", { ...formData, hasVoted: false })
            .then((response) => {
                if (response.status === 201) {  // Check if registration was successful
                    toast.success("Voter registered successfully");
                    navigate("/login");
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    toast.error(error.response.data); // Display the conflict message from backend
                } else {
                    toast.error("Registration failed. Please try again.");
                }
            });
    
        setFormData({
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
    };
    
    

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Voter Registration</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="voterId" className={styles.label}>Voter ID</label>
                    <input type="number" id="voterId" name="voterId" className={styles.input} 
                        placeholder="Enter your 12-digit Voter ID" 
                        value={formData.voterId} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input type="text" id="name" name="name" className={styles.input} 
                        placeholder="Enter your full name" 
                        value={formData.name} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" id="email" name="email" className={styles.input} 
                        placeholder="Enter a valid email (e.g., example@mail.com)" 
                        value={formData.email} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input type="password" id="password" name="password" className={styles.input} 
                        placeholder="Enter a strong password (min 8 characters)" 
                        value={formData.password} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="age" className={styles.label}>Age</label>
                    <input type="number" id="age" name="age" className={styles.input} 
                        placeholder="Enter your age (e.g., 18)" 
                        value={formData.age} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Gender</label>
                    <div className={styles.radioGroup}>
                        <label htmlFor="male">Male</label>
                        <input type="radio" id="male" name="gender" value="Male" 
                            checked={formData.gender === 'Male'} onChange={handleChange} required />
                        <label htmlFor="female">Female</label>
                        <input type="radio" id="female" name="gender" value="Female" 
                            checked={formData.gender === 'Female'} onChange={handleChange} required />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="address" className={styles.label}>Address</label>
                    <input type="text" id="address" name="address" className={styles.input} 
                        placeholder="Enter your residential address" 
                        value={formData.address} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="constituency" className={styles.label}>Constituency</label>
                    <input type="text" id="constituency" name="constituency" className={styles.input} 
                        placeholder="Enter your constituency (e.g., City District 1)" 
                        value={formData.constituency} onChange={handleChange} required />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="constituencyNumber" className={styles.label}>Constituency Number</label>
                    <input type="number" id="constituencyNumber" name="constituencyNumber" className={styles.input} 
                        placeholder="Enter constituency number (e.g., 33)" 
                        value={formData.constituencyNumber} onChange={handleChange} required />
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className="g-btn">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;