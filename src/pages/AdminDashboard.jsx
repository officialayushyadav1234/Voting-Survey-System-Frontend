import { motion } from "framer-motion";
import style from "./adminDashboard.module.css";
import ActiveElection from "../component/activeConstituencyElection/ActiveElection";
import PartyRegister from "../component/party/PartyRegister";
import PartyCard from "../component/partyCard/PartyCard";
import ActiveParty from "../component/activeConstituencyParty/ActiveParty";
import LiveAgainElection from "../component/liveAgain/LiveAgainElection";
import ConstituencyTable from "../component/constituencyTableAndParty/ConstituencyTable";
import ConstituencyAdded from "../component/constituency/ConstituencyAdded";
import GetAllConstituency from "../component/constituency/GetAllConstituency";

const AdminDashboard = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Staggers the animation of child elements
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className={style.dashboardContainer}>
      <div className={style.bgOverlay} />
      
      <header className={style.header}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <div className={style.badge}>ADMINISTRATOR ACCESS</div>
          <h1>Election Command Portal</h1>
          <p>Manage live elections, monitor parties, and control constituency data.</p>
        </motion.div>
      </header>

      {/* Main Content Grid */}
      <motion.main 
        className={style.gridLayout}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Section 1: Quick Actions & Forms */}
        <motion.div variants={itemVariants} className={style.card}>
            <div className={style.cardHeader}>
                <h3>📝 Register Party</h3>
            </div>
            <PartyRegister />
        </motion.div>

        <motion.div variants={itemVariants} className={style.card}>
            <div className={style.cardHeader}>
                <h3>🗺️ Add Constituency</h3>
            </div>
            <ConstituencyAdded />
        </motion.div>

        <motion.div variants={itemVariants} className={style.card}>
            <div className={style.cardHeader}>
                <h3>🟢 Active Elections</h3>
            </div>
            <ActiveElection />
        </motion.div>

        <motion.div variants={itemVariants} className={style.card}>
            <div className={style.cardHeader}>
                <h3>🔄 Relaunch Election</h3>
            </div>
            <LiveAgainElection />
        </motion.div>

        {/* Section 2: Stats & Displays */}
        <motion.div variants={itemVariants} className={style.card}>
            <div className={style.cardHeader}>
                 <h3>📊 Party Overview</h3>
            </div>
            <PartyCard />
        </motion.div>

        <motion.div variants={itemVariants} className={style.card}>
            <div className={style.cardHeader}>
                <h3>⚡ Live Parties</h3>
            </div>
            <ActiveParty />
        </motion.div>

        {/* Section 3: Wide Data Tables */}
        <motion.div variants={itemVariants} className={`${style.card} ${style.fullWidth}`}>
            <div className={style.cardHeader}>
                 <h3>📂 Constituency Directory</h3>
            </div>
            <div className={style.tableWrapper}>
                <GetAllConstituency />
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className={`${style.card} ${style.fullWidth}`}>
            <div className={style.cardHeader}>
                <h3>🗂️ Master Constituency Table</h3>
            </div>
            <div className={style.tableWrapper}>
                <ConstituencyTable />
            </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default AdminDashboard;