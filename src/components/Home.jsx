import { useEffect, useState } from "react";
import ParticipantCard from "./ParticipantCard";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Home() {
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verifiedUser, setVerifiedUser] = useState([]); 
    const [unVerifiedUser, setUnVerifiedUser] = useState([]);

    async function fetchParticipants(status) {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/admin/${status}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                }
            });

            const data = await response.json();
            console.log(`API Response (${status}):`, data);

            if (!data.success) {
                if (!sessionStorage.getItem("toastShown")) {
                    toast.error("Please login again");
                    sessionStorage.setItem("toastShown", "true");
                }
                return;
            }

            sessionStorage.removeItem("toastShown");

            if (data && Array.isArray(data.participants)) {
                status === "unverified" ? setUnVerifiedUser(data.participants) : setVerifiedUser(data.participants);
            } else {
                status === "unverified" ? setUnVerifiedUser([]) : setVerifiedUser([]);
            }
        } catch (error) {
            console.error(`Error fetching ${status} participants:`, error);
            status === "unverified" ? setUnVerifiedUser([]) : setVerifiedUser([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchParticipants("unverified");
        fetchParticipants("verified");
    }, [isVerified]);

    return (
        <main className="flex flex-col justify-center items-center gap-4 pt-12">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h1 className="text-2xl pb-3">TechAzura Admin Panel</h1>
                    <Link to={"/login"} className="bg-blue-500 text-white py-2 px-5 rounded-md">Login</Link>
                    <div className="grid grid-cols-2 max-w-[900px] w-full px-2">
                        <button
                            className={`flex flex-col items-center justify-center rounded-md transition-colors duration-250 ease-in-out ${
                                !isVerified ? " bg-blue-500 py-2 text-white" : ""
                            }`}
                            onClick={() => setIsVerified(false)}
                        >
                            <span>Unverified Participants</span>
                        </button>
                        <button
                            className={`flex flex-col items-center justify-center rounded-md transition-colors duration-250 ease-in-out ${
                                isVerified ? " bg-blue-500 py-2 text-white" : ""
                            }`}
                            onClick={() => setIsVerified(true)}
                        >
                            <span>Verified Participants</span>
                        </button>
                    </div>
                    <div className="max-w-[900px] w-1/2 max-sm:w-[90%]">
                        {isVerified
                            ? verifiedUser.length > 0
                                ? verifiedUser.map((item) => (
                                      <ParticipantCard key={item._id} name={item.name} id={item._id} />
                                  ))
                                : "No participants"
                            : unVerifiedUser.length > 0
                            ? unVerifiedUser.map((item) => (
                                  <ParticipantCard key={item._id} name={item.name} id={item._id} />
                              ))
                            : "No participants"}
                    </div>
                </>
            )}
        </main>
    );
}

export default Home;
