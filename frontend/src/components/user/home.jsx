import Header from "./header";
import Profile from "./profile";
import AdminPanal from "../admin/adminPanel";
import {  useSelector } from "react-redux";




const Home = () => {
 
  const currentUser = useSelector((store) => store.user.currentUser);
  const currentAdmin = useSelector((store) => store.admin.currentAdmin);



  return (
    <div className="text-white">
      <Header />
     
      {currentAdmin ? <AdminPanal /> : <Profile />}
    
    </div>
  );
};

export default Home;
