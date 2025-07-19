import { replace } from "react-router-dom";
import { setCurrentUser} from "./userSlice";
import { toast } from "react-toastify";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  try {
    const res = await fetch("/user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
       credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Login Successful ");
      dispatch(setCurrentUser(data.user));
      
      navigate("/home",{replace:true});
    } else {
      toast.error(data.message || "Login Failed ");
    }
  } catch (err) {
    toast.error("Network Error");
  }
};

export const registerUser = (formData, setLogin, setErrorMessage) => async (dispatch) => {
  try {
    const res = await fetch("/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Registered Successfully");
      setLogin(true);
    } else {
      
      toast.error(data.message || "Register Failed");
    }
  } catch (err) {
    setErrorMessage("Network error");
    toast.error("Network error");
  }
};
