"use client";
import { useState, useEffect } from "react";

const PROJECT_DATA = {
  NEXUS: {
    title: "NEXUS",
    desc: "AI App Store of the Future",
    cover: {
      type: "image",
      src: "/projects/nexus/cover.png",
    },
    role: "Product Designer",
    scope: "Discovery UX · IA · Interaction Design · Visual Design",
    problem:
      "There was no unified interface for discovering, comparing, and evaluating AI apps, models, and datasets. Exploration was fragmented across platforms, leading to inconsistent mental models and cognitive overload.",
    system: [
      "Core entities: Apps · Models · Datasets",
      "Unified discovery stream instead of isolated sections",
      "Primary flow: Discover → Filter → Compare → Explore",
      "Lateral navigation across entities without losing context",
    ],
    visuals: [
      { type: "video", src: "/projects/nexus/filter-demo.mp4" },
      { type: "image", src: "/projects/nexus/system-map.png" },
      { type: "image", src: "/projects/nexus/discovery-ui.png" },
    ],
    links: {
      behance:
        "https://www.behance.net/gallery/228834797/Nexus-AI-App-store-of-the-Future",
    },
  },

  "Student Space": {
    title: "Student Space",
    desc: "ERP & CRM platform for schools",
    cover: {
      type: "image",
      src: "/projects/student-space/cover.png",
    },
    role: "UX Designer",
    scope: "Role-based UX · Navigation · Dashboard Systems · React",
    problem:
      "School operations were spread across disconnected tools, making everyday workflows difficult to manage for different user roles.",
    system: [
      "Roles: Students · Parents · Teachers · Administrators",
      "Role-specific dashboards to reduce feature overload",
      "Task-first navigation instead of feature-based grouping",
    ],
    visuals: [
      { type: "image", src: "/projects/student-space/roles-overview.png" },
      { type: "image", src: "/projects/student-space/dashboard.png" },
      { type: "image", src: "/projects/student-space/task-flow.png" },
    ],
    links: {
      github: "https://github.com/yogesh567894/student-space",
      live: "https://student-space-delta.vercel.app/",
    },
  },

  "Kubernetes Failure Prediction": {
    title: "Kubernetes Failure Prediction",
    desc: "K8S Anomaly Detection & Remediation System",
    cover: {
      type: "image",
      src: "/projects/k8s/cover.png",
    },
    role: "UX + Engineering",
    scope: "Systems Thinking · Kubernetes · Python · UX",
    problem:
      "Infrastructure failures were often detected too late, leading to downtime and delayed remediation responses.",
    system: [
      "Signal-based monitoring instead of raw metrics overload",
      "Anomaly prediction tied to failure conditions",
      "Automated remediation actions linked to alerts",
    ],
    visuals: [
      { type: "image", src: "/projects/k8s/system-flow.png" },
      { type: "image", src: "/projects/k8s/dashboard.png" },
    ],
    links: {
      github:
        "https://github.com/Djain2610/K8S-Anomaly-Detection-and-Remediation",
      live:
        "https://k8-s-anomaly-detection-and-remediat.vercel.app/",
    },
  },

  "E-Volve": {
    title: "E-Volve",
    desc: "E-waste Disposal & Recycling Platform",
    cover: {
      type: "image",
      src: "/projects/evolve/cover.png",
    },
    role: "Product Designer",
    scope: "Service Design · UX · Location-based Flows",
    problem:
      "Users lacked a clear and reliable way to dispose of e-waste responsibly while connecting with verified collectors.",
    system: [
      "User → Pickup request → Collector matching",
      "Location-based discovery and scheduling",
      "Service-style flow inspired by on-demand platforms",
    ],
    visuals: [
      { type: "video", src: "/projects/evolve/filter-demo.mp4" },
      { type: "image", src: "/projects/evolve/service-flow.png" },
      { type: "image", src: "/projects/evolve/ui-screens.png" },
    ],
    links: {
      behance:
        "https://www.behance.net/gallery/218242659/E-Volve",
    },
  },
};

