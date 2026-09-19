import { Link } from "react-router-dom"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { Users, Building2, ArrowRight } from "lucide-react"

export function LoginPortal() {
  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto w-full">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Welcome to AI Talent</h1>
        <p className="text-slate-500 text-sm">Select your portal to continue</p>
      </div>

      <SpotlightCard className="shadow-xl bg-white/90 backdrop-blur-md border border-blue-100 group cursor-pointer transition-transform hover:scale-105" spotlightColor="rgba(59, 130, 246, 0.15)">
        <Link to="/login/employee" className="block text-left w-full">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center shrink-0">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Employee Portal</h2>
              <p className="text-slate-500 text-sm">Discover skills, find internal opportunities, and track your career roadmap.</p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </Link>
      </SpotlightCard>

      <SpotlightCard className="shadow-xl bg-white/90 backdrop-blur-md border border-purple-100 group cursor-pointer transition-transform hover:scale-105" spotlightColor="rgba(147, 51, 234, 0.15)">
        <Link to="/login/hr" className="block text-left w-full">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center shrink-0">
              <Building2 className="w-8 h-8 text-purple-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-1">HR Intelligence</h2>
              <p className="text-slate-500 text-sm">Analyze talent data, manage skill gaps, and oversee role deployments.</p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-purple-500 transition-colors" />
          </div>
        </Link>
      </SpotlightCard>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          New to the company?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
            Onboard here
          </Link>
        </p>
      </div>
    </div>
  )
}
