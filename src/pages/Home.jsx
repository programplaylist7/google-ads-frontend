import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../customHooks/useLogout.js";
import api from "../api/axios";
import toast from "react-hot-toast";
import { setUser } from "../redux/slices/auth/authSlice.js";
import GenerationLoader from "../components/common/GenerationLoader.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const logout = useLogout();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("professional");
  const [model, setModel] = useState("Gemini");

  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);

  const handleGenerate = async () => {
    if (!product || !audience || !tone) {
      return toast.error("Please fill all fields");
    }

    if ((user?.quota ?? 0) <= 0) {
      return toast.error("❌ No quota left. Please upgrade your plan.");
    }

    const loadingToast = toast.loading("Generating ads... 🤖");

    try {
      setLoading(true);

      const res = await api.post(`/ads/generate/${model}`, {
        product,
        audience,
        tone,
      });

      toast.dismiss(loadingToast);

      setAds(res.data.ads?.ads || []);

      dispatch(
        setUser({
          ...user,
          quota: res.data.quota,
        }),
      );

      toast.success(`Ads generated 🎉 (Quota left: ${res.data.quota})`);
    } catch (err) {
      toast.dismiss(loadingToast);

      const msg = err?.response?.data?.message;
      const code = err?.response?.data?.code;

      if (code === "QUOTA_EXCEEDED") {
        return toast.error("❌ Quota exhausted");
      }

      if (code === "NO_TOKEN" || code === "TOKEN_EXPIRED") {
        return toast.error("Session expired");
      }

      toast.error(msg || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b1020] text-white overflow-hidden font-sans">
      {/* 🌌 background glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600 blur-[150px] opacity-20 top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600 blur-[150px] opacity-20 bottom-[-150px] right-[-150px]" />

      {/* LOADER */}
      {loading && <GenerationLoader />}

      {/* TOP NAV */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="animate-fadeIn">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              🚀 AdGen AI Studio
            </h1>
            <p className="text-gray-400 text-sm">Smart Ads Generator</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-gray-400 text-xs">Logged in as</p>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-xs text-purple-300">
                Quota: {user?.quota ?? 0}
              </p>
            </div>

            {/* 👇 NEW: History Button */}
            <button
              onClick={() => navigate("/history")}
              className="px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-400/30 transition text-sm"
            >
              📜 History
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 border border-red-400/30 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
        {/* FORM */}
        <div className="lg:col-span-2 p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="bg-[#11162a] rounded-2xl p-6 space-y-5">
            <h2 className="text-2xl font-bold">
              🎯 Create High-Converting Ads
            </h2>

            <p className="text-gray-400 text-sm">
              Fill details and generate AI marketing copy
            </p>

            <input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Product / Service"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
            />

            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Target Audience"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-indigo-400"
            />

            <div className="grid grid-cols-2 gap-4">
              {/* TONE */}
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="p-3 rounded-xl bg-[#0f172a] text-white border border-white/10 outline-none"
              >
                <option
                  value="professional"
                  className="bg-[#0f172a] text-white"
                >
                  Professional
                </option>
                <option value="friendly" className="bg-[#0f172a] text-white">
                  Friendly
                </option>
                <option value="funny" className="bg-[#0f172a] text-white">
                  Funny
                </option>
                <option value="luxury" className="bg-[#0f172a] text-white">
                  Luxury
                </option>
              </select>

              {/* MODEL */}
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="p-3 rounded-xl bg-[#0f172a] text-white border border-white/10 outline-none"
              >
                <option value="Gemini" className="bg-[#0f172a] text-white">
                  Gemini
                </option>
                <option value="Groq" className="bg-[#0f172a] text-white">
                  Groq
                </option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-[1.02] transition"
            >
              🚀 Generate Ads
            </button>
          </div>
        </div>

        {/* SIDE CARD */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <p className="text-gray-400">Account Status</p>
          <h3 className="text-5xl font-bold text-purple-400 mt-2">
            {user?.quota ?? 0}
          </h3>
          <p className="text-gray-500 mt-2">Generations left</p>
        </div>
      </div>

      {/* OUTPUT */}
      <div className="relative z-10 max-w-7xl mx-auto w-[80%] p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">📦 Generated Ads</h2>

        {ads.length === 0 ? (
          <p className="text-gray-500">No ads yet 🚀</p>
        ) : (
          <div className="grid gap-5">
            {ads.map((item, index) => (
              <div
                key={index}
                className="p-[1px] rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500"
              >
                <div className="bg-[#11162a] p-5 rounded-xl">
                  <h3 className="text-indigo-300 font-semibold mb-3">
                    Ad Set {index + 1}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">
                        ✨ Headlines
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.headlines?.map((h, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-lg text-xs font-medium border border-indigo-400/20 hover:bg-indigo-500/30 transition"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase mt-3">
                        📝 Description
                      </p>
                      <div className="mt-2 flex flex-col gap-2">
                        {item.descriptions?.map((d, i) => (
                          <p
                            key={i}
                            className="text-sm text-pink-200/90 font-medium bg-pink-500/10 border border-pink-400/20 rounded-lg px-3 py-2 leading-relaxed"
                          >
                            <span className="font-semibold text-pink-300">
                              •
                            </span>{" "}
                            {d}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* animations */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
