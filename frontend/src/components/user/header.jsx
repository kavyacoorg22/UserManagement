import { HiHome } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../utils/userSlice";
import { useNavigate } from "react-router-dom";


const Header=()=>{
 const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(logoutUser())
   navigate('/')
  }
  return(
    <div className="text-white flex justify-between px-16  py-3 text-2xl 	bg-slate-800 ">
      <HiHome /> 
      <button onClick={handleLogout}>
        <MdLogout />
      </button>
     
    </div>
  )
}

export default Header;