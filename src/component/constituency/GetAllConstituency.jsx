import { useEffect, useState } from "react";
import styles from "./GetAllConstituency.module.css";

const GetAllConstituency = () => {
    const [constituencies, setConstituencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8090/api/constituency")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                setConstituencies(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h2>Constituency List</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>State</th>
                            <th>Status</th>
                            <th>Last Election Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {constituencies.map((constituency) => (
                            <tr key={constituency.id}>
                                <td>{constituency.id}</td>
                                <td>{constituency.name}</td>
                                <td>{constituency.state}</td>
                                <td>{constituency.electionActive ? "Active" : "Inactive"}</td>
                                <td>{constituency.dols}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetAllConstituency;