const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        
        {/* spinning gradient circle */}
        <div className="h-14 w-14 rounded-full border-4 border-white/30 border-t-indigo-500 animate-spin"></div>

        {/* text */}
        <p className="text-white text-sm font-medium animate-pulse">
          Please wait...
        </p>
      </div>
    </div>
  );
};

export default Loader;