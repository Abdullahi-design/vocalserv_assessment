import React from 'react';
import { Search } from 'lucide-react';
import { GradeLevel } from '../types';
import { VGradeLevelSelect } from './ui/VGradeLevelSelect';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterGradeLevel: string;
  onFilterChange: (value: string) => void;
  gradeLevels: GradeLevel[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  filterGradeLevel,
  onFilterChange,
  gradeLevels
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 mb-8">
      {/* Search Input */}
      <div className="flex-1 relative group">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        <input
          type="text"
          placeholder="Search employees by name, role, or department..."
          className="w-full pl-12 pr-4 py-2 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 outline-none focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm shadow-sm text-slate-900 placeholder-slate-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {/* Grade Level Filter */}
      <div className="sm:w-72">
        <VGradeLevelSelect
          gradeLevels={[{ id: 0, name: '', description: 'All Grade Levels' }, ...gradeLevels]}
          value={filterGradeLevel}
          onChange={onFilterChange}
          includeEmpty={false}
        />
      </div>
    </div>
  );
};

export default SearchFilter;