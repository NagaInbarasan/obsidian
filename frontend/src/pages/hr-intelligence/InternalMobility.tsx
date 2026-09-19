import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, UserPlus, Target } from 'lucide-react';
import type { InternalMobilitySeeker, InternalMobilityOpportunity } from '@/types/hr';

interface InternalMobilityProps {
  seekers: InternalMobilitySeeker[];
  opportunities: InternalMobilityOpportunity[];
}

export function InternalMobility({ seekers, opportunities }: InternalMobilityProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Internal Opportunities Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            Internal Role Opportunities
          </CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            Available internal roles and matching internal talent pipeline.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {opportunities.length === 0 ? (
              <div className="text-center text-sm text-slate-500 py-4">No active internal opportunities found.</div>
            ) : (
              opportunities.map(opp => (
                <div key={opp.roleId} className="p-4 border rounded-lg bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">{opp.roleName}</h4>
                      <p className="text-xs text-slate-500">{opp.department}</p>
                    </div>
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                      {opp.matchingTalent} Matches
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <span className="text-xs font-medium text-slate-500 block mb-1">Common Skill Gaps</span>
                    <div className="flex flex-wrap gap-1">
                      {opp.skillGaps.map(gap => (
                        <Badge key={gap} variant="outline" className="text-[10px] bg-slate-50">
                          {gap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Employees Seeking Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-500" />
            Talent Seeking Mobility
          </CardTitle>
          <p className="text-sm text-slate-500 mt-1">
            Employees who have indicated interest in new internal roles.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seekers.length === 0 ? (
              <div className="text-center text-sm text-slate-500 py-4">No employees actively seeking mobility.</div>
            ) : (
              seekers.map(seeker => (
                <div key={seeker.employeeId} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col">
                    <Link to={`/employees/${seeker.employeeId}`} className="font-semibold text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      {seeker.employeeName}
                    </Link>
                    <span className="text-xs text-slate-500 mt-0.5">{seeker.currentRole}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 mx-2" />
                  <div className="flex flex-col text-right">
                    <span className="font-medium text-sm text-indigo-600">{seeker.desiredRole}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Target Role</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
