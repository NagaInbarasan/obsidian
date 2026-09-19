import { Outlet } from "react-router-dom"
import Particles from "@/components/ui/Particles"
import ClickSpark from "@/components/ui/ClickSpark"

export function AuthLayout() {
  return (
    <ClickSpark
      sparkColor="#3b82f6"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={12}
      duration={500}
      extraScale={1.2}
    >
      <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-50 overflow-hidden">
        {/* Interactive 3D Particles Background */}
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#3b82f6', '#60a5fa', '#2563eb', '#1d4ed8']}
            particleCount={300}
            particleSpread={15}
            speed={0.15}
            particleBaseSize={150}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>

        {/* Auth Forms */}
        <div className="relative z-10 w-full max-w-md px-6">
          <Outlet />
        </div>
      </div>
    </ClickSpark>
  )
}
