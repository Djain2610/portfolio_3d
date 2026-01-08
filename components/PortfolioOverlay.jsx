export default function PortfolioOverlay({ mode, onClose }) {
  if (!mode) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className={`absolute inset-0 transition-all duration-700
          ${
            mode === "focus"
              ? "bg-black"
              : "bg-black/60 backdrop-blur-md"
          }
        `}
      />

      {/* WINDOW */}
      <div className="relative z-10 w-[820px] h-[520px] rounded-xl bg-[#f5f4f2] shadow-2xl border border-black/10 flex flex-col animate-fadeIn">
        {/* TITLE BAR */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
          <span className="text-sm font-medium text-black/70">
            Daksh Jain — Portfolio
          </span>

          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-6 px-6 py-3 text-sm text-black/60 border-b border-black/5">
          <button className="font-medium text-black">About</button>
          <button>Work</button>
          <button>Visuals</button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 px-6 py-5 overflow-hidden text-sm text-black/80">
          {/* Placeholder for now */}
          <p>
            Hi, I’m Daksh — a designer-developer who enjoys building
            thoughtful digital experiences across design, frontend,
            and systems.
          </p>
        </div>
      </div>
    </div>
  );
}
