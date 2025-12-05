import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import style from "./LiveAgainElection.module.css";

function LiveAgainElection() {
    const [constituencyNumber, setConstituencyNumber] = useState("");

    // Function to handle input change with validation
    const handleInputChange = (e) => {
        const value = e.target.value;

        // Ensure input is a number and within range 1-543
        if (!/^\d*$/.test(value)) {
            return; // Prevents non-numeric input
        }

        if (value === "" || (Number(value) >= 1 && Number(value) <= 543)) {
            setConstituencyNumber(value);
        } else {
            toast.error("Constituency number must be between 1 and 543!");
        }
    };

    // // Function to handle the PUT request
    // const startLiveElection = async () => {
    //     if (!constituencyNumber || Number(constituencyNumber) < 1 || Number(constituencyNumber) > 543) {
    //         toast.error("Please enter a valid constituency number (1-543)!");
    //         return;
    //     }

    //     const apiUrl = `http://localhost:8090/api/constituency/${constituencyNumber}/election-status/true`;

    //     try {
    //         const response = await axios.put(apiUrl);
    //         toast.success(`Election Live for Constituency ${constituencyNumber}!`);
    //         alert("Make sure previous all survey inactive ⚠️ ")
    //         console.log("Response:", response.data);
    //     } catch (error) {
    //         console.error("Error updating election status:", error);
    //         toast.error("Failed to start live election.");
    //     }
    // };

    const startLiveElection = async () => {
        if (!constituencyNumber || Number(constituencyNumber) < 1 || Number(constituencyNumber) > 543) {
            toast.error("Please enter a valid constituency number (1-543)!");
            return;
        }
    
        const resetVotesApi = `http://localhost:8090/api/party/resetVotes?constituencyId=${constituencyNumber}`;
        const electionStatusApi = `http://localhost:8090/api/constituency/${constituencyNumber}/election-status/true`;
    
        try {
            // Step 1: Reset votes first
            const resetResponse = await axios.put(resetVotesApi);
    
            if (resetResponse.data !== "All votes reset successfully.") {
                toast.error("Failed to reset votes!");
                return;
            }
    
            toast.success("Votes reset successfully!");
    
            // Step 2: Start live election
            const electionResponse = await axios.put(electionStatusApi);
            toast.success(`Election Live for Constituency ${constituencyNumber}!`);
            alert("Make sure previous all survey inactive ⚠️ ");
            console.log("Election Response:", electionResponse.data);
    
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to start live election.");
        }

        setConstituencyNumber("");
    };
    

    return (
        <div className={style.container}>
            <Toaster /> {/* Toast notifications */}
            <h1>🔴 Live Survey Again</h1>
            
            {/* Input for Constituency Number */}
            <input 
                type="number"
                placeholder="Enter Constituency Number (1-543)"
                value={constituencyNumber}
                onChange={handleInputChange}
                className={style.input}
                min="1"
                max="543"
            />

            {/* Button to Start Election */}
            <button onClick={startLiveElection} className={style.button}>
                Start Live Election
            </button>
        </div>
    );
}

export default LiveAgainElection;