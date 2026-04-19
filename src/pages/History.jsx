import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const History = () => {
  const { user } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const navigate = useNavigate();

  const fetchHistory = async () => {
    const loadingToast = toast.loading("Fetching history... ⏳");
    try {
      setLoading(true);
      const res = await api.get("/ads/history");
      setHistory(res.data.history || []);
      toast.success("History loaded successfully 🚀", { id: loadingToast });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load history", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0b1020] font-sans text-white">
      <button
        onClick={() => navigate("/")}
        className="mt-4 ml-4 cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-all hover:scale-105 hover:shadow-violet-500/40"
      >
        🚀 Generate Ads
      </button>
      {/* ── ANIMATED BACKGROUND ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-violet-700/20 blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[100px] animate-pulse [animation-delay:1.5s]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse [animation-delay:3s]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-violet-400/40 animate-bounce"
            style={{
              left: `${8 + i * 8}%`,
              top: `${10 + ((i * 37) % 80)}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.5 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 md:px-8">
        {/* ── HEADER ── */}
        <div className="mb-10 animate-fade-in">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-violet-400">
            Ad Studio
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Generation{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              History
            </span>
          </h1>
          <p className="mt-3 text-sm text-white/40">
            Track, review and reuse your AI-crafted campaigns
          </p>
        </div>

        {/* ── USER + STATS STRIP ── */}
        <div className="mb-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-xl">
          {/* Avatar + name */}
          <div className="col-span-2 flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white shadow-lg shadow-violet-500/30">
              {getInitials(user?.name)}
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">{user?.name}</p>
              <p className="text-xs text-white/35">Creative account</p>
            </div>
          </div>

          {/* Total stat */}
          <div className="flex flex-col items-end justify-center border-l border-white/[0.08] pl-3">
            <p className="text-xs text-white/35 uppercase tracking-widest">
              Total
            </p>
            <p className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-3xl font-bold text-transparent leading-none mt-1">
              {history.length}
            </p>
          </div>
        </div>

        {/* ── SUMMARY CARDS ── */}
        {!loading && history.length > 0 && (
          <div className="mb-8 grid grid-cols-3 gap-3">
            {[
              {
                label: "Campaigns",
                value: history.length,
                color: "from-violet-500 to-indigo-500",
              },
              {
                label: "Ads Generated",
                value: history.reduce(
                  (acc, h) => acc + (h.ads?.ads?.length || 0),
                  0,
                ),
                color: "from-fuchsia-500 to-pink-500",
              },
              {
                label: "Models Used",
                value: new Set(history.map((h) => h.model)).size,
                color: "from-cyan-500 to-teal-500",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.04] p-4 backdrop-blur-lg transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div
                  className={`absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r ${s.color}`}
                />
                <p
                  className={`bg-gradient-to-r ${s.color} bg-clip-text text-2xl font-bold text-transparent`}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-white/35">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── SECTION LABEL ── */}
        {!loading && history.length > 0 && (
          <p className="mb-4 text-[11px] uppercase tracking-[0.15em] text-white/30">
            Recent generations
          </p>
        )}

        {/* ── LOADING STATE ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 text-white/40">
            <div className="mb-5 h-12 w-12 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
            <p className="text-sm">Loading your creative history...</p>
          </div>
        ) : history.length === 0 ? (
          /* ── EMPTY STATE ── */
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-4xl">
              ✨
            </div>
            <p className="text-lg font-medium text-white/60">
              No history found yet
            </p>
            <p className="mt-2 text-sm text-white/25">
              Start generating ads to see them here
            </p>
          </div>
        ) : (
          /* ── CARDS LIST ── */
          <div className="space-y-4">
            {history.map((item, index) => {
              const isOpen = expandedCards[item._id];
              return (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.06]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-violet-500 via-fuchsia-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* ── CARD HEADER ── */}
                  <div className="flex items-start justify-between px-5 pt-5 pb-4">
                    <div>
                      <span className="mb-1.5 inline-block rounded-md bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-violet-400">
                        #{String(index + 1).padStart(3, "0")}
                      </span>
                      <h2 className="text-base font-semibold text-white/90">
                        {item.product}
                      </h2>
                    </div>
                    <span className="text-right text-[11px] leading-5 text-white/25">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      <br />
                      {new Date(item.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* ── TAGS ── */}
                  <div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-5 py-3">
                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-300 ring-1 ring-violet-500/20">
                      {item.model}
                    </span>
                    <span className="rounded-full bg-fuchsia-500/10 px-3 py-1 text-[11px] font-medium text-fuchsia-300 ring-1 ring-fuchsia-500/20">
                      {item.tone}
                    </span>
                    <span className="rounded-full bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-300 ring-1 ring-sky-500/20">
                      {item.audience}
                    </span>
                  </div>

                  {/* ── EXPAND BUTTON ── */}
                  <button
                    onClick={() => toggleCard(item._id)}
                    className="flex w-full items-center justify-center gap-2 border-t border-white/[0.06] py-3 text-[11px] font-medium uppercase tracking-widest text-white/30 transition-all duration-200 hover:text-violet-400"
                  >
                    {isOpen
                      ? "Hide ads"
                      : `Show ${item.ads?.ads?.length || 0} ads`}
                    <svg
                      className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>

                  {/* ── ADS PANEL ── */}
                  {isOpen && (
                    <div className="border-t border-white/[0.06]">
                      {item.ads?.ads?.map((ad, i) => (
                        <div
                          key={i}
                          className="border-b border-white/[0.04] px-5 py-4 last:border-0"
                        >
                          {/* Headlines */}
                          <p className="mb-2 text-[20px] uppercase tracking-[0.2em] text-violet-300 font-bold">
                            ✦ Headlines
                          </p>

                          <div className="mb-5 flex flex-col gap-2">
                            {ad.headlines?.map((h, j) => (
                              <div
                                key={j}
                                className="rounded-xl bg-violet-500/10 border border-violet-500/20 px-4 py-2 text-sm font-semibold text-green-500 leading-relaxed hover:bg-violet-500/15 transition"
                              >
                                {h}
                              </div>
                            ))}
                          </div>

                          {/* Descriptions */}
                          <p className="mb-2 text-[20px] uppercase tracking-[0.2em] text-fuchsia-300 font-bold">
                            ✦ Descriptions
                          </p>

                          <div className="flex flex-col gap-2">
                            {ad.descriptions?.map((d, j) => (
                              <div
                                key={j}
                                className="rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 px-4 py-2 text-xs text-yellow-400 leading-relaxed hover:bg-fuchsia-500/15 transition"
                              >
                                <span className="font-medium text-white/80">
                                  {j + 1}.
                                </span>{" "}
                                {d}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── BOTTOM SPACER ── */}
        <div className="h-16" />
      </div>
    </div>
  );
};

export default History;
