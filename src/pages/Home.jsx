import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./home.module.css";

const VotingCards = () => {
  const [data, setData] = useState([]);
  const [constituency, setConstituency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxVotes, setMaxVotes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/party/activeConstituenciePartys"
        );

        if (response.data.length > 0) {
          const sortedParties = response.data
            .slice()
            .sort((a, b) => b.numberOfVotes - a.numberOfVotes);

          setMaxVotes(sortedParties[0].numberOfVotes);
          setConstituency(sortedParties[0].constituency);
          setData(sortedParties);
        } else {
          setData([]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        // Only set error on first load to prevent UI flickering on background updates
        if (loading) setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [loading]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundOverlay} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
          },
        }}
      />
      
      <motion.div 
        className={styles.outerContainer}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.brand}>
            <div className={styles.logoCircle}>🗳️</div>
            <div>
              <h1 className={styles.title}>Election Command Center</h1>
              <p className={styles.subtitle}>
                Live Constituency Monitoring System
              </p>
            </div>
          </div>

          <div className={styles.liveBadge}>
            <span className={styles.liveDot} />
            <span className={styles.liveText}>LIVE UPDATES</span>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className={styles.stateBox}>
            <div className={styles.spinner} />
            <p className={styles.loadingText}>Initializing data stream...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className={`${styles.stateBox} ${styles.errorBox}`}>
            <p className={styles.errorText}>⚠️ {error}</p>
          </div>
        )}

        {/* No Live Election */}
        {!loading && !error && data.length === 0 && (
          <div className={`${styles.stateBox} ${styles.noLiveBox}`}>
            <h2>Waiting for Data Stream</h2>
            <p>No active elections detected in the current region.</p>
          </div>
        )}

        {/* Live Election Content */}
        {!loading && !error && data.length > 0 && (
          <>
            <motion.div 
              className={styles.constituencyHeader}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className={styles.label}>CONSTITUENCY ID: {constituency?.id}</span>
              <h2 className={styles.constituencyName}>{constituency?.name}</h2>
            </motion.div>

            <motion.div 
              className={styles.container}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence>
                {data.map((party) => {
                  const isLeading = party.numberOfVotes === maxVotes;

                  return (
                    <motion.div
                      layout // This prop enables the smooth re-sorting animation!
                      variants={itemVariants}
                      key={party.id}
                      className={`${styles.card} ${
                        isLeading ? styles.cardHighest : ""
                      }`}
                      whileHover={{ scale: 1.02, translateY: -5 }}
                    >
                      {isLeading && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={styles.crownBadge}
                        >
                          👑 LEADING
                        </motion.div>
                      )}

                      <div className={styles.cardHeader}>
                        <div className={styles.imageWrapper}>
                          <img
                            src={party.img}
                            alt={party.name}
                            className={styles.partyLogo}
                          />
                        </div>
                        <div className={styles.partyInfo}>
                          <h3 className={styles.partyName}>{party.name}</h3>
                          <div className={styles.progressBarBg}>
                            <motion.div 
                              className={styles.progressBarFill}
                              initial={{ width: 0 }}
                              animate={{ width: `${(party.numberOfVotes / maxVotes) * 100}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={styles.cardBody}>
                        <div className={styles.statGroup}>
                          <span className={styles.statLabel}>Total Votes</span>
                          <span className={styles.statValue}>
                            {party.numberOfVotes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            <p className={styles.disclaimer}>
              <span className={styles.blink}>●</span> Data refreshes automatically every 5 seconds.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default VotingCards;