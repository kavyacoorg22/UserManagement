import { useRef, useState } from "react";
import { checkValidation } from "../../../utils/validation";
import { useNavigate } from "react-router-dom";

const Login = () => {
const [isLogin,setLogin]=useState(true)
const [errorMessage,setErrorMessage]=useState(null)
const name=useRef(null)
const email=useRef(null)
const number=useRef(null)
const password=useRef(null)
const confirmPassword=useRef(null)
const navigate=useNavigate()

const handleRegister=async()=>{
  const message=checkValidation(name.current.value,number.current.value,email.current.value,password.current.value,confirmPassword.current.value)
    setErrorMessage(message)
    if(message) return
 
  const data=await fetch('/user/register',{
        method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:name.current.value,
        number:number.current.value,
        email: email.current.value,
        password: password.current.value,
      })
    })
  const res=await data.json()
   if(data.ok)
   {
    alert("Registered Successfully")
    setLogin(true)
   }else{
    setErrorMessage(res.message||"Register Failed")
   }
}

const handleLogin=async()=>{
  const res=await fetch('/user/',{
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
    alert("login is Sucessfull")
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
          {isLogin?"Login":"Register Form"}
        </h1>

        <div className="space-y-4">
          {!isLogin&&(
            <>
           
            <input ref={name}
            type="text"
            placeholder="Enter Name"
            className="w-full py-2 px-3 bg-gray-700/30 text-white border border-gray-600 rounded"
          />
           <input ref={number}
            type="tel"
            placeholder="Enter Phone Number"
            className="w-full py-2 px-3 bg-gray-700/30 text-white border border-gray-600 rounded"
          />
           </>)
          }
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
         {!isLogin&& <input ref={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="w-full py-2 px-3 bg-gray-700/30 text-white border border-gray-600 rounded"
          />}
          <button type="submit" className="w-full py-2 font-bold bg-indigo-500 hover:bg-indigo-600 rounded text-white"
          onClick={()=>isLogin?handleLogin():handleRegister()}
          >
           {isLogin?"Login":"Register"}
          </button>
           {errorMessage&& ( <p className="text-red-600 ">{errorMessage}</p>)}
          <p className="text-center text-sm text-gray-300">
           {isLogin?"Not registered yet":"Already registered?"} <span className="text-indigo-400 cursor-pointer" onClick={()=>setLogin(prev=>!prev)}>{isLogin?"Register":"login"}</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
