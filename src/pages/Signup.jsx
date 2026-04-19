import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/common/Loader.jsx";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      toast.loading("Creating account...", { id: "signup" });

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Welcome aboard 🎉", { id: "signup" });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Signup failed", {
        id: "signup",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0b1020] overflow-hidden font-sans text-white">
      {loading && <Loader />}

      {/* 🌌 background glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-500 blur-[150px] opacity-20 top-[-120px] left-[-120px]" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-500 blur-[150px] opacity-20 bottom-[-120px] right-[-120px]" />

      {/* SIGNUP CARD */}
      <div className="relative z-10 w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500">
        <div className="bg-[#11162a] rounded-2xl p-8">
          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Create Account
          </h2>

          <p className="text-center text-gray-400 text-sm mt-2 mb-6">
            Join AI Ads Studio 🚀
          </p>

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-green-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-green-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-green-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-indigo-500 hover:scale-[1.02] transition"
            >
              {loading ? "Creating..." : "✨ Create Account"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-400 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-400 hover:text-indigo-400 transition font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
