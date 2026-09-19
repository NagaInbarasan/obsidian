import { Link } from "react-router-dom"
import {
  Star, Target, AlertTriangle, TrendingUp, ArrowRight,
  Zap, CheckCircle2, BarChart2, ChevronRight,
  Bot, Send, Code2, Database, Cpu, BrainCircuit, Activity
} from "lucide-react"
import AnimatedList from "@/components/ui/AnimatedList"
import Carousel from "@/components/ui/Carousel"
import SpotlightCard from "@/components/ui/SpotlightCard"

// ── Circular SVG ring helper ─────────────────────────────────────
function Ring({
  pct, size, stroke, track, strokeW, children
}: {
  pct: number; size: number; stroke: string; track: string;
  strokeW: number; children?: React.ReactNode
}) {
  const r = (size - strokeW) / 2
  const circ = 2 * Math.PI * r
  const off = circ - (pct / 100) * circ
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={strokeW} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={stroke}
          strokeWidth={strokeW} strokeDasharray={circ} strokeDashoffset={off}
          strokeLinecap="round" />
      </svg>
      <div className="relative z-10 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}

// ── Skill icon badges ────────────────────────────────────────────
const skillIcons: Record<string, { bg: string; icon: React.ReactNode }> = {
  Python:  { bg: "#3b4cca", icon: <span className="text-white font-bold text-[10px]">Py</span> },
  React:   { bg: "#f97316", icon: <span className="text-white font-bold text-[10px]">Re</span> },
  SQL:     { bg: "#3b82f6", icon: <Database className="w-3 h-3 text-white" /> },
  "AI/ML": { bg: "#ef4444", icon: <Cpu className="w-3 h-3 text-white" /> },
  "Node.js":{ bg: "#22c55e", icon: <Code2 className="w-3 h-3 text-white" /> },
}

// ── Opportunity icon badges ──────────────────────────────────────
const oppIcons: Record<string, { bg: string; icon: React.ReactNode }> = {
  "Full Stack Developer": { bg: "#e0eaff", icon: <Code2 className="w-5 h-5 text-blue-600" /> },
  "Data Analyst":         { bg: "#dcfce7", icon: <BarChart2 className="w-5 h-5 text-emerald-600" /> },
  "AI/ML Engineer":       { bg: "#f3e8ff", icon: <BrainCircuit className="w-5 h-5 text-purple-600" /> },
}

export function DashboardPage() {
  return (
    <div className="flex gap-5 h-full min-h-0 p-5">

      {/* ══════════════════════════════════════════════
          LEFT + CENTER COLUMN
      ══════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0 flex flex-col gap-4 overflow-y-auto pr-1 relative z-10">

        {/* ── 1. GREETING HERO ──────────────────────── */}
        <SpotlightCard className="!p-0 !border-0 !bg-transparent rounded-2xl border border-blue-100 shadow-sm" spotlightColor="rgba(59, 130, 246, 0.1)">
          <div className="bg-white/60 backdrop-blur-md px-7 py-5 flex items-start justify-between rounded-2xl border border-blue-100 h-full w-full">
            <div>
            <p className="text-slate-500 text-sm font-medium">Good Morning,</p>
            <h1 className="text-[2rem] font-extrabold text-slate-900 leading-tight flex items-center gap-2">
              Vikashini <span>🌤️</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Your journey to the right opportunity starts with your skills.
            </p>
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-blue-400 italic text-sm leading-relaxed font-medium">
              "New skills,<br />new opportunities,<br />a brighter you."
            </p>
          </div>
          </div>
        </SpotlightCard>

        {/* ── 2. KPI CARDS ───────────────────────────── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Skill Strength",     value: "82%", delta: "+12", pos: true,  Icon: Star,         iconBg: "#eff6ff", iconClr: "#3b82f6", bar: 82, barClr: "#3b82f6" },
            { label: "Role Compatibility", value: "87%", delta: "+9",  pos: true,  Icon: Target,       iconBg: "#e0f9ff", iconClr: "#0ea5e9", bar: 87, barClr: "#0ea5e9" },
            { label: "Skill Gaps",         value: "4",   delta: "↓ 2", pos: false, Icon: AlertTriangle,iconBg: "#fff1f2", iconClr: "#ef4444", bar: 40, barClr: "#f87171" },
            { label: "Career Progress",    value: "68%", delta: "+15", pos: true,  Icon: TrendingUp,   iconBg: "#f0fdf4", iconClr: "#22c55e", bar: 68, barClr: "#8b5cf6" },
          ].map((k) => (
            <SpotlightCard key={k.label} className="!p-4 bg-white/80 backdrop-blur-md border border-blue-100 shadow-sm rounded-2xl flex flex-col gap-2" spotlightColor="rgba(59, 130, 246, 0.15)">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: k.iconBg }}>
                  <k.Icon className="w-4 h-4" style={{ color: k.iconClr }} />
                </div>
                <span className={`text-xs font-bold ${k.pos ? "text-emerald-500" : "text-red-500"}`}>
                  {k.pos ? "↑ " : ""}{k.delta}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900">{k.value}</div>
              <div className="text-xs text-slate-500">{k.label}</div>
              <div className="h-1.5 rounded-full bg-slate-100 mt-1">
                <div className="h-1.5 rounded-full" style={{ width: `${k.bar}%`, background: k.barClr }} />
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* ── 3. MY SKILLS + RECENT ACTIVITY ─────────── */}
        <div className="grid grid-cols-2 gap-4">

          {/* My Skills */}
          <SpotlightCard className="!p-5 bg-white/80 backdrop-blur-md border border-blue-100 shadow-sm rounded-2xl" spotlightColor="rgba(59, 130, 246, 0.1)">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-slate-900 text-sm">My Skills</span>
              </div>
              <Link to="/hr" className="text-xs text-blue-500 font-semibold flex items-center gap-0.5 hover:text-blue-700">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3.5">
              {[
                { name: "Python",   pct: 90, bar: "#3b82f6" },
                { name: "React",    pct: 85, bar: "#0ea5e9" },
                { name: "SQL",      pct: 75, bar: "#6366f1" },
                { name: "AI/ML",    pct: 60, bar: "linear-gradient(90deg,#a855f7,#ec4899)" },
                { name: "Node.js",  pct: 50, bar: "#22c55e" },
              ].map((s) => {
                const si = skillIcons[s.name]
                return (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: si.bg }}>
                      {si.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-700">{s.name}</span>
                        <span className="text-xs font-bold text-slate-900">{s.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full" style={{ width: `${s.pct}%`, background: s.bar }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </SpotlightCard>

          {/* Recent Activity */}
          <SpotlightCard className="!p-5 bg-white/80 backdrop-blur-md border border-blue-100 shadow-sm rounded-2xl" spotlightColor="rgba(59, 130, 246, 0.1)">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-slate-900 text-sm">Recent Activity</span>
              </div>
              <Link to="/employees" className="text-xs text-blue-500 font-semibold flex items-center gap-0.5 hover:text-blue-700">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="mt-2">
              <AnimatedList
                className="w-full"
                displayScrollbar={false}
                showGradients={false}
                // @ts-ignore
                items={[
                  { Icon: BrainCircuit, bg:"#eff6ff", clr:"text-blue-600",
                    title:"Skill analysis completed",
                    desc: "Your resume has been analyzed by Gemini AI", time:"2 hours ago" },
                  { Icon: CheckCircle2, bg:"#f0fdf4", clr:"text-emerald-600",
                    title:"Matched with 3 new roles",
                    desc: "Based on your updated skill profile", time:"3 hours ago" },
                  { Icon: BarChart2, bg:"#fffbeb", clr:"text-amber-600",
                    title:"Skill gap analysis updated",
                    desc: "New recommendations available for AI/ML Engineer", time:"5 hours ago" },
                ].map((a) => (
                  <div key={a.title} className="flex items-start gap-3 w-full">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: a.bg }}>
                      <a.Icon className={`w-4 h-4 ${a.clr}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 leading-tight">{a.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-snug">{a.desc}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">{a.time}</span>
                  </div>
                ))}
              />
            </div>
          </SpotlightCard>
        </div>

        {/* ── 4. RECOMMENDED INTERNAL OPPORTUNITIES ──── */}
        <SpotlightCard className="!p-5 bg-white/80 backdrop-blur-md border border-blue-100 shadow-sm rounded-2xl" spotlightColor="rgba(59, 130, 246, 0.1)">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                </svg>
              </div>
              <span className="font-bold text-slate-900 text-sm">Recommended Internal Opportunities</span>
            </div>
            <Link to="/opportunities" className="text-xs text-blue-500 font-semibold flex items-center gap-0.5 hover:text-blue-700">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-4 -ml-4">
            <Carousel
              baseWidth={280}
              autoplay={true}
              autoplayDelay={4000}
              pauseOnHover={true}
              loop={true}
              // @ts-ignore
              items={[
                {
                  id: 1,
                  title: "Full Stack Developer", dept: "Engineering", exp: "2+ Years",
                  badge: "High Match", badgeBg: "#eff6ff", badgeClr: "#2563eb",
                  pct: 87, ringClr: "#3b82f6",
                  desc: "Your React, Node.js and database experience closely matches this role.",
                },
                {
                  id: 2,
                  title: "Data Analyst", dept: "Data & Analytics", exp: "2-4 Years",
                  badge: "Good Match", badgeBg: "#f0fdf4", badgeClr: "#16a34a",
                  pct: 76, ringClr: "#22c55e",
                  desc: "Your SQL and data analysis skills are relevant to this role.",
                },
                {
                  id: 3,
                  title: "AI/ML Engineer", dept: "R&D", exp: "1-3 Years",
                  badge: "Potential", badgeBg: "#fdf4ff", badgeClr: "#9333ea",
                  pct: 62, ringClr: "#a855f7",
                  desc: "You have strong Python and ML basics. Some skills are missing.",
                },
              ].map((opp) => {
                const oi = oppIcons[opp.title]
                return {
                  id: opp.id,
                  icon: oi.icon,
                  title: (
                    <div className="flex items-start justify-between gap-2 w-full">
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{opp.title}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{opp.dept} · {opp.exp}</p>
                      </div>
                      <span className="text-[10px] font-bold rounded-full px-2 py-0.5 shrink-0"
                        style={{ background: opp.badgeBg, color: opp.badgeClr }}>
                        {opp.badge}
                      </span>
                    </div>
                  ),
                  description: (
                    <div className="flex flex-col h-full w-full">
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{opp.desc}</p>
                      
                      {/* Match ring + button */}
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <Ring pct={opp.pct} size={40} stroke={opp.ringClr} track="#e0eaff" strokeW={4}>
                            <span className="text-[10px] font-extrabold text-slate-800">{opp.pct}%</span>
                          </Ring>
                          <span className="text-[9px] text-slate-400 font-medium leading-tight">Match<br/>Score</span>
                        </div>
                        <Link to="/opportunities"
                          className="flex items-center gap-1 text-[10px] font-bold text-white rounded-full px-3 py-1.5 transition-colors bg-blue-500 hover:bg-blue-600"
                        >
                          Details <ArrowRight className="w-2.5 h-2.5" />
                        </Link>
                      </div>
                    </div>
                  )
                }
              })}
            />
          </div>
        </SpotlightCard>
      </div>

      {/* ══════════════════════════════════════════════
          RIGHT PANEL
      ══════════════════════════════════════════════ */}
      <div className="w-[300px] shrink-0 flex flex-col gap-4 overflow-y-auto relative z-10">

        {/* ── CAREER GOAL CARD ─────────────────────── */}
        <SpotlightCard className="!p-0 border-0 !bg-transparent rounded-2xl shadow-sm overflow-hidden relative" spotlightColor="rgba(59, 130, 246, 0.1)">
          <div className="h-full w-full" style={{ background: "linear-gradient(145deg,#e8f0fe 0%,#f0f9ff 60%,#e0f2fe 100%)" }}>

          {/* Stair illustration SVG */}
          <div className="absolute right-0 top-0 opacity-70">
            <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
              {/* stairs */}
              <rect x="60" y="70" width="40" height="8" rx="2" fill="#93c5fd" opacity="0.6"/>
              <rect x="50" y="62" width="30" height="8" rx="2" fill="#93c5fd" opacity="0.6"/>
              <rect x="40" y="54" width="20" height="8" rx="2" fill="#93c5fd" opacity="0.6"/>
              <rect x="30" y="46" width="12" height="8" rx="2" fill="#93c5fd" opacity="0.6"/>
              {/* flag pole */}
              <line x1="30" y1="46" x2="30" y2="20" stroke="#60a5fa" strokeWidth="1.5"/>
              <polygon points="30,20 46,27 30,34" fill="#f97316" opacity="0.8"/>
              {/* person silhouette */}
              <circle cx="38" cy="44" r="4" fill="#3b82f6" opacity="0.7"/>
              <path d="M34 48 Q38 56 42 48" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.7"/>
              {/* plants */}
              <ellipse cx="78" cy="82" rx="8" ry="5" fill="#86efac" opacity="0.6"/>
              <ellipse cx="90" cy="79" rx="5" ry="7" fill="#4ade80" opacity="0.5"/>
              <line x1="78" y1="82" x2="78" y2="90" stroke="#86efac" strokeWidth="1.5"/>
              <line x1="90" y1="79" x2="90" y2="90" stroke="#4ade80" strokeWidth="1.5"/>
            </svg>
          </div>

          <div className="p-5 relative z-10">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Your Career Goal</p>

            <div className="flex items-center gap-4 mb-4">
              {/* Big ring */}
              <Ring pct={68} size={88} stroke="#3b82f6" track="#bfdbfe" strokeW={8}>
                <span className="text-xl font-extrabold text-blue-700">68%</span>
                <span className="text-[9px] text-slate-500 font-semibold -mt-0.5">On Track</span>
              </Ring>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 leading-tight">AI/ML<br />Engineer</h2>
                <button className="mt-1 text-blue-500 hover:text-blue-700 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Recommended Next Step */}
            <div className="rounded-xl bg-white/80 border border-blue-100 p-3.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] font-bold text-slate-700">Recommended Next Step</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                Learn Deep Learning and TensorFlow to improve your role match score.
              </p>
              <Link to="/career/roadmap"
                className="flex items-center gap-1.5 text-xs font-bold text-white rounded-full px-4 py-2 w-full justify-center transition-colors"
                style={{ background: "#3b82f6" }}>
                View Roadmap <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          </div>
        </SpotlightCard>

        {/* ── AI CAREER ASSISTANT ──────────────────── */}
        <SpotlightCard className="!p-5 bg-white/80 backdrop-blur-md border border-blue-100 shadow-sm rounded-2xl flex flex-col gap-3 flex-1" spotlightColor="rgba(59, 130, 246, 0.1)">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>
                <Bot className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">AI Career Assistant</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-emerald-500 font-semibold">Online</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Ask me anything about your skills, roles, career path and more.
          </p>

          {/* Chat input */}
          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2">
            <input
              type="text"
              placeholder="Type your question here..."
              className="flex-1 text-xs bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
            />
            <button className="w-7 h-7 flex items-center justify-center rounded-full shrink-0 transition-colors"
              style={{ background: "#3b82f6" }}>
              <Send className="w-3 h-3 text-white" />
            </button>
          </div>

          {/* Suggested prompts */}
          <div className="grid grid-cols-2 gap-2">
            {[
              "What roles suit my skills?",
              "What skills am I missing?",
              "Give me a career roadmap",
              "Suggest a project idea",
            ].map((q) => (
              <button key={q}
                className="text-[10px] text-left font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-xl px-2.5 py-2 leading-snug hover:bg-blue-100 transition-colors">
                {q}
              </button>
            ))}
          </div>
        </SpotlightCard>
      </div>

    </div>
  )
}
