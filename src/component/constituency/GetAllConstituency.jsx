import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

    // Animation Variants
    const tableVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    };

    if (loading) return <div className={styles.loading}>Loading directory...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>All Constituencies</h3>
                <span className={styles.badge}>{constituencies.length} Total</span>
            </div>
            
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.stickyHeader}>ID</th>
                            <th className={styles.stickyHeader}>Name</th>
                            <th className={styles.stickyHeader}>State</th>
                            <th className={styles.stickyHeader}>Status</th>
                            <th className={styles.stickyHeader}>Last Election</th>
                        </tr>
                    </thead>
                    <motion.tbody
                        variants={tableVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {constituencies.map((constituency) => (
                            <motion.tr 
                                key={constituency.id} 
                                variants={rowVariants}
                                className={styles.row}
                            >
                                <td className={styles.idCell}>#{constituency.id}</td>
                                <td className={styles.nameCell}>{constituency.name}</td>
                                <td>{constituency.state}</td>
                                <td>
                                    <span className={`${styles.statusPill} ${constituency.electionActive ? styles.active : styles.inactive}`}>
                                        <span className={styles.dot}></span>
                                        {constituency.electionActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className={styles.dateCell}>{constituency.dols}</td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
};

export default GetAllConstituency;