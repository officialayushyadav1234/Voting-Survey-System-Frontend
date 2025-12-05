import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import styles from "./ConstituencyTable.module.css";

const ConstituencyTable = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8090/api/party");

            const groupedData = response.data.reduce((acc, party) => {
                const { id, name, state, electionActive } = party.constituency;

                if (!acc[id]) {
                    acc[id] = { 
                        constituency: { id, name, state, electionActive }, 
                        parties: [] 
                    };
                }

                acc[id].parties.push(party);
                return acc;
            }, {});

            setData(groupedData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data. Please try again.");
            toast.error("Failed to fetch constituency data.");
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <div className={styles.wrapper}>
            <Toaster position="top-right" />
            
            {/* Updated Header Title */}
            <div className={styles.pageHeader}>
                <h1 className={styles.mainTitle}>📜 Constituency List</h1>
                <p className={styles.subTitle}>Live tracking of all registered constituencies and parties</p>
            </div>

            {loading && (
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>Loading List...</p>
                </div>
            )}
            
            {error && <div className={styles.errorBox}>⚠️ {error}</div>}

            {!loading && !error && (
                <motion.div 
                    className={styles.gridContainer}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {Object.keys(data).length > 0 ? (
                        Object.values(data).map(({ constituency, parties }) => (
                            <motion.div 
                                key={constituency.id} 
                                className={styles.constituencyCard}
                                variants={cardVariants}
                            >
                                <div className={styles.cardHeader}>
                                    <div className={styles.headerInfo}>
                                        <span className={styles.label}>Constituency Name:</span>
                                        <h2 className={styles.constituencyName}>
                                            {constituency.name}
                                        </h2>
                                        <div className={styles.metaRow}>
                                            <span className={styles.stateTag}>{constituency.state}</span>
                                            <span className={styles.constituencyId}>ID: {constituency.id}</span>
                                        </div>
                                    </div>
                                    
                                    <div className={`${styles.statusBadge} ${constituency.electionActive ? styles.active : styles.inactive}`}>
                                        <span className={styles.dot}></span>
                                        {constituency.electionActive ? "LIVE" : "ENDED"}
                                    </div>
                                </div>

                                <div className={styles.tableWrapper}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Candidate</th>
                                                <th>Party</th>
                                                <th className={styles.textRight}>Votes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parties.map((party) => (
                                                <tr key={party.id}>
                                                    <td className={styles.candidateCell}>
                                                        <img 
                                                            src={party.img} 
                                                            alt="Logo" 
                                                            className={styles.smallLogo} 
                                                        />
                                                        <span className={styles.cName}>{party.candidateName}</span>
                                                    </td>
                                                    <td className={styles.partyName}>{party.name}</td>
                                                    <td className={styles.voteCell}>
                                                        {party.numberOfVotes.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className={styles.noData}>
                            <p>No constituency data available.</p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default ConstituencyTable;