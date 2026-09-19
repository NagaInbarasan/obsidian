import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { TalentDiscoveryMatch, TalentDiscoveryFilters } from '@/types/hr';

interface TalentDiscoveryProps {
  initialMatches: TalentDiscoveryMatch[];
  onFilter: (filters: TalentDiscoveryFilters) => void;
}

export function TalentDiscovery({ initialMatches, onFilter }: TalentDiscoveryProps) {
  const [filters, setFilters] = useState<TalentDiscoveryFilters>({});

  const handleFilterChange = (key: keyof TalentDiscoveryFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    if (!value) delete newFilters[key];
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Talent Discovery</CardTitle>
        <p className="text-sm text-slate-500 mt-1">
          Find who inside the organization has skills relevant to your requirements.
        </p>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500 mb-1 block">Role</label>
            <input 
              type="text" 
              placeholder="e.g. Frontend" 
              className="w-full px-3 py-2 text-sm border rounded-md"
              value={filters.role || ''}
              onChange={(e) => handleFilterChange('role', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500 mb-1 block">Department</label>
            <select 
              className="w-full px-3 py-2 text-sm border rounded-md"
              value={filters.department || ''}
              onChange={(e) => handleFilterChange('department', e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Data">Data</option>
              <option value="Product">Product</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500 mb-1 block">Skill</label>
            <input 
              type="text" 
              placeholder="e.g. React" 
              className="w-full px-3 py-2 text-sm border rounded-md"
              value={filters.skill || ''}
              onChange={(e) => handleFilterChange('skill', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-slate-500 mb-1 block">Min. Experience (Yrs)</label>
            <input 
              type="number" 
              placeholder="e.g. 3" 
              className="w-full px-3 py-2 text-sm border rounded-md"
              value={filters.experience || ''}
              onChange={(e) => handleFilterChange('experience', e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={applyFilters} className="w-full md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Apply
            </Button>
          </div>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y">
              <tr>
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Current Role</th>
                <th className="px-6 py-3 font-medium">Relevant Skills</th>
                <th className="px-6 py-3 font-medium">Match Score</th>
                <th className="px-6 py-3 font-medium">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {initialMatches.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No talent matches found for the current criteria.
                  </td>
                </tr>
              ) : (
                initialMatches.map((match) => (
                  <tr key={match.employeeId} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <Link to={`/employees/${match.employeeId}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors font-semibold">
                        {match.employeeName}
                      </Link>
                      <div className="text-xs text-slate-500 font-normal mt-0.5">{match.department}</div>
                    </td>
                    <td className="px-6 py-4">{match.currentRole}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {match.relevantSkills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`font-bold ${match.matchScore >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {match.matchScore}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <span className="text-xs text-slate-600 line-clamp-2" title={match.evidence}>
                          {match.evidence}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
