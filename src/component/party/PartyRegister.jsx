import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import style from "./partRegister.module.css";

function PartyRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        candidateName: "",
        img: "",
        candidateImg: "",
        constituency: { id: "" }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "constituency") {
            setFormData({
                ...formData,
                constituency: { id: value } // Keep as string for input, convert on submit
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- VALIDATION START ---
        const constituencyId = parseInt(formData.constituency.id);
        
        if (!formData.constituency.id || isNaN(constituencyId) || constituencyId <= 0) {
            toast.error("Please enter a valid Constituency ID (Positive Number)");
            return; // Stop the request here
        }
        // --- VALIDATION END ---

        setIsLoading(true);

        try {
            // Create a payload with the ID converted to a number
            const payload = {
                ...formData,
                constituency: { id: constituencyId }
            };

            const response = await axios.post("http://localhost:8090/api/party", payload);
            console.log("Form Data Submitted Successfully:", response.data);
            toast.success("Party registered successfully!");
            
            // Reset form
            setFormData({ 
                name: "", 
                candidateName: "", 
                img: "", 
                candidateImg: "", 
                constituency: { id: "" } 
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            // Show a more specific error message if available
            const errorMsg = error.response?.data?.message || "Failed to register party. Check connection.";
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.pageContainer}>
            <Toaster position="top-center" reverseOrder={false} />
            
            <div className={style.card}>
                <div className={style.header}>
                    <h1>Register New Party</h1>
                    <p>Enter the election details below</p>
                </div>

                <form onSubmit={handleSubmit} className={style.form}>
                    
                    {/* Row 1: Names */}
                    <div className={style.row}>
                        <div className={style.inputGroup}>
                            <label>Party Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="e.g. Democratic Alliance"
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Candidate Name</label>
                            <input 
                                type="text" 
                                name="candidateName" 
                                placeholder="e.g. John Doe"
                                value={formData.candidateName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>

                    {/* Row 2: Constituency */}
                    <div className={style.inputGroup}>
                        <label>Constituency ID</label>
                        <input 
                            type="number" 
                            name="constituency" 
                            placeholder="Enter ID number"
                            value={formData.constituency.id} 
                            onChange={handleChange}
                            min="1" 
                            required 
                        />
                        <small style={{color: '#666', fontSize: '12px'}}>
                            Must be a valid ID existing in the database.
                        </small>
                    </div>

                    <div className={style.divider}></div>

                    {/* Row 3: Images */}
                    <div className={style.row}>
                        <div className={style.inputGroup}>
                            <label>Party Symbol (URL)</label>
                            <input 
                                type="text" 
                                name="img" 
                                placeholder="https://..."
                                value={formData.img} 
                                onChange={handleChange} 
                                required 
                            />
                            {formData.img && (
                                <div className={style.preview}>
                                    <img src={formData.img} alt="Symbol Preview" onError={(e) => e.target.style.display='none'}/>
                                    <span>Symbol Preview</span>
                                </div>
                            )}
                        </div>

                        <div className={style.inputGroup}>
                            <label>Candidate Photo (URL)</label>
                            <input 
                                type="text" 
                                name="candidateImg" 
                                placeholder="https://..."
                                value={formData.candidateImg} 
                                onChange={handleChange} 
                                required 
                            />
                            {formData.candidateImg && (
                                <div className={style.preview}>
                                    <img src={formData.candidateImg} alt="Candidate Preview" onError={(e) => e.target.style.display='none'} />
                                    <span>Candidate Preview</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <button type="submit" className={style.submitBtn} disabled={isLoading}>
                        {isLoading ? "Registering..." : "Complete Registration"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PartyRegister;