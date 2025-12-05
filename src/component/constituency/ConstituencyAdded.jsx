import { useState } from "react";
import axios from "axios";
import styles from "./ConstituencyAdded.module.css";
import toast from "react-hot-toast";

const ConstituencyAdded = () => {
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
    };

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        state: states[0], // Default to the first state
        electionActive: false, // Default value
        dOLS: getCurrentDate() // Automatically set to today's date
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8090/api/constituency", formData, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                setFormData({ id: "", name: "", state: states[0], electionActive: false, dOLS: getCurrentDate() });
            }
            toast.success("successfully added Constituency")
        } catch (error) {
            console.error("An error occurred: " + error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Add Constituency</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                Constituency Number:
                    <input type="number" name="id" value={formData.id} onChange={handleChange} required />
                </label>
                <label>
                Constituency Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    State:
                    <select name="state" value={formData.state} onChange={handleChange} required>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add Constituency</button>
            </form>
        </div>
    );
};

export default ConstituencyAdded;