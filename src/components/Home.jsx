import { useEffect, useState } from "react";
import ParticipantCard from "./ParticipantCard";

function Home() {
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verifiedUser, setVerifiedUser] = useState([]); // Ensure initial state is an array
    const [unVerifiedUser, setUnVerifiedUser] = useState([]);
    async function fetchUnVerifiedParticipants() {
        try {
            setLoading(true);
            const response = await fetch("https://techazura-backend.vercel.app/api/unverified");
            const data = await response.json();

            console.log("API Response:", data); 

            if (Array.isArray(data)) {
                setUnVerifiedUser(data.participants); 
            } else if (data && Array.isArray(data.participants)) {
                setUnVerifiedUser(data.participants); 
            } else {
                setUnVerifiedUser([]); 
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setUnVerifiedUser([]); 
        }
    }

    async function fetchVerifiedParticipants() {
        try {
            const response = await fetch("https://techazura-backend.vercel.app/api/verified");
            const data = await response.json();

            console.log("API Response:", data); 

            if (Array.isArray(data)) {
                setVerifiedUser(data.participants); 
            } else if (data && Array.isArray(data.participants)) {
                setVerifiedUser(data.participants); 
            } else {
                setVerifiedUser([]); 
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setVerifiedUser([]); 
        }
    }

    useEffect(() => {
        fetchUnVerifiedParticipants();
        fetchVerifiedParticipants();
    }, [isVerified]);

    return (
        <main className="flex flex-col justify-center items-center gap-4 pt-12">
            {loading? <p>Loading...</p> : 
            <>
                <h1 className="text-2xl pb-3">TechAzura Admin panel</h1>
            <div className="grid grid-cols-2 max-w-[900px] w-full px-2">
                <button 
                    className={`flex flex-col items-center justify-center rounded-md transition-colors duration-250 ease-in-out ${!isVerified ? " bg-blue-500 py-2 text-white" : ""}`} 
                    onClick={() => setIsVerified(false)}
                >
                    <span>UnVerified participants</span>
                </button>
                <button 
                    className={`flex flex-col items-center justify-center rounded-md transition-colors duration-250 ease-in-out ${isVerified ? " bg-blue-500 py-2 text-white" : ""}`} 
                    onClick={() => setIsVerified(true)}
                >
                    <span>Verified participants</span>
                </button>
            </div>
            <div className="max-w-[900px] w-1/2">
                {isVerified ? 
                    Array.isArray(verifiedUser) && verifiedUser.length > 0
                        ? verifiedUser.map((item, index) => <ParticipantCard key={index} name={item.name} id={item._id} />)
                        : "No participants"
                :
                    Array.isArray(unVerifiedUser) && unVerifiedUser.length > 0
                        ? unVerifiedUser.map((item, index) => <ParticipantCard key={index} name={item.name} id={item._id} />)
                        : "No participants"
                }
            </div>
            </>}
        </main>
    );
}

export default Home;
