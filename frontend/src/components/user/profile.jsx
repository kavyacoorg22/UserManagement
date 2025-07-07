import { useRef, useState } from "react";
import { DEFAULT_IMG } from "../../../utils/constants";
import { useSelector ,useDispatch} from "react-redux";
import { updateProfileImage} from '../../../utils/userSlice'

const Profile = () => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const currentUser=useSelector((Store)=>Store.user.currentUser)

 
 const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    setPreview(URL.createObjectURL(file));

   
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/user/upload-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Image uploaded");
        dispatch(updateProfileImage(data.user.image))
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    }
  }
};

  const handleClick = () => {
    fileInputRef.current.click();
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-blue-300 rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <div onClick={handleClick} className="relative group cursor-pointer mx-auto w-32 h-32">
          <img
              src={ preview ||(currentUser?.image? currentUser.image.startsWith("http") ? currentUser.image : `http://localhost:3032/${currentUser.image}` : DEFAULT_IMG)}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md group-hover:opacity-80 transition duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition">
            <span className="text-white text-sm">Click to Change</span>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />

        <h4 className="text-xl font-semibold text-black mt-4">{currentUser.name}</h4>
        <h5 className="text-sm text-black">{currentUser.email}</h5>
        <h5 className="text-sm text-black">{currentUser.number}</h5>
        <p className="mt-3 text-amber-700">Developer with a love for React & Tailwind.</p>
      </div>
    </div>
  );
};

export default Profile;
