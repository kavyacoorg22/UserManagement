import { useRef, useState } from "react";
import { checkValidation } from "../../../utils/validation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../../utils/userSlice";
import { setAdmin } from "../../../utils/adminSlice";

const AdminLogin = () => {
const [errorMessage,setErrorMessage]=useState(null)
const email=useRef(null)
const password=useRef(null)
const navigate=useNavigate()
const dispatch=useDispatch()

const handleLogin=async()=>{
  const res=await fetch('/admin/',{
    method:"POST",
     headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      })
   })
   const data=await res.json()
   if(res.ok)
   {
    alert("login Sucessful")
   localStorage.setItem("token",data.token)
   dispatch(setAdmin(data.admin))
   navigate('/home')
   }else
   {
    setErrorMessage(data.message||"Login failed")
   }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-md bg-gray-800 p-8 rounded shadow-md"
      >
        <h1 className="text-indigo-400 text-2xl font-semibold mb-6 text-center">
          Login
        </h1>

        <div className="space-y-4">
         <input ref={email}
            type="text"
            placeholder="Enter Email"
            className="w-full py-2 px-3 bg-gray-700/30 text-white border border-gray-600 rounded"
          />
         
          <input ref={password}
            type="password"
            placeholder="Enter Password"
            className="w-full py-2 px-3 bg-gray-700/30 text-white border border-gray-600 rounded"
          />
         
          <button type="submit" className="w-full py-2 font-bold bg-indigo-500 hover:bg-indigo-600 rounded text-white"
          onClick={handleLogin}
          >
           Login
          </button>
           {errorMessage&& ( <p className="text-red-600 ">{errorMessage}</p>)}
          
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
