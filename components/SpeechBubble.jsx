"use client";

export default function Bubble({ text }) {
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        color: "#111",
        padding: "10px 14px",
        borderRadius: "14px",
        fontSize: "13px",
        fontWeight: 500,
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        whiteSpace: "nowrap",
        userSelect: "none",

        // micro animations
        animation: "bubbleIn 0.25s ease-out, bubbleFloat 2.5s ease-in-out infinite",
      }}
    >
      {text}

      {/* tail */}
      <div
        style={{
          position: "absolute",
          bottom: "-6px",
          left: "50%",
          width: "12px",
          height: "12px",
          background: "white",
          transform: "translateX(-50%) rotate(45deg)",
        }}
      />

      {/* keyframes */}
      <style>
        {`
          @keyframes bubbleIn {
            from {
              opacity: 0;
              transform: scale(0.85);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes bubbleFloat {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-4px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
