import { NavLink } from "react-router-dom"
import {
  LayoutDashboard, UserCircle, Sparkles, UploadCloud,
  Briefcase, TrendingDown, Map, Bot, ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const userRole = localStorage.getItem('userRole') || 'EMPLOYEE';

  const employeeItems = [
    { name: "Dashboard",     path: "/dashboard",     icon: LayoutDashboard },
    { name: "My Profile",    path: "/employees",     icon: UserCircle },
    { name: "Upload Resume", path: "/onboarding",    icon: UploadCloud },
    { name: "Opportunities", path: "/opportunities", icon: Briefcase },
    { name: "Skill Gaps",    path: "/career/gaps",   icon: TrendingDown },
    { name: "Career Roadmap",path: "/career/roadmap",icon: Map },
    { name: "AI Assistant",  path: "/assistant",     icon: Bot },
  ];

  const hrItems = [
    { name: "HR Dashboard",  path: "/hr",            icon: LayoutDashboard },
    { name: "Talent Directory", path: "/employees",  icon: UserCircle },
  ];

  const currentNavItems = userRole === 'HR' ? hrItems : employeeItems;

  return (
    <aside
      className="relative flex flex-col h-full overflow-hidden"
      style={{
        width: 210,
        minWidth: 210,
        background: "linear-gradient(180deg, #0b2d87 0%, #1251b5 50%, #0d8fd4 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.18)" }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-white font-extrabold text-base leading-none tracking-tight">TalentAI</div>
          <div className="text-white/50 text-[9px] leading-tight tracking-wide mt-0.5">{userRole === 'HR' ? 'Intelligence Hub' : 'Discover · Grow · Belong'}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-2 space-y-0.5">
        {currentNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-blue-600" : "text-white/70")} />
                <span className="flex-1 text-[13px]">{item.name}</span>
                {isActive && <ChevronRight className="w-3 h-3 text-blue-400" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: wave + tagline */}
      <div className="relative mt-auto">
        {/* SVG wave decoration */}
        <svg viewBox="0 0 210 80" className="w-full" style={{ display: "block", marginBottom: -1 }}>
          <path d="M0 40 Q52 10 105 40 Q158 70 210 40 L210 80 L0 80 Z"
            fill="rgba(255,255,255,0.07)" />
          <path d="M0 55 Q52 25 105 55 Q158 85 210 55 L210 80 L0 80 Z"
            fill="rgba(255,255,255,0.05)" />
        </svg>
        <div className="px-5 pb-7 pt-0">
          <p className="text-white/70 text-xs font-medium leading-snug">Your skills today,</p>
          <p className="text-white/70 text-xs font-medium leading-snug">your bigger</p>
          <p className="text-white font-extrabold text-sm leading-snug mt-0.5">tomorrow →</p>
        </div>
      </div>
    </aside>
  )
}
