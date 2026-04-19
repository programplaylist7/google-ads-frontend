const GenerationLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      
      {/* Loader Card */}
      <div className="bg-white px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">

        {/* Spinning Ring */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>

          <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Text */}
        <p className="text-indigo-600 font-semibold text-sm tracking-wide">
          Generating AI Ads...
        </p>

        {/* Subtext */}
        <p className="text-gray-400 text-xs">
          Please wait a moment ✨
        </p>
      </div>
    </div>
  );
};

export default GenerationLoader;