import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/auth/authSlice.js";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/common/Loader.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      toast.loading("Logging in...", { id: "login" });

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      dispatch(setUser(res.data.user));

      toast.success("Welcome back 🚀", { id: "login" });

      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed", {
        id: "login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b1020] overflow-hidden font-sans text-white">
      {loading && <Loader />}

      {/* 🌌 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600 blur-[150px] opacity-20 top-[-120px] left-[-120px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600 blur-[150px] opacity-20 bottom-[-120px] right-[-120px]" />

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-[#11162a] rounded-2xl p-8">
          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-400 to-pink-400 text-transparent bg-clip-text">
            Welcome Back
          </h2>

          <p className="text-center text-gray-400 text-sm mt-2 mb-6">
            Login to continue creating AI ads 🚀
          </p>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.02] transition"
            >
              {loading ? "Logging in..." : "🚀 Login"}
            </button>
          </form>

          {/* SIGNUP LINK */}
          <p className="text-center text-sm text-gray-400 mt-5">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 hover:text-pink-400 transition font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
