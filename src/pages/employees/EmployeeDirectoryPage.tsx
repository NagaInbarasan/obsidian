import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees } from '../../api/employeeApi';
import { EmployeeFilters as FiltersType } from '../../types/employee';
import { EmployeeFilters } from '../../components/employee/EmployeeFilters';
import { EmployeeCard } from '../../components/employee/EmployeeCard';

export const EmployeeDirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersType>({
    search: '',
    department: '',
    role: '',
    skill: ''
  });

  const { data: employees, isLoading, isError } = useQuery({
    queryKey: ['employees', filters],
    queryFn: () => fetchEmployees(filters)
  });

  const handleEmployeeClick = (id: string) => {
    navigate(`/employees/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Employee Directory</h1>
        <p className="text-sm text-slate-500 mt-1">Discover talent across the organization.</p>
      </div>

      <EmployeeFilters filters={filters} onFilterChange={setFilters} />

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          Failed to load employees. Please try again later.
        </div>
      )}

      {!isLoading && !isError && employees?.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-slate-200 border-dashed">
          <h3 className="mt-2 text-sm font-medium text-slate-900">No employees found</h3>
          <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {!isLoading && !isError && employees && employees.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map(employee => (
            <EmployeeCard 
              key={employee.id} 
              employee={employee} 
              onClick={handleEmployeeClick} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
