import { Link, useNavigate } from "react-router-dom"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { Building2, ArrowRight } from "lucide-react"

export function HrLogin() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userRole', 'HR');
    navigate('/hr');
  };

  return (
    <SpotlightCard className="shadow-xl bg-white/90 backdrop-blur-md border border-purple-100" spotlightColor="rgba(147, 51, 234, 0.15)">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-200">
          <Building2 className="w-6 h-6 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">HR Intelligence</h1>
        <p className="text-slate-500 text-sm">Secure access for HR professionals</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Admin Email</label>
          <input
            type="email"
            placeholder="hr@company.com"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Admin Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg px-4 py-3 flex items-center justify-center gap-2 mt-4 transition-all shadow-md group"
        >
          Access Dashboard
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link to="/login" className="text-sm text-slate-500 hover:text-purple-600 transition-colors">
          &larr; Back to Portal Selection
        </Link>
      </div>
    </SpotlightCard>
  )
}
