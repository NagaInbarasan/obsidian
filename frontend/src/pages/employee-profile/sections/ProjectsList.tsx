import React from 'react';
import { Employee } from '../../../types/employee';
import { FolderGit2 } from 'lucide-react';

interface ProjectsListProps {
  employee: Employee;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ employee }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Projects</h2>
      
      {employee.projects.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
          <h3 className="text-sm font-medium text-slate-900">No projects recorded</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {employee.projects.map(project => (
            <div key={project.id} className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Skills Utilized</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.skillsUsed.map(skill => (
                    <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
