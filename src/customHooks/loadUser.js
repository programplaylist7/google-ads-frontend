import api from "../api/axios.js";
import { setUser, logout, setLoading } from "../redux/slices/auth/authSlice.js";

export const loadUser = async (dispatch) => {
  try {
    dispatch(setLoading(true)); // 👈 start loading

    const res = await api.get("/auth/userDetail");

    dispatch(setUser(res.data.user));
  } catch (err) {
    dispatch(logout());
  } finally {
    dispatch(setLoading(false)); // 👈 stop loading always
  }
};