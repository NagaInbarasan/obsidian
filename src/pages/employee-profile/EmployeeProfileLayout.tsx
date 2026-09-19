import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, NavLink } from 'react-router-dom';
import { fetchEmployeeById } from '../../api/employeeApi';
import { ProfileHeader } from '../../components/employee/ProfileHeader';
import { SkillOverview } from './sections/SkillOverview';
import { ExperienceTimeline } from './sections/ExperienceTimeline';
import { ProjectsList } from './sections/ProjectsList';
import { LearningPath } from './sections/LearningPath';
import { AchievementsList } from './sections/AchievementsList';
import { CareerGoals } from './sections/CareerGoals';
import { RoleMatches } from './sections/RoleMatches';

export const EmployeeProfileLayout: React.FC = () => {
  const { id = '1' } = useParams<{ id: string }>();

  // Determine active section from the URL path segment after the employee id
  const pathSegments = window.location.pathname.split('/');
  const section = pathSegments[3] || 'overview';

  const { data: employee, isLoading, isError } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => fetchEmployeeById(id)
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError || !employee) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          Failed to load employee profile.
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', to: `/employees/${employee.id}` },
    { id: 'skills', label: 'Skills', to: `/employees/${employee.id}/skills` },
    { id: 'experience', label: 'Experience', to: `/employees/${employee.id}/experience` },
    { id: 'projects', label: 'Projects', to: `/employees/${employee.id}/projects` },
    { id: 'learning', label: 'Learning', to: `/employees/${employee.id}/learning` },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <ProfileHeader employee={employee} />

      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Profile sections">
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.to}
                end={tab.id === 'overview'}
                className={({ isActive }) => `
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                `}
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {section === 'overview' && (
              <div className="space-y-12">
                <SkillOverview employee={employee} />
                <hr className="border-slate-200" />
                <ExperienceTimeline employee={employee} />
              </div>
            )}
            {section === 'skills' && <SkillOverview employee={employee} />}
            {section === 'experience' && <ExperienceTimeline employee={employee} />}
            {section === 'projects' && <ProjectsList employee={employee} />}
            {section === 'learning' && <LearningPath employee={employee} />}
          </div>

          <div className="lg:col-span-1 space-y-8">
            <RoleMatches employee={employee} />
            <CareerGoals employee={employee} />
            <AchievementsList employee={employee} />
          </div>
        </div>
      </div>
    </div>
  );
};
