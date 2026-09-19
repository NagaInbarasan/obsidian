import { Link, useNavigate } from "react-router-dom"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { UserPlus, ArrowRight } from "lucide-react"

export function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userRole', 'EMPLOYEE');
    // Mock signup, redirect to resume onboarding
    navigate('/onboarding');
  };

  return (
    <SpotlightCard className="shadow-xl bg-white/90 backdrop-blur-md border border-blue-100" spotlightColor="rgba(59, 130, 246, 0.15)">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-200">
          <UserPlus className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Create an account</h1>
        <p className="text-slate-500 text-sm">Join the talent discovery platform</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">First Name</label>
            <input
              type="text"
              placeholder="Jane"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <input
            type="email"
            placeholder="jane@company.com"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg px-4 py-3 flex items-center justify-center gap-2 mt-4 transition-all shadow-md group"
        >
          Sign Up
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </SpotlightCard>
  )
}
