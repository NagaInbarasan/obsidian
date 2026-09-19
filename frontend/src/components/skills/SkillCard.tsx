import React from 'react';
import { Skill } from '../../types/employee';
import { CheckCircle2, Lightbulb, BadgeInfo, UserSquare2, Info } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  let bgColor = 'bg-slate-50';
  let borderColor = 'border-slate-200';
  let textColor = 'text-slate-800';
  let Icon = CheckCircle2;
  let iconColor = 'text-slate-400';
  let typeLabel = '';

  switch (skill.type) {
    case 'explicit':
      bgColor = 'bg-blue-50';
      borderColor = 'border-blue-200';
      textColor = 'text-blue-900';
      Icon = CheckCircle2;
      iconColor = 'text-blue-500';
      typeLabel = 'Verified';
      break;
    case 'inferred':
      bgColor = 'bg-purple-50';
      borderColor = 'border-purple-200';
      textColor = 'text-purple-900';
      Icon = Lightbulb;
      iconColor = 'text-purple-500';
      typeLabel = 'AI Inferred';
      break;
    case 'potential':
      bgColor = 'bg-orange-50';
      borderColor = 'border-orange-200';
      textColor = 'text-orange-900';
      Icon = BadgeInfo;
      iconColor = 'text-orange-500';
      typeLabel = 'Potential';
      break;
    case 'self-declared':
      bgColor = 'bg-emerald-50';
      borderColor = 'border-emerald-200';
      textColor = 'text-emerald-900';
      Icon = UserSquare2;
      iconColor = 'text-emerald-500';
      typeLabel = 'Self-declared';
      break;
  }

  return (
    <div className={`p-4 rounded-lg border ${bgColor} ${borderColor} flex flex-col justify-between h-full`}>
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${iconColor}`} />
            <span className={`text-sm font-semibold ${textColor}`}>{skill.name}</span>
          </div>
          {skill.score !== undefined && (
            <span className="text-xs font-medium bg-white/60 px-2 py-1 rounded shadow-sm border border-black/5">
              {skill.score}/100
            </span>
          )}
        </div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-2">
          {typeLabel}
        </div>
      </div>

      {skill.type === 'inferred' && skill.evidence && (
        <div className="mt-2 bg-white/60 p-2 rounded text-xs text-slate-600 flex items-start gap-1.5 border border-purple-100">
          <Info className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
          <span className="leading-tight">{skill.evidence}</span>
        </div>
      )}
      
      {skill.type === 'potential' && skill.evidence && (
        <div className="mt-2 bg-white/60 p-2 rounded text-xs text-slate-600 flex items-start gap-1.5 border border-orange-100">
          <Info className="w-3.5 h-3.5 text-orange-400 mt-0.5 shrink-0" />
          <span className="leading-tight">{skill.evidence}</span>
        </div>
      )}
    </div>
  );
};
