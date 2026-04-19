// NotFound.jsx

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1020] text-white relative overflow-hidden">

      {/* glow background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600 blur-[150px] opacity-20 top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-pink-600 blur-[150px] opacity-20 bottom-[-150px] right-[-150px]" />

      <div className="text-center z-10">
        <h1 className="text-7xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 text-transparent bg-clip-text">
          404
        </h1>

        <p className="text-xl mt-4 text-gray-300 font-semibold">
          Page Not Found
        </p>

        <p className="text-gray-500 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold hover:scale-105 transition"
        >
          🚀 Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;