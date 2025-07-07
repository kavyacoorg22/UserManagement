
import { HiHome } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";


const Header=()=>{
  return(
    <div className="text-white flex justify-between px-16  py-3 text-2xl 	bg-slate-800 ">
      <HiHome /> 
      <MdLogout />
    </div>
  )
}

export default Header;