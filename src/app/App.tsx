import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AppLayout } from "@/components/layout/Layout"
import { AuthLayout } from "@/pages/auth/AuthLayout"
import { LoginPortal } from "@/pages/auth/LoginPortal"
import { EmployeeLogin } from "@/pages/auth/EmployeeLogin"
import { HrLogin } from "@/pages/auth/HrLogin"
import { SignupPage } from "@/pages/auth/SignupPage"
import { ResumeUpload } from "@/pages/onboarding/ResumeUpload"
import { Placeholder } from "@/pages/Placeholder"
import { DashboardPage } from "@/pages/dashboard/DashboardPage"
import { HrDashboard } from "@/pages/hr-intelligence/HrDashboard"
import { EmployeeDirectoryPage } from "@/pages/employees/EmployeeDirectoryPage"
import { EmployeeProfileLayout } from "@/pages/employee-profile/EmployeeProfileLayout"
import { RolesList } from "@/pages/roles/RolesList"
import { RoleDetails } from "@/pages/roles/RoleDetails"
import { OpportunitiesList } from "@/pages/opportunities/OpportunitiesList"
import { OpportunityDetails } from "@/pages/opportunities/OpportunityDetails"
import { CareerMatches } from "@/pages/career/CareerMatches"
import { CareerRoadmap } from "@/pages/career/CareerRoadmap"
import { SkillGaps } from "@/pages/career/SkillGaps"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPortal />} />
          <Route path="/login/employee" element={<EmployeeLogin />} />
          <Route path="/login/hr" element={<HrLogin />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route path="/onboarding" element={<ResumeUpload />} />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="employees" element={<EmployeeDirectoryPage />} />
          <Route path="employees/:id" element={<EmployeeProfileLayout />} />
          
          <Route path="roles" element={<RolesList />} />
          <Route path="roles/:id" element={<RoleDetails />} />
          
          <Route path="opportunities" element={<OpportunitiesList />} />
          <Route path="opportunities/:id" element={<OpportunityDetails />} />
          
          <Route path="skills" element={<Navigate to="/hr" replace />} />
          
          <Route path="career">
            <Route index element={<Navigate to="/career/roadmap" replace />} />
            <Route path="roadmap" element={<CareerRoadmap />} />
            <Route path="matches" element={<CareerMatches />} />
            <Route path="gaps" element={<SkillGaps />} />
          </Route>
          
          <Route path="assistant" element={<Placeholder title="AI Career Assistant" />} />
          <Route path="hr" element={<HrDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
