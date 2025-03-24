import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams,useNavigate } from "react-router-dom";

function SingleParticipant() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    async function fetchParticipant() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/admin/participant/${id}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                }
            }
            );
            if(!response.ok) toast.error("please login again")
            if (!response.ok) throw new Error("Failed to fetch participant");
            const tempData = await response.json();
            setData(tempData);
            setIsApproved(tempData.accepted);
        } catch (err) {
            setError(err.message);
        }
    }

    async function approveTicket(){
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/admin/approve-ticket/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            if (!response.ok) throw new Error("Failed to fetch participant");

            const tempData = await response.json();
            toast.success("Approved participant!");
            setData(tempData.participant);
            setLoading(false);
            setIsApproved(true);
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        }
    }

    async function rejectTicket(){
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/admin/reject-ticket/${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            if (!response.ok) throw new Error("Failed to fetch participant");
            toast.success("Rejected participant!");
            setLoading(false);
            setIsApproved(false);
            navigate("/");
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchParticipant();
    }, [id]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!data) return <p className="text-center p-5">Loading...</p>;

    return (
        <section className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-semibold pb-4">Participant Details</h2>
            <div className="border p-4 rounded-md shadow-lg max-w-md w-full text-left flex flex-col gap-3">
                <p><strong>Name:</strong> {data.name}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Phone:</strong> {data.phone}</p>
                <p><strong>College:</strong> {data.college}</p>
                <p><strong>Transaction ID:</strong> {data.transactionId}</p>
                <p><strong>Technical Event:</strong> {data.technicalEvent}</p>
                <p><strong>Non Technical Event:</strong> {data.nonTechnicalEvent}</p>
                <img src={data.screenshot} alt="screenshot" />
                <div className="w-full flex items-center justify-center gap-2">
                    {!loading && !isApproved && <button className="bg-red-500 text-white py-2 px-6 rounded-md w-full mt-3 cursor-pointer" onClick={rejectTicket} disabled={loading || isApproved}>Reject</button>}
                    <button className="bg-green-500 text-white py-2 px-6 rounded-md mt-3 cursor-pointer w-full" onClick={approveTicket} disabled={loading || isApproved}>{loading ? "Loading..." : isApproved ? "Approved!" : "Accept"}</button>
                </div>
            </div>
        </section>
    );
}

export default SingleParticipant;
