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
    return (
        <div className={style.dashboardContainer}>
            <header className={style.header}>
                <h1>Admin Portal</h1>
                <p>Manage elections, parties, and constituencies</p>
            </header>

            {/* Main Content Grid */}
            <main className={style.gridLayout}>
                
                {/* Section 1: Quick Actions & Forms (Responsive Grid) */}
                <div className={style.card}><PartyRegister /></div>
                <div className={style.card}><ConstituencyAdded /></div>
                <div className={style.card}><ActiveElection /></div>
                <div className={style.card}><LiveAgainElection /></div>
                
                {/* Section 2: Stats & Displays */}
                <div className={style.card}><PartyCard /></div>
                <div className={style.card}><ActiveParty /></div>

                {/* Section 3: Wide Data Tables (Spans Full Width) */}
                <div className={`${style.card} ${style.fullWidth}`}>
                    <h2 className={style.cardTitle}>All Constituencies Directory</h2>
                    <GetAllConstituency />
                </div>

                <div className={`${style.card} ${style.fullWidth}`}>
                    <h2 className={style.cardTitle}>Master Constituency Table</h2>
                    <ConstituencyTable />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;