const VISUALS_DATA = {
  motionDesign: [
    { type: "video", src: "/visuals/motion/animation-1.mp4" },
    { type: "video", src: "/visuals/motion/animation-2.mp4" },
  ],
  graphicDesign: [
    { type: "image", src: "/visuals/graphics/design-1.png" },
    { type: "image", src: "/visuals/graphics/design-2.png" },
    { type: "image", src: "/visuals/graphics/design-3.png" },
  ],
};

export default function PortfolioOverlay({ mode, onClose }) {
  const [tab, setTab] = useState("about");
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (!mode) return;
    const stopKeys = (e) => e.stopPropagation();
    window.addEventListener("keydown", stopKeys, true);
    return () => window.removeEventListener("keydown", stopKeys, true);
  }, [mode]);

  if (!mode) return null;

  return (
    <>
      <div className="absolute inset-0 z-50">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

        <div className="absolute inset-8 rounded-2xl bg-[#0f0f0f] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden flex animate-fadeIn">

          {/* LEFT RAIL */}
          <aside className="w-[240px] bg-gradient-to-b from-[#141414] to-[#0b0b0b] border-r border-white/10 p-6 flex flex-col">
            <div className="mb-10">
              <h1 className="text-xl font-semibold tracking-tight">
                Daksh Jain
              </h1>
              <p className="text-xs text-white/50 mt-1">
                Product Designer · Systems Thinker
              </p>
            </div>

            <nav className="space-y-3">
              {[
                ["about", "Studio"],
                ["work", "Experiments"],
                ["visuals", "Visuals"],
                ["resume", "Resume"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`group flex items-center gap-3 text-sm transition ${
                    tab === id
                      ? "text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      tab === id
                        ? "bg-white"
                        : "bg-white/20 group-hover:bg-white"
                    }`}
                  />
                  {label}
                </button>
              ))}
            </nav>

            <div className="mt-auto text-[11px] text-white/30">
              Built with React · Three.js · Spatial UI
            </div>
          </aside>

          {/* MAIN */}
          <section className="flex-1 relative overflow-hidden">
            <header className="flex justify-between items-center px-8 py-5 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-white/40">
                {tab}
              </span>
              <button
                onClick={onClose}
                className="text-xs text-white/60 hover:text-white transition"
              >
                Close ✕
              </button>
            </header>

            <main className="relative h-full px-10 py-10 overflow-y-auto">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "url('https://grainy-gradients.vercel.app/noise.svg')",
                }}
              />

              {tab === "about" && (
                <div className="relative z-10 max-w-[720px]">
                  <h2 className="text-5xl font-semibold leading-tight">
                    I design systems.<br />I ship interfaces that survive scale.
                  </h2>

                  <p className="mt-6 text-white/70 text-lg">
                    This portfolio is a spatial interface — not a scroll page.
                  </p>

                  <p className="mt-4 text-white/60">
                    I'm a Product Designer with a strong engineering background, focused on workflow-heavy platforms, multi-role systems, and real-world constraints. I enjoy translating complex logic into clear, usable experiences and often collaborate closely with frontend implementation to keep design decisions grounded in reality.
                  </p>

                  <p className="mt-4 text-white/60">
                    My work sits at the intersection of UX, systems thinking, interaction design, and visual clarity — treating products as evolving systems rather than static screens.
                  </p>
                </div>
              )}

              {tab === "work" && (
                <div className="grid grid-cols-2 gap-8 max-w-[1000px] relative z-10">
                  {Object.keys(PROJECT_DATA).map((key) => {
                    const project = PROJECT_DATA[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveProject(project)}
                        className="group rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition overflow-hidden hover:-translate-y-1 text-left"
                      >
                        {/* COVER */}
                        <div className="h-[180px] bg-white/10 relative overflow-hidden">
                          {project.cover?.type === "video" ? (
                            <video
                              src={project.cover.src}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="w-full h-full object-cover opacity-80"
                            />
                          ) : (
                            <img
                              src={project.cover.src}
                              alt={`${project.title} cover`}
                              className="w-full h-full object-cover opacity-80"
                            />
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-medium">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm text-white/60">
                            {project.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {tab === "visuals" && (
                <div className="relative z-10 max-w-[1000px] space-y-6">
                  {/* Motion Design Videos */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium">Motion Design</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {VISUALS_DATA.motionDesign.map((v, i) =>
                        v.type === "video" ? (
                          <video
                            key={`motion-${i}`}
                            src={v.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-[240px] rounded-xl border border-white/10 bg-black object-cover"
                          />
                        ) : (
                          <img
                            key={`motion-${i}`}
                            src={v.src}
                            alt={`Motion Design ${i + 1}`}
                            className="w-full h-[240px] rounded-xl border border-white/10 bg-black object-cover"
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* Graphic Design Images */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium">Graphic Design</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {VISUALS_DATA.graphicDesign.map((v, i) =>
                        v.type === "video" ? (
                          <video
                            key={`graphic-${i}`}
                            src={v.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-[240px] rounded-xl border border-white/10 bg-black object-cover"
                          />
                        ) : (
                          <img
                            key={`graphic-${i}`}
                            src={v.src}
                            alt={`Graphic Design ${i + 1}`}
                            className="w-full h-[240px] rounded-xl border border-white/10 bg-black object-cover"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {tab === "resume" && (
                <div className="relative z-10 max-w-[600px]">
                  <h2 className="text-4xl font-semibold mb-6">Connect</h2>
                  <p className="text-white/70 text-lg mb-8">
                    Feel free to reach out or explore my work.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Links</h3>
                      <div className="space-y-2 text-white/60">
                        <a href="https://www.behance.net/dakshjain11" className="block hover:text-white transition">Behance</a>
                        <a href="https://www.linkedin.com/in/daksh-sanklecha-6b640a251/" className="block hover:text-white transition">LinkedIn</a>
                        <a href="https://github.com/Djain2610" className="block hover:text-white transition">GitHub</a>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Contact</h3>
                      <div className="space-y-2 text-white/60">
                        <p>Email: jaindaksh2610@gmail.com</p>
                        <p>Phone: +91 90805 83742</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <a
                        href="https://drive.google.com/file/d/12Kxt_Amt6gj3neysaFa2oYKl-PtxF9cH/view?usp=sharing"
                        className="inline-block px-4 py-2 border border-white/20 rounded-lg text-white/60 hover:text-white hover:border-white/40 transition"
                      >
                        Download Resume (PDF)
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </section>
        </div>
      </div>

      {/* PROJECT OVERLAY */}
      {activeProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setActiveProject(null)}
          />

          <div className="relative w-[90%] max-w-[1100px] h-[80%] bg-[#0b0b0b] rounded-2xl border border-white/10 flex projectOverlay">
            <div className="w-1/2 p-8 overflow-y-auto">
              <h2 className="text-3xl font-semibold">
                {activeProject.title}
              </h2>
              <p className="text-white/50 mt-1">{activeProject.desc}</p>

              <p className="mt-4 text-sm text-white/60">
                <strong>Role:</strong> {activeProject.role}
                <br />
                <strong>Scope:</strong> {activeProject.scope}
              </p>

              <p className="mt-6 text-white/70">
                {activeProject.problem}
              </p>

              <ul className="mt-4 space-y-1 text-sm text-white/60">
                {activeProject.system.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>

              <div className="mt-6 flex gap-4 text-xs">
                {activeProject.links.behance && (
                  <a
                    href={activeProject.links.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Behance →
                  </a>
                )}
                {activeProject.links.github && (
                  <a
                    href={activeProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub →
                  </a>
                )}
                {activeProject.links.live && (
                  <a
                    href={activeProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live →
                  </a>
                )}
              </div>
            </div>

            <div className="w-1/2 p-6 overflow-y-auto space-y-4">
              {activeProject.visuals.map((v, i) =>
                v.type === "video" ? (
                  <video
                    key={i}
                    src={v.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full rounded-xl border border-white/10 bg-black"
                  />
                ) : (
                  <img
                    key={i}
                    src={v.src}
                    className="w-full rounded-xl border border-white/10 bg-black"
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .projectOverlay {
          animation: scaleIn 160ms ease-out;
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}