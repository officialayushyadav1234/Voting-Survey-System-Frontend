import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import style from "./activeParty.module.css";

function ActiveParty() {
    const [activeParties, setActiveParties] = useState([]);

    useEffect(() => {
        fetchActiveParties();
    }, []);

    const fetchActiveParties = async () => {
        try {
            const response = await axios.get("http://localhost:8090/api/party/activeConstituenciePartys");
            setActiveParties(response.data);
            // toast.success("Live active constituency parties loaded successfully!");
        } catch (error) {
            console.error("Error fetching active parties:", error);
            toast.error("Failed to load live active parties.");
        }
    };

    return (
        <div className={style.container}>
            <Toaster />
            <h1>🟢 Live Active Party</h1>
            <div className={style.scrollContainer}>
                {activeParties.length > 0 ? (
                    activeParties.map(party => (
                        <div key={party.id} className={style.partyCard}>
                            <img src={party.img} alt="Party Symbol" className={style.partySymbol} />
                            <h3>{party.name} (Live)</h3>
                            <img src={party.candidateImg} alt="Candidate" className={style.candidateImage} />
                            <p>Candidate: {party.candidateName}</p>
                            <p>Votes: {party.numberOfVotes}</p>
                            <p>Constituency: {party.constituency.name} ({party.constituency.id})</p>
                        </div>
                    ))
                ) : (
                    <p>No live active constituency parties available.</p>
                )}
            </div>
        </div>
    );
}

export default ActiveParty;