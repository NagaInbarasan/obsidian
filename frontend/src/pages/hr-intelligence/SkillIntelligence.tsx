import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { 
  SkillDistribution, 
  DepartmentSkillDistribution, 
  EmergingSkillDemand, 
  SkillGapData, 
  RoleDemand 
} from '@/types/hr';

interface SkillIntelligenceProps {
  skillDistribution: SkillDistribution[];
  departmentSkillDistribution: DepartmentSkillDistribution[];
  emergingSkillDemand: EmergingSkillDemand[];
  skillGaps: SkillGapData[];
  roleDemand: RoleDemand[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export function SkillIntelligence({
  skillDistribution,
  emergingSkillDemand,
  skillGaps,
  roleDemand
}: SkillIntelligenceProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Skill Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Workforce Skill Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={skillDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {skillDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Emerging Skill Demand */}
      <Card>
        <CardHeader>
          <CardTitle>Emerging Skill Demand vs Supply</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={emergingSkillDemand}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="skill" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <RechartsTooltip cursor={{ fill: '#f1f5f9' }} />
              <Legend />
              <Bar dataKey="demand" name="Demand" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="supply" name="Supply" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skill Gaps by Role */}
      <Card>
        <CardHeader>
          <CardTitle>Top Skill Gaps by Role</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillGaps} layout="vertical" margin={{ left: 50 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="role" type="category" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} width={100} />
              <RechartsTooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="gapCount" name="Identified Gaps" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Role Demand */}
      <Card>
        <CardHeader>
          <CardTitle>Internal Role Demand</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={roleDemand}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="role" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <RechartsTooltip />
              <Line type="monotone" dataKey="openings" name="Openings" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
