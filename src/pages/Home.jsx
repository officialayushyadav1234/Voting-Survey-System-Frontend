import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Toast notifications
import styles from "./home.module.css";

const VotingCards = () => {
    const [data, setData] = useState([]);
    const [constituency, setConstituency] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [maxVotes, setMaxVotes] = useState(0); // Track highest votes

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8090/api/party/activeConstituenciePartys");

                if (response.data.length > 0) {
                    // Sorting parties in descending order based on votes
                    const sortedParties = response.data.sort((a, b) => b.numberOfVotes - a.numberOfVotes);
                    
                    // Find the max votes
                    setMaxVotes(sortedParties[0].numberOfVotes);

                    // Setting constituency details from the first party (assuming all belong to the same constituency)
                    setConstituency(sortedParties[0].constituency);
                    setData(sortedParties);
                    // toast.success("Live election data loaded successfully!");
                } else {
                    setData([]); // No active elections
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please try again.");
                toast.error("Failed to load election data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Polling every 5 seconds to update live results
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.wrapper}>
            <Toaster />

            {/* Show Loading Indicator */}
            {loading && <p className={styles.loading}>Loading live election data...</p>}

            {/* Show Error Message if API Fails */}
            {error && <p className={styles.error}>{error}</p>}

            {/* If No Live Election */}
            {!loading && data.length === 0 && (
                <div className={styles.noLive}>
                    <h2>🔴 No Live Election Yet</h2>
                </div>
            )}

            {/* If Live Election is Active */}
            {data.length > 0 && (
                <>
                    {/* Constituency Details */}
                    <h1 className={styles.constituencyHeading}>
                        🟢 Live Survey - Constituency {constituency.id}: {constituency.name}
                    </h1>

                    {/* Voting Cards */}
                    <div className={styles.outerContainer}>
                        <div className={styles.container}>
                            {data.map((party) => (
                                <div 
                                    key={party.id} 
                                    className={party.numberOfVotes === maxVotes ? styles.cardHighest : styles.card}
                                >
                                    <img src={party.img} alt={`${party.name} Logo`} className={styles.partyLogo} />
                                    <h3 className={styles.partyName}>{party.name} (Live)</h3>
                                    <p className={styles.votes}>Votes: {party.numberOfVotes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default VotingCards;