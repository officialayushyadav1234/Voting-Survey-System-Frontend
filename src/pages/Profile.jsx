import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./profile.module.css";
import { toast } from "react-hot-toast";
// import ConstituencyTable from "../component/constituencyTableAndParty/ConstituencyTable"
import SearchAllPartiesByConstituencyIdOrName from "../component/getPartiesByConstituencyIdOrName/SearchAllPartiesByConstituencyIdOrName"

function Profile() {
    const [user, setUser] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [electionActive, setElectionActive] = useState(false);
    
    const voterId = sessionStorage.getItem("voterId");

    useEffect(() => {
        if (!voterId) {
            toast.error("No voter ID found. Please log in.");
            return;
        }

        // Fetch user details
        axios.get(`http://localhost:8090/api/user/voterId/${voterId}`)
            .then(response => {
                setUser(response.data);
                return axios.get(`http://localhost:8090/api/party/constituency-number/${response.data.constituencyNumber}`);
            })
            .then(response => {
                setCandidates(response.data);
                setElectionActive(response.data.length > 0 && response.data[0].constituency.electionActive);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [voterId]);

    const handleVote = async (partyId) => {
        if (!user || user.hasVoted) return;

        try {
            const candidate = candidates.find(c => c.id === partyId);
            if (!candidate) return;

            const newVoteCount = candidate.numberOfVotes + 1;
            
            await axios.put(`http://localhost:8090/api/party/${partyId}/votes?votes=${newVoteCount}`);
            await axios.put(`http://localhost:8090/api/user/voterId/${user.voterId}/vote-status/true`);
            
            toast.success("Vote cast successfully!");
            setUser(prevUser => ({ ...prevUser, hasVoted: true }));
            sessionStorage.setItem("hasVoted", "true");
        } catch (error) {
            toast.error("Error casting vote. Please try again.");
            console.error("Error casting vote:", error);
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (!electionActive) return <h2 className={styles.notLiveSurvey}>Not Live Survey yet</h2>;


    return (
        <div>
            <div className={styles.container}>
                <div className={styles.profileContainer}>
                    <div className={styles.userCard}>
                        <img src="./img/user.png" alt="User" className={styles.profileImage} />
                        <h3>{user.name}</h3>
                        <p><strong>Voter ID:</strong> {user.voterId}</p>
                        <p><strong>Constituency no.:</strong> {user.constituencyNumber}</p>
                        <p><strong>User Email:</strong> {user.email}</p>
                        <p><strong>Status:</strong> {user.hasVoted ? "Voted" : "Not Voted"}</p>
                    </div>

                    <div className={styles.candidatesContainer}>
                        {candidates.map(candidate => (
                            <div key={candidate.id} className={styles.candidateCard}>
                                <img src={candidate.img} alt="Party Logo" className={styles.partyLogo} />
                                <img src={candidate.candidateImg} alt="Candidate" className={styles.candidateImage} />
                                <h3>{candidate.candidateName}</h3>
                                <button
                                    className={styles.voteButton}
                                    onClick={() => handleVote(candidate.id)}
                                    disabled={user.hasVoted}
                                >
                                    {user.hasVoted ? "Voted" : "Vote"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.constituencyTableContainer}>
                <SearchAllPartiesByConstituencyIdOrName/>
            </div>
        </div>
    );
}

export default Profile;