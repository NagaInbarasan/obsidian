import { Search, Bell } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { logoutApi } from "@/api/authApi"

export function Topbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'EMPLOYEE';

  const handleSignOut = () => {
    logoutApi();
    navigate('/login');
  };

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between bg-white border-b border-slate-100 px-6"
      style={{ boxShadow: "0 1px 4px rgba(30,64,175,0.06)" }}>

      {/* Search bar */}
      <div className="flex flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search roles, skills, or opportunities..."
            className="w-full h-10 pl-10 pr-4 rounded-full text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all"
            style={{
              background: "#f0f4ff",
              border: "1.5px solid #dbeafe",
            }}
            onFocus={(e) => {
              e.target.style.border = "1.5px solid #3b82f6"
              e.target.style.background = "#fff"
            }}
            onBlur={(e) => {
              e.target.style.border = "1.5px solid #dbeafe"
              e.target.style.background = "#f0f4ff"
            }}
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-4">
        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 mx-1" />

        {/* User profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors">
            <div className="relative shrink-0">
              <img
                src={userRole === 'HR' ? "https://api.dicebear.com/7.x/notionists/svg?seed=SarahHR" : "https://api.dicebear.com/7.x/notionists/svg?seed=Vikashini"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                style={{ border: "2px solid #bfdbfe" }}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-slate-800 leading-none">{userRole === 'HR' ? 'Sarah' : 'Vikashini'}</p>
              <p className="text-[11px] font-medium mt-0.5 leading-none" style={{ color: userRole === 'HR' ? "#9333ea" : "#3b82f6" }}>
                {userRole === 'HR' ? 'HR Business Partner' : 'AI & Data Science'}
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleSignOut}
            className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}
