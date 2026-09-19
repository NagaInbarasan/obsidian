import React from 'react';
import { Employee } from '../../../types/employee';
import { SkillCard } from '../../../components/skills/SkillCard';

interface SkillOverviewProps {
  employee: Employee;
}

export const SkillOverview: React.FC<SkillOverviewProps> = ({ employee }) => {
  const explicitSkills = employee.skills.filter(s => s.type === 'explicit');
  const inferredSkills = employee.skills.filter(s => s.type === 'inferred');
  const potentialSkills = employee.skills.filter(s => s.type === 'potential');
  const selfDeclaredSkills = employee.skills.filter(s => s.type === 'self-declared');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Skill Overview</h2>
        <p className="text-sm text-slate-500 mb-6">
          A comprehensive view of skills categorized by their verification source.
        </p>
      </div>

      {explicitSkills.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
            Verified / Explicit
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {explicitSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {inferredSkills.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2 mt-8">
            Evidence-backed Inferred
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {inferredSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {potentialSkills.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2 mt-8">
            Potential
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {potentialSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
      )}

      {selfDeclaredSkills.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2 mt-8">
            Self-declared
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selfDeclaredSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </section>
      )}
      
      {employee.skills.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
          <h3 className="text-sm font-medium text-slate-900">No skills identified</h3>
          <p className="mt-1 text-sm text-slate-500">Update the profile to discover skills.</p>
        </div>
      )}
    </div>
  );
};
