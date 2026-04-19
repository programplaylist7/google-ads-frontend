import api from "../api/axios";
import { logout as logoutAction } from "../redux/slices/auth/authSlice.js";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // call backend

      dispatch(logoutAction()); // clear redux state
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return handleLogout;
};

export default useLogout;