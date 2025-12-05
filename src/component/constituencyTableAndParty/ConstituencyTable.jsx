import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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

            // Grouping data by constituency ID
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
            toast.success("Data loaded successfully!");
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data. Please try again.");
            toast.error("Failed to fetch constituency data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Toaster />
            <h1>🗳️ Constituency-wise Party List</h1>

            {loading && <p className={styles.loading}>Loading data...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {Object.keys(data).length > 0 ? (
                Object.values(data).map(({ constituency, parties }) => (
                    <div key={constituency.id} className={styles.constituencyBlock}>
                        <h2 className={styles.constituencyTitle}>
                            {constituency.name} ({constituency.id}) - {constituency.state} 
                            {constituency.electionActive ? " 🟢 Live" : " 🔴 Not Live"}
                        </h2>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Party</th>
                                    <th>Candidate</th>
                                    <th>Votes</th>
                                    <th>Party Logo</th>
                                    <th>Candidate Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parties.map((party) => (
                                    <tr key={party.id}>
                                        <td>{party.name}</td>
                                        <td>{party.candidateName}</td>
                                        <td>{party.numberOfVotes}</td>
                                        <td><img src={party.img} alt="Party Logo" className={styles.image} /></td>
                                        <td><img src={party.candidateImg} alt="Candidate" className={styles.image} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <p className={styles.noData}>No data available.</p>
            )}
        </div>
    );
};

export default ConstituencyTable;