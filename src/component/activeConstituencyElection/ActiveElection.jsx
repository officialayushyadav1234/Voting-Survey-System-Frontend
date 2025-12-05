import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import style from "./activeElection.module.css";

function ActiveElection() {
    const [activeElections, setActiveElections] = useState([]);

    useEffect(() => {
        fetchActiveElections();
    }, []);

    const fetchActiveElections = async () => {
        try {
            const response = await axios.get("http://localhost:8090/api/constituency/active");
            setActiveElections(response.data);
        } catch (error) {
            console.error("Error fetching active elections:", error);
        }
    };

    // const handleDeactivate = async (id) => {
    //     try {
    //         await axios.put(`http://localhost:8090/api/constituency/${id}/election-status/false`);
    //         setActiveElections(activeElections.filter(election => election.id !== id));
    //         toast.success("Election deactivated successfully!");
    //     } catch (error) {
    //         console.error("Error deactivating election:", error);
    //         toast.error("Failed to deactivate election.");
    //     }
    // };

    const handleDeactivate = async (id) => {
        try {
            // Deactivate the election
            await axios.put(`http://localhost:8090/api/constituency/${id}/election-status/false`);
            
            // Reset votes for the constituency
            await axios.put(`http://localhost:8090/api/user/reset-votes/${id}`);
    
            // Update the UI by removing the deactivated election
            setActiveElections(activeElections.filter(election => election.id !== id));
    
            // Show success message
            toast.success("Election deactivated successfully!");
        } catch (error) {
            console.error("Error deactivating election:", error);
            toast.error("Failed to deactivate election.");
        }
    };
    

    return (
        <div className={style.container}>
            <Toaster />
            <h1>🟢 Live Active Election</h1>
            <div className={style.electionContainer}>
                {activeElections.length > 0 ? (
                    activeElections.map(election => (
                        <div key={election.id} className={style.electionCard}>
                            <h3>{election.name}</h3>
                            <p>Constituency Number: {election.id}</p>
                            <p>State: {election.state}</p>
                            <p>Last Election Active Date: {election.dOLS}</p>
                            <button onClick={() => handleDeactivate(election.id)} className={style.inactiveButton}>Inactive</button>
                        </div>
                    ))
                ) : (
                    <p>No active elections available.</p>
                )}
            </div>
        </div>
    );
}

export default ActiveElection;