import { HiHome } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../utils/userSlice";
import { removeAdmin } from "../../../utils/adminSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentAdmin = useSelector((state) => state.admin.currentAdmin);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = async () => {
    try {
      let endpoint = "";
      if (currentAdmin) {
        endpoint = "/admin/logout";
      } else if (currentUser) {
        endpoint = "/user/logout";
      }

      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include", 
      });

      const data = await res.json();

      if (res.ok) {
        if (currentAdmin) {
          dispatch(removeAdmin());
          navigate("/login");
        } else if (currentUser) {
          dispatch(logoutUser());
          navigate("/");
        }
      } else {
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error", err);
      alert("Logout failed");
    }
  };

  return (
    <div className="text-white flex justify-between px-16 py-3 text-2xl bg-slate-800">
      <HiHome className="cursor-pointer" onClick={() => navigate("/")} />
      <button onClick={handleLogout}>
        <MdLogout />
      </button>
    
    </div>
  );
};

export default Header;
