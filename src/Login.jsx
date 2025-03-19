import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        email:"",
        password:""
    })
    async function login(event) {
        event.preventDefault();
        console.log(admin);
        try {
            if(!admin.email.trim() || !admin.password.trim()){
                toast.error("Please Fill All Fields");
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/admin/login-admin`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    email:admin.email,
                    password:admin.password
                })
            });
            const data = await response.json();
            if(!response.ok){
                toast.error(data.message);
                return;
            }
            sessionStorage.setItem("token",data.adminId);
            toast.success("Login success!");
            navigate("/")
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
          <form className="mt-6" onSubmit={login}>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={admin.email}
                onChange={(e)=>setAdmin({...admin,email:e.target.value})}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={admin.password}
                onChange={(e)=>setAdmin({...admin,password:e.target.value})}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  