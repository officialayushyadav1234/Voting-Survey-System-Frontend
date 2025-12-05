import { useState } from "react";
import style from "./searchAllPartiesByConstituencyIdOrName.module.css";

function SearchAllPartiesByConstituencyIdOrName() {
    const [constituencyId, setConstituencyId] = useState("");
    const [constituencyName, setConstituencyName] = useState("");
    const [parties, setParties] = useState([]);
    const [message, setMessage] = useState("");

    const fetchParties = async () => {
        let url = "http://localhost:8090/api/party/byConstituencyIdOrName";

        if (constituencyId) {
            url += `?constituencyId=${constituencyId}`;
        } else if (constituencyName) {
            url += `?constituencyName=${constituencyName}`;
        } else {
            setMessage("Please enter either Constituency ID or Name.");
            return;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.length > 0) {
                setParties(data);
                setMessage("");
            } else {
                setParties([]);
                setMessage("Survey records in this constituency are not available yet.");
            }
        } catch (error) {
            console.error("Error fetching parties:", error);
            setMessage("Error fetching data. Please try again later.");
        }
    };

    return (
        <div className={style.container}>
            <h2>Search Political Parties <i>Its Belonging Constituency</i></h2>
            <div className={style.searchBox}>
                <input
                    type="number"
                    placeholder="Enter Constituency ID"
                    value={constituencyId}
                    onChange={(e) => {
                        setConstituencyId(e.target.value);
                        setConstituencyName(""); // Clear constituencyName if ID is entered
                    }}
                />
                <input
                    type="text"
                    placeholder="Enter Constituency Name"
                    value={constituencyName}
                    onChange={(e) => {
                        setConstituencyName(e.target.value);
                        setConstituencyId(""); // Clear constituencyId if Name is entered
                    }}
                />
                <button onClick={fetchParties}>Search</button>
            </div>

            {message && <p className={style.message}>{message}</p>}

            {parties.length > 0 && (
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Party Name</th>
                            <th>Candidate Name</th>
                            <th>Votes</th>
                            <th>Party Logo</th>
                            <th>Candidate Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parties.map((party) => (
                            <tr key={party.id}>
                                <td>{party.id}</td>
                                <td>{party.name}</td>
                                <td>{party.candidateName}</td>
                                <td>{party.numberOfVotes}</td>
                                <td>
                                    <img src={party.img} alt={party.name} className={style.img} />
                                </td>
                                <td>
                                    <img src={party.candidateImg} alt={party.candidateName} className={style.img} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchAllPartiesByConstituencyIdOrName;