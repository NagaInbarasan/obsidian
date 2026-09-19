import React from 'react';
import { Search, Filter } from 'lucide-react';
import { EmployeeFilters as FiltersType } from '../../types/employee';

interface EmployeeFiltersProps {
  filters: FiltersType;
  onFilterChange: (filters: FiltersType) => void;
}

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search employees..."
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-400" />
        <select
          name="department"
          value={filters.department}
          onChange={handleChange}
          className="block w-40 pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Product">Product</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <select
          name="role"
          value={filters.role}
          onChange={handleChange}
          className="block w-40 pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">All Roles</option>
          <option value="Senior Frontend Engineer">Senior Frontend</option>
          <option value="Backend Engineer">Backend</option>
          <option value="Frontend Architect">Architect</option>
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="text"
          name="skill"
          value={filters.skill}
          onChange={handleChange}
          placeholder="Filter by skill..."
          className="block w-40 pl-3 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
