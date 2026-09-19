import { Outlet, useNavigate } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"
import ClickSpark from "@/components/ui/ClickSpark"
import Dock from "@/components/ui/Dock"
import { Home, User, Settings, LogOut } from "lucide-react"

export function AppLayout() {
  const navigate = useNavigate();

  const dockItems = [
    { icon: <Home size={20} />, label: 'Home', onClick: () => navigate('/dashboard') },
    { icon: <User size={20} />, label: 'Profile', onClick: () => navigate('/employees/1') },
    { icon: <Settings size={20} />, label: 'Settings', onClick: () => console.log('Settings') },
    { icon: <LogOut size={20} />, label: 'Sign Out', onClick: () => navigate('/login') },
  ];

  return (
    <ClickSpark
      sparkColor="#3b82f6"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
      extraScale={1.0}
    >
      <div className="flex h-screen w-full overflow-hidden relative" style={{ background: "#eef4ff" }}>
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
        
        {/* Global Floating Dock */}
        <Dock 
          items={dockItems}
          panelHeight={60}
          baseItemSize={44}
          magnification={60}
        />
      </div>
    </ClickSpark>
  )
}
